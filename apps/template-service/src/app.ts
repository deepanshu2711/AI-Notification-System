import express from "express";
import { templateRouter } from "./routes/template.route.js";

export const app = express();

app.use(templateRouter);
