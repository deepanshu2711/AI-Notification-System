import type { ConsumeMessage } from "amqplib";
import { RabbitMQ } from "../config/connection.js";
import { sendEmailHandler } from "../handlers/sendEmail.handler.js";

export const emailConsumer = async () => {
  const channel = await RabbitMQ.connect();
  const exchange = "NOTIFICATION_EXCHANGE";
  await channel.assertExchange(exchange, "topic", { durable: true });

  //NOTE: DLX exchange
  const dlx = "DLX";
  await channel.assertExchange(dlx, "direct", { durable: true });

  const dlq = "email_dlq";
  await channel.assertQueue(dlq, { durable: true });
  await channel.bindQueue(dlq, dlx, "email.dlq");

  //NOTE: Retry Queue
  const retryQueue = "email_retry_queue";
  await channel.assertQueue(retryQueue, {
    durable: true,
    arguments: {
      "x-message-ttl": 10000,
      "x-dead-letter-exchange": exchange,
      "x-dead-letter-routing-key": "notification.email",
    },
  });

  const queue = "email_queue";
  await channel.assertQueue(queue, {
    durable: true,
    arguments: {
      "x-dead-letter-exchange": dlx,
      "x-dead-letter-routing-key": "email.dlq",
    },
  });
  await channel.bindQueue(queue, exchange, "notification.email");

  //NOTE: Don’t send more than N unacknowledged messages to this consumer
  channel.prefetch(10);

  channel.consume(queue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());

    //NOTE: Retry count from headers
    const retries = msg.properties.headers?.["x-retry"] || 0;
    const MAX_RETRIES = 3;

    try {
      await sendEmailHandler(data);
      channel.ack(msg);
    } catch (error) {
      console.error("❌ Email failed:", {
        error,
        retries,
        data,
      });
      if (retries < MAX_RETRIES) {
        channel.sendToQueue(retryQueue, Buffer.from(JSON.stringify(data)), {
          headers: { "x-retry": retries + 1 },
          persistent: true,
        });

        channel.ack(msg);
      } else {
        channel.nack(msg, false, false);
      }
    }
  });

  console.log("Email consumer started...");
};
