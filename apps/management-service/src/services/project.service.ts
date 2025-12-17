import { AppError } from "@repo/config/helpers";
import { Project } from "../models/project.model.js";

export const getUserProjects = async (userId: string) => {
  const projects = await Project.find({ globalUserId: userId });
  return projects;
};

export const getProjectDetails = async (projectId: string) => {
  const project = await Project.findById(projectId);
  if (!project) throw new AppError("Project Not Found", 404);
  return project;
};

export const createProject = async (payload: {
  name: string;
  description: string;
  globalUserId: string;
  settings: Record<string, any>;
}) => {
  const project = await Project.create(payload);
  return project;
};

export const deleteProject = async (projectId: string) => {
  const project = await Project.findByIdAndDelete(projectId);
  return project;
};
