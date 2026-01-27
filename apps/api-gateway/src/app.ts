import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import {
  AuthProxy,
  ManagementProxy,
  NotificationProxy,
  TemplateProxy,
} from "./middleware/proxy.middleware.js";

export const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  }),
);
app.use("/api/v1/auth", AuthProxy);
app.use("/api/v1/notification", NotificationProxy);
app.use("/api/v1/template", TemplateProxy);
app.use("/api/v1/management", ManagementProxy);
