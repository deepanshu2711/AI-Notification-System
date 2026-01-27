import { AppError } from "@repo/config/helpers";
import type { Request, Response, NextFunction } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

interface JwtPayload {
  globalUserId: string;
  userId: string;
  appId: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = authHeader.substring(7);
  try {
    // Verify JWT using JWKS
    const JWKS = createRemoteJWKSet(
      new URL("https://auth-api.deepxdev.com/.well-known/jwks.json"),
    );

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: "https://auth.deepxdev.com",
    });

    console.log("payload", payload);

    req.user = {
      userId: payload.userId as string,
      appId: payload.appId as string,
      globalUserId: payload.globalUserId as string,
    };
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};
