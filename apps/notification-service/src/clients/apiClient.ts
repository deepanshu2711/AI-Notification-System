import * as grpc from "@grpc/grpc-js";
import { ApiService } from "@repo/proto/index";

export class ApiClient {
  private client: ApiService.ApiProtoServiceClient;
  constructor(
    address: string = process.env.PROJECT_SERVICE_ADDRESS || "localhost:50054",
    credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure(),
  ) {
    this.client = new ApiService.ApiProtoServiceClient(address, credentials);
  }

  async validateApiKey(hashedApiKey: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.validateApiKey({ hashedApiKey }, (err, res) => {
        if (err) return reject(err);
        resolve(res?.isValid ?? false);
      });
    });
  }
}
