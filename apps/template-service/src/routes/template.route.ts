import express from "express";
import * as TemplateContoller from "../controllers/template.controller.js";
import { setTemplateMiddleware } from "../middlewares/auth.middleware.js";

export const templateRouter = express.Router();

templateRouter.use(setTemplateMiddleware);

templateRouter.post("/", TemplateContoller.createTemplate);
templateRouter.get("/", TemplateContoller.getTemplates);
templateRouter.get("/:Id", TemplateContoller.getTemplateById);
templateRouter.delete("/:Id", TemplateContoller.deleteTemplate);
