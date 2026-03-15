import * as grpc from "@grpc/grpc-js";
import { ProjectService } from "@repo/proto/index";

export class ProjectClient {
  private client: ProjectService.ProjectProtoServiceClient;
  constructor(
    address: string = process.env.PROJECT_SERVICE_ADDRESS || "localhost:50051",
    credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure(),
  ) {
    this.client = new ProjectService.ProjectProtoServiceClient(
      address,
      credentials,
    );
  }

  async checkProjectExists(projectId: string): Promise<boolean> {
    const request = ProjectService.CheckProjectExistsRequest.create({
      projectId,
    });
    const metadata = new grpc.Metadata();
    return new Promise<boolean>((resolve, reject) => {
      this.client.checkProjectExists(
        request,
        metadata,
        (err, value?: ProjectService.CheckProjectExistsResponse) => {
          if (err) {
            console.error("gRPC error:", err.message);
            reject(err);
          }
          if (!value) {
            return reject(new Error("No response received from gRPC service"));
          }
          resolve(value.exists);
        },
      );
    });
  }
}
