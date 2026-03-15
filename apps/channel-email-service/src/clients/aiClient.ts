import * as grpc from "@grpc/grpc-js";
import { AIService } from "@repo/proto/index";

export class AiClient {
  private client: AIService.AiProtoServiceClient;
  constructor(
    address: string = process.env.PROJECT_SERVICE_ADDRESS || "localhost:50053",
    credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure(),
  ) {
    this.client = new AIService.AiProtoServiceClient(address, credentials);
  }

  async generateContent(
    variables: Record<string, string>,
    template: any,
  ): Promise<{ subject: string; body: string }> {
    const contentMessage = AIService.TemplateContent.create(template.content);

    const templateMessage = AIService.Template.create({
      id: template.id,
      name: template.name,
      channel: template.channel,
      content: contentMessage,
      variables: template.variables,
      aiGenerated: template.aiGenerated,
      globalUserId: template.globalUserId,
      projectId: template.projectId,
    });

    // const variablesMap = new Map<string, string>(Object.entries(variables));
    const request = AIService.GenerateContentRequest.create({
      template: templateMessage,
      variables: variables,
    });

    return new Promise((resolve, reject) => {
      this.client.generateContent(
        request,
        new grpc.Metadata(),
        (err, value?: AIService.GenerateContentResponse) => {
          if (err) {
            console.error("gRPC error:", err.message);
            reject(err);
          }
          if (!value?.content) {
            return reject(new Error("No response received from gRPC service"));
          }
          resolve(value.content);
        },
      );
    });
  }
}
