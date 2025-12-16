import type { Request, Response, NextFunction } from "express";
declare global {
  namespace Express {
    interface Request {
      user?: { globalUserId: string };
    }
  }
}
export const setAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.headers["x-global-user-Id"] as string;
  if (userId) {
    req.user = { globalUserId: userId };
  }
  next();
};
