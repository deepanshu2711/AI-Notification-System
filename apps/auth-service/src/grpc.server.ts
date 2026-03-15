import * as grpc from "@grpc/grpc-js";
import { ApiService } from "@repo/proto/index";
import { isApiKeyValid } from "./services/auth.service.js";

const handlers: ApiService.ApiProtoServiceServer = {
  validateApiKey: async (call, callback) => {
    const { hashedApiKey } = call.request;
    isApiKeyValid(hashedApiKey)
      .then((isValid) => {
        callback(null, { isValid });
      })
      .catch((err) => {
        callback({
          code: grpc.status.INTERNAL,
          message: err?.message || "Internal server error",
        });
      });
  },
};

const server = new grpc.Server();
server.addService(ApiService.ApiProtoServiceService, handlers);

export const startGrpcServer = () => {
  const port = 50054;
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
