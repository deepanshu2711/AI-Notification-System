import * as grpc from "@grpc/grpc-js";
import { template } from "@repo/proto/index";

export class TemplateClient {
  private client: template.TemplateProtoServiceClient;
  constructor(
    address: string = process.env.PROJECT_SERVICE_ADDRESS || "localhost:50052",
    credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure(),
  ) {
    this.client = new template.TemplateProtoServiceClient(address, credentials);
  }

  async getTemplateDetails(
    templateId: string,
  ): Promise<template.GetTemplateDetailsResponse> {
    const request = new template.GetTemplateDetailsRequest({ templateId });
    return new Promise((resolve, reject) => {
      this.client.GetTemplateDetails(
        request,
        new grpc.Metadata(),
        (err, value?: template.GetTemplateDetailsResponse) => {
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
