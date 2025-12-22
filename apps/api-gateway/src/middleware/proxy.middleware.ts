import type { Request, Response, NextFunction } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { authMiddleware } from "./auth.middleware.js";

const publicRoutes: string[] = ["/token", "/send"];

const isPublicRoute = (path: string): boolean => {
  return publicRoutes.some((route: string) => path.startsWith(route));
};

//INFO:
//createProxyMiddleware(config) creates a middleware function
//(req, res, next) runs that middleware

export const AuthProxy = (req: Request, res: Response, next: NextFunction) => {
  const proxyOptions = {
    target: "http://localhost:5002",
    changeOrigin: true,
    pathRewrite: { "^/api/v1/auth": "" },
    cookieDomainRewrite: "",
    onProxyReq: (proxyReq: any) => {
      if (req.user) {
        proxyReq.setHeader("x-global-user-Id", req.user.globalUserId);
      }
    },
  };
  if (!isPublicRoute(req.path)) {
    authMiddleware(req, res, (err?: any) => {
      if (err) return next(err);
      createProxyMiddleware(proxyOptions)(req, res, next);
    });
  } else {
    createProxyMiddleware(proxyOptions)(req, res, next);
  }
};

export const NotificationProxy = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const proxyOptions = {
    target: "http://localhost:5006",
    changeOrigin: true,
    pathRewrite: { "^/api/v1/notification": "" },
    cookieDomainRewrite: "",
    onProxyReq: (proxyReq: any) => {
      if (req.user) {
        proxyReq.setHeader("x-global-user-Id", req.user.globalUserId);
      }
    },
  };
  if (!isPublicRoute(req.path)) {
    authMiddleware(req, res, (err?: any) => {
      if (err) return next(err);
      createProxyMiddleware(proxyOptions)(req, res, next);
    });
  } else {
    createProxyMiddleware(proxyOptions)(req, res, next);
  }
};

export const ManagementProxy = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const proxyOptions = {
    target: "http://localhost:5004",
    changeOrigin: true,
    pathRewrite: { "^/api/v1/management": "" },
    cookieDomainRewrite: "",
    onProxyReq: (proxyReq: any) => {
      if (req.user) {
        proxyReq.setHeader("x-global-user-Id", req.user.globalUserId);
      }
    },
  };
  if (!isPublicRoute(req.path)) {
    authMiddleware(req, res, (err?: any) => {
      if (err) return next(err);
      createProxyMiddleware(proxyOptions)(req, res, next);
    });
  } else {
    createProxyMiddleware(proxyOptions)(req, res, next);
  }
};
