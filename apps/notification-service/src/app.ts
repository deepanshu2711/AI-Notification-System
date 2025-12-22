import express from "express";
import { notificationRouter } from "./routes/notification.route.js";
import { errorMiddleware } from "@repo/config/helpers";

export const app = express();

app.use(express.json());
app.use(notificationRouter);
app.use(errorMiddleware);
