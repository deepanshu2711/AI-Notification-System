import type { Request, Response } from "express";
import { asyncHandler } from "@repo/config/helpers";
import { successResponse } from "@repo/config/responses";

import * as ProjectService from "../services/project.service.js";

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.globalUserId;
  const data = await ProjectService.getUserProjects(userId!);
  return successResponse(res, data);
});

export const getProjectDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await ProjectService.getProjectDetails(id!);
    return successResponse(res, data);
  },
);

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, settings } = req.body;
    const globalUserId = req.user?.globalUserId;
    const payload = {
      name,
      description,
      settings,
      globalUserId: globalUserId!,
    };
    const data = await ProjectService.createProject(payload);
    return successResponse(res, data);
  },
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await ProjectService.deleteProject(id!);
    return successResponse(res, data);
  },
);
