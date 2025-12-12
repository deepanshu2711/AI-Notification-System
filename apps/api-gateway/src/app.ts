import express from "express";
import { AuthProxy } from "./middleware/proxy.middleware.js";

export const app = express();

app.use("/api/v1/auth", AuthProxy);
