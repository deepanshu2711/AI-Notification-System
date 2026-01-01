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

  async generateContent(
    prompt: string,
    variables: Record<string, string>,
    template: {
      id: string;
      name: string;
      channel: string;
      content: {
        subject: string;
        body: string;
      };
      variables: string;
      aiGenerated: boolean;
      globalUserId: string;
      projectId: string;
    },
  ): Promise<{ subject: string; body: string }> {
    const contentMessage = new ai.TemplateContent({
      subject: template.content.subject,
      body: template.content.body,
    });

    const templateMessage = new ai.Template({
      id: template.id,
      name: template.name,
      channel: template.channel,
      content: contentMessage,
      variables: template.variables,
      aiGenerated: template.aiGenerated,
      globalUserId: template.globalUserId,
      projectId: template.projectId,
    });

    const variablesMap = new Map<string, string>(Object.entries(variables));
    const request = new ai.GenerateContentRequest({
      prompt,
      template: templateMessage,
      variables: variablesMap,
    });

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
