import type { Request, Response } from "express";

import { asyncHandler } from "@repo/config/helpers";
import { successResponse } from "@repo/config/responses";

import * as AuthService from "../services/auth.service.js";

export const exchangeToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { code, clientId } = req.body;
    const { refreshToken, accessToken } = await AuthService.getToken({
      code,
      clientId,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return successResponse(res, { accessToken });
  },
);

export const generateApiKey = asyncHandler(
  async (req: Request, res: Response) => {
    const { globalUserId } = req.params;
    const data = await AuthService.generateApiKey(globalUserId!);
    return successResponse(res, data);
  },
);
