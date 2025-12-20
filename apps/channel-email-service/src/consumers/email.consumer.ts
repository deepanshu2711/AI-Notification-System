import type { ConsumeMessage } from "amqplib";
import { RabbitMQ } from "../config/connection.js";

export const emailConsumer = async () => {
  const channel = await RabbitMQ.connect();
  const exchange = "NOTIFICATION_EXCHANGE";
  await channel.assertExchange(exchange, "topic", { durable: true });

  const queue = "email_queue";
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, "notification.email");

  channel.consume(queue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());

    console.log("received-email-datai-to-consume", data);
    channel.ack(msg);
  });

  console.log("Email consumer started...");
};
