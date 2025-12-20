import * as grpc from "@grpc/grpc-js";
import { project } from "@repo/proto/index";
import { getProjectDetails } from "./services/project.service.js";

class ProjectProtoServiceImpl
  extends project.UnimplementedProjectProtoServiceService
{
  CheckProjectExists(
    call: grpc.ServerUnaryCall<
      project.CheckProjectExistsRequest,
      project.CheckProjectExistsResponse
    >,
    callback: grpc.sendUnaryData<project.CheckProjectExistsResponse>,
  ): void {
    const { projectId } = call.request;
    getProjectDetails(projectId)
      .then(() => {
        const response = new project.CheckProjectExistsResponse({
          exists: true,
        });
        callback(null, response);
      })
      .catch(() => {
        const response = new project.CheckProjectExistsResponse({
          exists: false,
        });
        callback(null, response);
      });
  }
}

const server = new grpc.Server();
server.addService(
  project.UnimplementedProjectProtoServiceService.definition,
  new ProjectProtoServiceImpl(),
);

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
