import type { Request, Response } from "express";
import { asyncHandler } from "@repo/config/helpers";
import * as TemplateSercvice from "../services/template.service.js";
import { successResponse } from "@repo/config/responses";

export const createTemplate = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, channel, content, variables, projectId, aiGenerated } =
      req.body;
    const globalUserId = req.user?.globalUserId!;

    const data = await TemplateSercvice.createTemplate(
      name,
      channel,
      content,
      variables,
      projectId,
      globalUserId,
      aiGenerated,
    );
    return successResponse(res, data);
  },
);

export const getTemplates = asyncHandler(
  async (req: Request, res: Response) => {
    const globalUserId = req.user?.globalUserId;

    const data = await TemplateSercvice.getTemplates(globalUserId!);
    return successResponse(res, data);
  },
);

export const getTemplateById = asyncHandler(
  async (req: Request, res: Response) => {
    const { Id } = req.params;

    const data = await TemplateSercvice.getTemplateById(Id!);
    return successResponse(res, data);
  },
);

export const deleteTemplate = asyncHandler(
  async (req: Request, res: Response) => {
    const { Id } = req.params;

    const data = await TemplateSercvice.deleteTemplate(Id!);
    return successResponse(res, data);
  },
);
