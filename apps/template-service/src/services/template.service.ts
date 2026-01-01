// NOTE: For non-AI templates:
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
//   aiGenerated: false
// }

// NOTE: For AI templates:
// {
//   name: Order Confirmation Email,
//   channel: email,
//   content: {
//     systemPrompt: "You are a notification writing assistant",
//     userPrompt: "Write a {{channel}} message for {{event}}",
//     tone: "professional",
//     maxLength: 120
//   },
//   variables: {
//     channel: { type: string, description: Channel type, required: true },
//     event: { type: string, description: Event description, required: true }
//   },
//   projectId: proj_abc123,
//   aiGenerated: true
// }

import { Template } from "../models/template.model.js";

export const createTemplate = async (
  name: string,
  channel: string,
  content: any,
  variables: any,
  projectId: string,
  globalUserId: string,
  aiGenerated: boolean = false,
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
    aiGenerated,
  });

  return template;
};

export const getTemplates = async (globalUserId: string) => {
  const templates = await Template.find({ globalUserId });
  return templates;
};

export const getTemplateById = async (templateId: string) => {
  const template = await Template.findById(templateId).lean();
  return template;
};

export const deleteTemplate = async (templateId: string) => {
  const template = await Template.findByIdAndDelete(templateId);
  return template;
};
