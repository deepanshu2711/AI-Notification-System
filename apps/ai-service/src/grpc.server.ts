import * as grpc from "@grpc/grpc-js";
import { ai } from "@repo/proto/index";
import { generateContent } from "./services/ai.service.js";

class AiProtoServiceImp extends ai.UnimplementedAiProtoServiceService {
  GenerateContent(
    call: grpc.ServerUnaryCall<
      ai.GenerateContentRequest,
      ai.GenerateContentResponse
    >,
    callback: grpc.sendUnaryData<ai.GenerateContentResponse>,
  ): void {
    const { prompt } = call.request;
    if (!prompt || prompt.trim().length === 0) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: "Prompt is required to generate content",
      });
    }
    generateContent(prompt)
      .then((data) => {
        const response = new ai.GenerateContentResponse({
          content: data!,
        });
        callback(null, response);
      })
      .catch((err) => {
        callback({
          code: grpc.status.INTERNAL,
          message: "Ërror while generating Content",
        });
      });
  }
}

const server = new grpc.Server();
server.addService(
  ai.UnimplementedAiProtoServiceService.definition,
  new AiProtoServiceImp(),
);

export const startGrpcServer = () => {
  const port = 50053;
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error("Failed to bind gRPC server:", err);
        return;
      }
      console.log(`gRPC server running on port ${port}`);
      server.start();
    },
  );
};
