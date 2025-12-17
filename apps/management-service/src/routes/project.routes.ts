import express from "express";
import * as ProjectController from "../controllers/project.controller.js";
import { setManagementMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all project routes
router.use(setManagementMiddleware);

router.get("/", ProjectController.getProjects);
router.get("/:id", ProjectController.getProjectDetails);
router.post("/", ProjectController.createProject);
router.delete("/:id", ProjectController.deleteProject);

export default router;
