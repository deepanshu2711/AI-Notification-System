import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { setAuthMiddleware } from "../middlewares/auth.middleware.js";

export const authRoutes = express.Router();

authRoutes.post("/token", AuthController.exchangeToken);
authRoutes.post(
  "/generate-api-key",
  setAuthMiddleware,
  AuthController.generateApiKey,
);
authRoutes.get("/api-key", setAuthMiddleware, AuthController.getApiKey);
