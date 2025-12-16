import { Request, Response, NextFunction } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authMiddleware } from "./auth.middleware";

// Define public routes (no auth required)
const publicRoutes = ["/auth/login", "/auth/register"];

// Helper to check if route is public
const isPublicRoute = (path: string): boolean => {
  return publicRoutes.some((route) => path.startsWith(route));
};

export const proxyMiddleware = (target: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // If not public, apply auth middleware
    if (!isPublicRoute(req.path)) {
      authMiddleware(req, res, (err?: any) => {
        if (err) return next(err);
        // Proceed to proxy
        createProxyMiddleware({ target, changeOrigin: true })(req, res, next);
      });
    } else {
      // Public route, proxy directly
      createProxyMiddleware({ target, changeOrigin: true })(req, res, next);
    }
  };
};
