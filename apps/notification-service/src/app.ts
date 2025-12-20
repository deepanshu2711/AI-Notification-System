import express from "express";
import { notificationRouter } from "./routes/notification.route.js";

export const app = express();

app.use(notificationRouter);
