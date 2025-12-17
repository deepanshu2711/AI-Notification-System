import { AppError } from "@repo/config/helpers";
import { ProjectClient } from "../clients/projectClient.js";

const projectClient = new ProjectClient();

export const sendNotification = async (projectId: string) => {
  //NOTE: FIRST CHECK IF THIS PROJECT EXISTS FROM MANAGEMENT SERVICE
  const projectExists = await projectClient.checkProjectExists(projectId);
  if (!projectExists) throw new AppError("Project does not exist", 400);
};
