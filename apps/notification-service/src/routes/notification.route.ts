import express from "express";
import {
  sendNotification,
  getMessageStatus,
  getMessageEvents,
} from "../controllers/notification.controller.js";

export const notificationRouter = express.Router();

notificationRouter.post("/send", sendNotification);
notificationRouter.get("/messages/:id/status", getMessageStatus);
notificationRouter.get("/messages/:id/events", getMessageEvents);
