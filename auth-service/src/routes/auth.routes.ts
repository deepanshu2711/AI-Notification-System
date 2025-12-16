import { Router } from "express";
import { generateApiKey } from "../controllers/auth.controller";

const router = Router();

// Assume login/register are public, handled elsewhere or add stubs
router.post("/generate-api-key", generateApiKey);

export default router;
