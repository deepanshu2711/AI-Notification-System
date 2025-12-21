import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    channel: {
      type: String,
      enum: ["email", "sms", "whatsapp", "push", "multi"],
      required: true,
    },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    variables: { type: mongoose.Schema.Types.Mixed, default: {} },
    aiGenerated: { type: Boolean, default: false },
    globalUserId: { type: String, required: true },
    projectId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Template = mongoose.model("template", templateSchema);
