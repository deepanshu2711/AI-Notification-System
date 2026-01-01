import type { Request, Response } from "express";
import { asyncHandler, AppError } from "@repo/config/helpers";

import * as NotificationService from "../services/notification.service.js";
import { successResponse } from "@repo/config/responses";

export const sendNotification = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, to, priority, globalUserId, templateId, variables } =
      req.body;

    const data = await NotificationService.sendNotification(
      projectId,
      globalUserId,
      to,
      priority,
      templateId,
      variables,
    );
    successResponse(res, data);
  },
);

export const getMessageStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError("Message ID is required", 400);
    }
    await NotificationService.checkMessageExists(id);
    const events = await NotificationService.getMessageEvents(id);
    const status =
      events.length > 0 ? events[events.length - 1]!.event_type : "queued";
    successResponse(res, { id, status });
  },
);

export const getMessageEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError("Message ID is required", 400);
    }
    await NotificationService.checkMessageExists(id);
    const events = await NotificationService.getMessageEvents(id);
    successResponse(res, { id, events });
  },
);
