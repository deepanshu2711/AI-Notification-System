import type { ConsumeMessage } from "amqplib";
import { RabbitMQ } from "../config/connection.js";

export const userConsumer = async () => {
  const channel = await RabbitMQ.connect();
  const exchange = "user_exchange";
  await channel.assertExchange(exchange, "topic", { durable: true });

  const createQueue = "create_user_q";
  await channel.assertQueue(createQueue, { durable: true });
  await channel.bindQueue(createQueue, exchange, "user.create");

  const updateQueue = "update_user_q";
  await channel.assertQueue(updateQueue, { durable: true });
  await channel.bindQueue(updateQueue, exchange, "user.update");

  channel.consume(createQueue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;
    try {
      const data = JSON.parse(msg.content.toString());
      console.log("User Created Data", data);
      channel.ack(msg);
    } catch (error) {
      console.error("Failed to process create user message:", error);
      channel.nack(msg, false, true);
    }
  });

  channel.consume(updateQueue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;
    try {
      const data = JSON.parse(msg.content.toString());
      console.log("User Updated Data", data);
      channel.ack(msg);
    } catch (error) {
      console.error("Failed to process update user message:", error);
      channel.nack(msg, false, true);
    }
  });

  console.log("User consumers started...");
};
