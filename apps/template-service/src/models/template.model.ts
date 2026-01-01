const DEFAULT_SYSTEM_PROMPT = `You are a professional notification assistant.
Your task is to generate clear, accurate, and engaging messages based on the provided context and variables.

Rules:
- Use ONLY the variables provided to you; do not invent or assume missing information.
- Replace variables naturally in the message where appropriate.
- Match the requested tone and communication style.
- Ensure the message is clear, concise, and easy to understand.
- Follow best practices for the specified communication channel.
- Do not include explanations, placeholders, or variable names in the final output.
- Return only the final message content.`;

import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    channel: {
      type: String,
      enum: ["email", "sms", "whatsapp", "push", "multi"],
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    variables: { type: mongoose.Schema.Types.Mixed, default: {} },
    aiGenerated: { type: Boolean, default: false },
    globalUserId: { type: String, required: true },
    projectId: { type: String, required: true },
  },
  { timestamps: true },
);

templateSchema.pre("validate", function () {
  const content = this.content;

  // ✅ Auto-inject systemPrompt for AI templates
  if (this.aiGenerated === true) {
    if (content && typeof content === "object" && !content.systemPrompt) {
      content.systemPrompt = DEFAULT_SYSTEM_PROMPT;
    }
  }

  // -------------------------
  // Validation
  // -------------------------

  if (this.aiGenerated === true) {
    const isValidAI =
      content &&
      typeof content === "object" &&
      typeof content.systemPrompt === "string" &&
      typeof content.userPrompt === "string" &&
      typeof content.tone === "string" &&
      typeof content.maxLength === "number";

    if (!isValidAI) {
      throw new Error("Invalid content structure for AI-generated template");
    }
  } else {
    const isValidStatic =
      content &&
      typeof content === "object" &&
      typeof content.subject === "string" &&
      typeof content.body === "string";

    if (!isValidStatic) {
      throw new Error("Invalid content structure for static template");
    }
  }
});

export const Template = mongoose.model("template", templateSchema);
