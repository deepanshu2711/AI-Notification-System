import * as grpc from "@grpc/grpc-js";
import { ProjectService } from "@repo/proto/index";
import { getProjectDetails } from "./services/project.service.js";

const handlers: ProjectService.ProjectProtoServiceServer = {
  checkProjectExists: async (call, callback) => {
    const { projectId } = call.request;
    getProjectDetails(projectId)
      .then(() => {
        const response = ProjectService.CheckProjectExistsResponse.create({
          exists: true,
        });
        callback(null, response);
      })
      .catch(() => {
        const response = ProjectService.CheckProjectExistsResponse.create({
          exists: false,
        });
        callback(null, response);
      });
  },
};

const server = new grpc.Server();
server.addService(ProjectService.ProjectProtoServiceService, handlers);

export const startGrpcServer = () => {
  const port = 50051;
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
