import { connect } from "amqplib";
import dotenv from "dotenv";
import type { Channel } from "amqplib";

dotenv.config();

type RabbitConnection = Awaited<ReturnType<typeof connect>>;

export class RabbitMQConnection {
  private static instance: RabbitMQConnection;
  private connection!: RabbitConnection;
  private channel!: Channel;
  private url: string =
    process.env.RABBITMQ_URL || "amqp://admin:admin@localhost:5672";

  private constructor() {}

  public static getInstance(): RabbitMQConnection {
    if (!RabbitMQConnection.instance) {
      RabbitMQConnection.instance = new RabbitMQConnection();
    }
    return RabbitMQConnection.instance;
  }

  public async connect(): Promise<Channel> {
    if (!this.connection) {
      this.connection = await connect(this.url);
    }

    if (!this.channel) {
      this.channel = await this.connection.createChannel();
    }

    return this.channel;
  }

  public async disconnect() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
    } catch (error) {
      console.error("Error closing RabbitMQ connection:", error);
    }
  }

  public isConnected(): boolean {
    return !!(this.connection && this.channel);
  }

  public getChannel(): Channel | undefined {
    return this.channel;
  }

  public async reconnect(): Promise<Channel> {
    await this.disconnect();
    return this.connect();
  }
}
