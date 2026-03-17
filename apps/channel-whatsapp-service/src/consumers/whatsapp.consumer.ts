import type { ConsumeMessage } from "amqplib";
import { RabbitMQ } from "../config/connection.js";
import { whatsappHandler } from "../handler/whatsapp.handler.js";

export const whatsappConsumer = async () => {
  const channel = await RabbitMQ.connect();
  const exchange = "NOTIFICATION_EXCHANGE";

  await channel.assertExchange(exchange, "topic", { durable: true });

  const queue = "whatsapp_queue";
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, "notification.whatsapp");

  channel.consume(queue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    try {
      //NOTE: Add a handler to send a whasapp message
      await whatsappHandler(data);
      channel.ack(msg);
    } catch (error) {
      channel.nack(msg);
      console.log(error);
    }
  });
};
