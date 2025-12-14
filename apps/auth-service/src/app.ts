import express from "express";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.routes.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
