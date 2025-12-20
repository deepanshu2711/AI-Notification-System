import express from "express";
import { sendNotification } from "../controllers/notification.controller.js";

export const notificationRouter = express.Router();

notificationRouter.get("/send", sendNotification);
