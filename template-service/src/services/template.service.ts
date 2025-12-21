import { Template } from '../models/template.model.js';
import { AppError } from '@repo/config/helpers';

export const createTemplate = async (data: any) => {
  const { name, channel, content, variables, projectId, globalUserId, aiGenerate } = data;
  const newTemplate = new Template({
    name,
    channel,
    content,
    variables,
    projectId,
    globalUserId,
    aiGenerated: aiGenerate || false,
  });
  await newTemplate.save();
  return newTemplate;
};

export const getTemplates = async (globalUserId: string, projectId?: string) => {
  const query: any = { globalUserId };
  if (projectId) query.projectId = projectId;
  return await Template.find(query).sort({ createdAt: -1 });
};

export const getTemplateById = async (id: string, globalUserId: string) => {
  const template = await Template.findOne({ _id: id, globalUserId });
  if (!template) throw new AppError('Template not found', 404);
  return template;
};

export const deleteTemplate = async (id: string, globalUserId: string) => {
  const template = await Template.findOneAndDelete({ _id: id, globalUserId });
  if (!template) throw new AppError('Template not found', 404);
  return template;
};