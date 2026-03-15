import * as grpc from "@grpc/grpc-js";
import { AIService } from "@repo/proto/index";
import { generateContent } from "./services/ai.service.js";

const handlers: AIService.AiProtoServiceServer = {
  generateContent: (call, callback) => {
    const { variables, template } = call.request;
    // const variablesRecord = Object.fromEntries(variables);
    const variablesRecord = variables;
    generateContent(template, variablesRecord)
      .then((data) => {
        const emailContent = AIService.EmailContent.create({
          body: data.body,
          subject: data.subject,
        });
        const response = AIService.GenerateContentResponse.create({
          content: emailContent,
        });
        callback(null, response);
      })
      .catch((err) => {
        callback({
          code: grpc.status.INTERNAL,
          message: "Ërror while generating Content",
        });
      });
  },
};

const server = new grpc.Server();
server.addService(AIService.AiProtoServiceService, handlers);

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
