import express from "express";
import projectRoutes from "./routes/project.routes.js";

export const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/projects", projectRoutes);
