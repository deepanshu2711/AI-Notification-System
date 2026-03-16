import { RabbitMQConnection } from "@repo/rabbitmq/connection";
import type { Channel } from "amqplib";
import { MessageEvent } from "../models/messageEvent.model.js";

type ChannelType = "email" | "sms";

const getRoutingKey = (channel: ChannelType) => {
  const Map = {
    email: "notification.email",
    sms: "notification.sms",
  };
  return Map[channel];
};

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
    const message = Buffer.from(JSON.stringify(data));

    for (const target of data.to) {
      const routingKey = getRoutingKey(target.channel);
      channel.publish(this.exchangeName, routingKey, message, {
        persistent: true,
      });
      console.log(`Published notification message to ${routingKey}`);
    }

    //NOTE: CREEATE AN MESSAGE EVENT
    await MessageEvent.create({
      messageId: data.messageId,
      event_type: "sent_to_provider",
    });
  }
}
