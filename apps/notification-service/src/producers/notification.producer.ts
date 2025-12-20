import { RabbitMQConnection } from "@repo/rabbitmq/connection";
import type { Channel } from "amqplib";
import { MessageEvent } from "../models/messageEvent.model.js";

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

    const routingKey = "notification.email";
    const message = Buffer.from(JSON.stringify(data));

    //NOTE: CREEATE AN MESSAGE EVENT
    await MessageEvent.create({
      messageId: data.messageId,
      event_type: "sent_to_provider",
    });
    channel.publish(this.exchangeName, routingKey, message, {
      persistent: true,
    });
    console.log(`Published notification  message to ${routingKey}`);
  }
}
