import express from "express";
import {
  AuthProxy,
  NotificationProxy,
  TemplateProxy,
} from "./middleware/proxy.middleware.js";

export const app = express();

app.use("/api/v1/auth", AuthProxy);
app.use("/api/v1/notification", NotificationProxy);
app.use("/api/v1/template", TemplateProxy);
