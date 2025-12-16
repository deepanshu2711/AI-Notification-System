import { Request, Response } from "express";
import { asyncHandler } from "../../../packages/config/src/helpers";
import { successResponse } from "../../../packages/config/src/responses";
import { AuthService } from "../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: { globalUserId: string };
    }
  }
}

export const generateApiKey = asyncHandler(
  async (req: Request, res: Response) => {
    const { globalUserId } = req.user!;
    const data = await AuthService.generateApiKey(globalUserId);
    return successResponse(res, data);
  },
);
