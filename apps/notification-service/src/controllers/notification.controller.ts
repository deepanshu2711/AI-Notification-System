import type { Request, Response } from "express";
import { asyncHandler } from "@repo/config/helpers";

import * as NotificationService from "../services/notification.service.js";
import { successResponse } from "@repo/config/responses";

export const sendNotification = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = "1212121";
    const to = [
      { channel: "sms", destination: "+9199...", type: "sms" },
      { channel: "email", destination: "a@b.com", type: "email" },
    ];
    const priority = "high";
    const globalUserId = "jhgkjhgkjh";

    const data = await NotificationService.sendNotification(
      projectId,
      globalUserId,
      to,
      priority,
    );
    successResponse(res, data);
  },
);
