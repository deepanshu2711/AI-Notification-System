import { RabbitMQConnection } from "@repo/rabbitmq/connection";
import type { Channel } from "amqplib";

export class NotificationProducer {
  private connection = RabbitMQConnection.getInstance();
  private exchangeName = "NOTIFICATION_EXCHANGE";

  private async setUpExchange(channel: Channel) {
    await channel.assertExchange(this.exchangeName, "topic", {
      durable: true,
    });
  }

  public async publishNotification(data: any) {
    const channel = await this.connection.connect();
    await this.setUpExchange(channel);

    const routingKey = "notification.create";
    const message = Buffer.from(JSON.stringify(data));

    channel.publish(this.exchangeName, routingKey, message, {
      persistent: true,
    });
    console.log(`Published notification  message to ${routingKey}`);
  }
}
