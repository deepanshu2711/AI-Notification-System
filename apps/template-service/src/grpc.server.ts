import * as grpc from "@grpc/grpc-js";
import { TemplateService } from "@repo/proto/index";
import { getTemplateById } from "./services/template.service.js";

const handlers: TemplateService.TemplateProtoServiceServer = {
  getTemplateDetails: (
    call: grpc.ServerUnaryCall<
      TemplateService.GetTemplateDetailsRequest,
      TemplateService.GetTemplateDetailsResponse
    >,
    callback: grpc.sendUnaryData<TemplateService.GetTemplateDetailsResponse>,
  ): void => {
    const { templateId } = call.request;

    getTemplateById(templateId)
      .then((data) => {
        if (!data) {
          return callback(
            {
              code: grpc.status.NOT_FOUND,
              message: "Template not found",
            },
            null,
          );
        }

        const response = TemplateService.GetTemplateDetailsResponse.create({
          id: data._id.toString(),
          name: data.name,
          channels: {
            email: data.channels?.email
              ? {
                  subject: data.channels.email.subject ?? "",
                  body: data.channels.email.body ?? "",
                }
              : undefined,

            sms: data.channels?.sms
              ? {
                  body: data.channels.sms.body ?? "",
                }
              : undefined,

            whatsapp: data.channels?.whatsapp
              ? {
                  body: data.channels.whatsapp.body ?? "",
                }
              : undefined,
          },
          variables: data.variables,
          aiGenerated: data.aiGenerated,
          globalUserId: data.globalUserId,
          projectId: data.projectId,
          createdAt: data.createdAt?.toISOString(),
          updatedAt: data.updatedAt?.toISOString(),
        });

        callback(null, response);
      })
      .catch((err) => {
        callback(
          {
            code: grpc.status.INTERNAL,
            message: err?.message || "Internal server error",
          },
          null,
        );
      });
  },
};

const server = new grpc.Server();
server.addService(TemplateService.TemplateProtoServiceService, handlers);

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
