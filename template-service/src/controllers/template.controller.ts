import { asyncHandler, AppError } from '@repo/config/helpers';
import { successResponse } from '@repo/config/responses';
import { createTemplate, getTemplates, getTemplateById, deleteTemplate } from '../services/template.service.js';

export const createTemplateHandler = asyncHandler(async (req, res) => {
  const { globalUserId } = req.user!;
  const template = await createTemplate({ ...req.body, globalUserId });
  return successResponse(res, template, 'Template created successfully', 201);
});

export const getTemplatesHandler = asyncHandler(async (req, res) => {
  const { globalUserId } = req.user!;
  const { projectId } = req.query as { projectId?: string };
  const templates = await getTemplates(globalUserId, projectId);
  return successResponse(res, templates, 'Templates retrieved successfully');
});

export const getTemplateByIdHandler = asyncHandler(async (req, res) => {
  const { globalUserId } = req.user!;
  const { id } = req.params;
  const template = await getTemplateById(id, globalUserId);
  return successResponse(res, template, 'Template retrieved successfully');
});

export const deleteTemplateHandler = asyncHandler(async (req, res) => {
  const { globalUserId } = req.user!;
  const { id } = req.params;
  await deleteTemplate(id, globalUserId);
  return successResponse(res, null, 'Template deleted successfully');
});