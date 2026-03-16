import type { ConsumeMessage } from "amqplib";
import { RabbitMQ } from "../config/connection";
import { sendSmsHandler } from "../handler/sms.handler";

export const smsConsumer = async () => {
  const channel = await RabbitMQ.connect();
  const exchange = "NOTIFICATION_EXCHANGE";

  await channel.assertExchange(exchange, "topic", { durable: true });

  const queue = "sms_queue";
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, "notification.sms");

  channel.consume(queue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    try {
      //NOTE: Add a handler to send a sms message
      await sendSmsHandler(data);
      channel.ack(msg);
    } catch (error) {
      channel.nack(msg);
      console.log(error);
    }
  });
};
