import { RabbitMQ } from "../config/connection.js";
import type { ConsumeMessage } from "amqplib";
import { messgaeEventHandler } from "../handlers/messageEvent.handler.js";

export const consumeMessageEvents = async () => {
  const channel = await RabbitMQ.connect();
  const exchange = "MESSAGE_EVENT";
  await channel.assertExchange(exchange, "topic", { durable: true });

  const queue = "message_event_q";
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, "message.event.create");

  channel.consume(queue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    try {
      await messgaeEventHandler(data);
      channel.ack(msg);
    } catch (e) {
      channel.nack(msg);
    }
  });
};
