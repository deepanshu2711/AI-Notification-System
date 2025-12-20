import { RabbitMQ } from "../config/connection.js";

export class MessageEventProducer {
  private connection = RabbitMQ;
  private exchange = "MESSAGE_EVENT";

  public async publishMessageEvent(data: any) {
    const channel = await this.connection.connect();
    await channel.assertExchange(this.exchange, "topic");

    const routingKey = "message.event.create";
    const message = Buffer.from(JSON.stringify(data));

    channel.publish(this.exchange, routingKey, message, { persistent: true });
    console.log(`Published event  message to ${routingKey}`);
  }
}
