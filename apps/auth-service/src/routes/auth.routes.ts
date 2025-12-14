import express from "express";
import * as AuthController from "../controllers/auth.controller.js";

export const authRoutes = express.Router();

authRoutes.post("/token", AuthController.exchangeToken);
