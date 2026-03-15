import * as grpc from "@grpc/grpc-js";
import { ApiService } from "@repo/proto/index";

const handlers: ApiService.ApiProtoServiceServer = {
  validateApiKey: async (call, callback) => {
    callback(null, { isValid: false });
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
