import * as grpc from "@grpc/grpc-js";
import { TemplateService } from "@repo/proto/index";

export class TemplateClient {
  private client: TemplateService.TemplateProtoServiceClient;
  constructor(
    address: string = process.env.PROJECT_SERVICE_ADDRESS || "localhost:50052",
    credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure(),
  ) {
    this.client = new TemplateService.TemplateProtoServiceClient(
      address,
      credentials,
    );
  }

  async getTemplateDetails(
    templateId: string,
  ): Promise<TemplateService.GetTemplateDetailsResponse> {
    const request = TemplateService.GetTemplateDetailsRequest.create({
      templateId,
    });
    return new Promise((resolve, reject) => {
      this.client.getTemplateDetails(
        request,
        new grpc.Metadata(),
        (err, value?: TemplateService.GetTemplateDetailsResponse) => {
          if (err) {
            console.error("gRPC error:", err.message);
            reject(err);
          }
          if (!value) {
            return reject(new Error("No response received from gRPC service"));
          }
          resolve(value);
        },
      );
    });
  }
}
