import * as grpc from "@grpc/grpc-js";
import { template } from "@repo/proto/index";
import { getTemplateById } from "./services/template.service.js";

class TemplateProtoServiceImp
  extends template.UnimplementedTemplateProtoServiceService
{
  GetTemplateDetails(
    call: grpc.ServerUnaryCall<
      template.GetTemplateDetailsRequest,
      template.GetTemplateDetailsResponse
    >,
    callback: grpc.sendUnaryData<template.GetTemplateDetailsResponse>,
  ): void {
    const { templateId } = call.request;
    getTemplateById(templateId)
      .then((data) => {
        if (!data) {
          throw new Error("Template not found");
        }
        const response = template.GetTemplateDetailsResponse.fromObject({
          //@ts-ignore
          id: data._id,
          name: data.name,
          channel: data.channel,
          content: {
            subject: data.content.subject,
            body: data.content.body,
          },
          variables: data.variables,
          aiGenerated: data.aiGenerated,
        });
        callback(null, response);
      })
      .catch((err) => {
        callback(
          {
            code: grpc.status.NOT_FOUND,
            message: err?.message || "Template not found",
          },
          null,
        );
      });
  }
}

const server = new grpc.Server();
server.addService(
  template.UnimplementedTemplateProtoServiceService.definition,
  new TemplateProtoServiceImp(),
);

export const startGrpcServer = () => {
  const port = 50052;
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
