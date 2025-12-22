import type { Request, Response } from "express";
import { asyncHandler } from "@repo/config/helpers";

import * as NotificationService from "../services/notification.service.js";
import { successResponse } from "@repo/config/responses";

export const sendNotification = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, to, priority, globalUserId, templateId } = req.body;

    const data = await NotificationService.sendNotification(
      projectId,
      globalUserId,
      to,
      priority,
      templateId,
    );
    successResponse(res, data);
  },
);
