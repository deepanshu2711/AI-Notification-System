// NOTE:
// {
//   name: Order Confirmation Email,
//   channel: email,
//   content: {
//     subject: Order #{{orderId}} Confirmed,
//     body: Hi {{customerName}},\n\nYour order {{orderId}} for {{productName}} has been confirmed. Total: ${{total}}. Expected delivery: {{deliveryDate}}.\n\nThank you!
//   },
//   variables: {
//     customerName: { type: string, description: Customer's full name, required: true },
//     orderId: { type: string, description: Unique order identifier, required: true },
//     productName: { type: string, description: Name of the product ordered },
//     total: { type: number, description: Total order amount in USD },
//     deliveryDate: { type: string, description: Expected delivery date (YYYY-MM-DD) }
//   },
//   projectId: proj_abc123,
//   aiGenerate: false
// }

import { Template } from "../models/template.model.js";

export const createTemplate = async (
  name: string,
  channel: string,
  content: string,
  variables: string,
  projectId: string,
  globalUserId: string,
) => {
  //NOTE: check for prpject existance

  //NOTE: create Template
  const template = await Template.create({
    name,
    channel,
    content,
    variables,
    projectId,
    globalUserId,
  });

  return template;
};

export const getTemplates = async (globalUserId: string) => {
  const templates = await Template.find({ globalUserId });
  return templates;
};

export const getTemplateById = async (templateId: string) => {
  const template = await Template.findById(templateId);
  return template;
};

export const deleteTemplate = async (templateId: string) => {
  const template = await Template.findByIdAndDelete(templateId);
  return template;
};
