import type { Request, Response, NextFunction } from "express";
declare global {
  namespace Express {
    interface Request {
      user?: { globalUserId: string };
    }
  }
}

export const setManagementMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.headers["x-global-user-id"] as string;
  console.log("headers in managemet", req.headers);
  console.log("úserId in managemet middleware", userId);
  if (userId) {
    req.user = { globalUserId: userId };
  }
  next();
};
