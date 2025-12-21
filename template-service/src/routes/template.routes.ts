import express from 'express';
import { createTemplateHandler, getTemplatesHandler, getTemplateByIdHandler, deleteTemplateHandler } from '../controllers/template.controller.js';
import { setAuthMiddleware } from '../middlewares/auth.middleware.js'; // Assuming exists or create

const router = express.Router();

router.use(setAuthMiddleware); // Auth middleware

router.post('/', createTemplateHandler);
router.get('/', getTemplatesHandler);
router.get('/:id', getTemplateByIdHandler);
router.delete('/:id', deleteTemplateHandler);

export default router;