import * as grpc from "@grpc/grpc-js";
import { ai } from "@repo/proto/index";

export class AiClient {
  private client: ai.AiProtoServiceClient;
  constructor(
    address: string = process.env.PROJECT_SERVICE_ADDRESS || "localhost:50053",
    credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure(),
  ) {
    this.client = new ai.AiProtoServiceClient(address, credentials);
  }

  async generateContent(prompt: string): Promise<string> {
    const request = new ai.GenerateContentRequest({ prompt });
    return new Promise((resolve, reject) => {
      this.client.GenerateContent(
        request,
        new grpc.Metadata(),
        (err, value?: ai.GenerateContentResponse) => {
          if (err) {
            console.error("gRPC error:", err.message);
            reject(err);
          }
          if (!value) {
            return reject(new Error("No response received from gRPC service"));
          }
          resolve(value.content);
        },
      );
    });
  }
}
