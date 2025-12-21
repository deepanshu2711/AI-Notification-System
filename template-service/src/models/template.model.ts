import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  channel: { type: String, enum: ['email', 'sms', 'whatsapp', 'push', 'multi'], required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true }, // JSON/text for template body
  variables: { type: mongoose.Schema.Types.Mixed, default: {} }, // JSON for variable definitions
  version: { type: Number, default: 1 },
  aiGenerated: { type: Boolean, default: false },
  globalUserId: { type: String, required: true }, // For user scoping
  projectId: { type: String, required: true }, // Matches README's project_id
  versions: [{ // Embedded versions for history
    version: Number,
    content: mongoose.Schema.Types.Mixed,
    variables: mongoose.Schema.Types.Mixed,
    createdAt: Date
  }]
}, { timestamps: true }); // Adds createdAt, updatedAt

templateSchema.index({ globalUserId: 1, projectId: 1 }); // For efficient queries

export const Template = mongoose.model('Template', templateSchema, 'templates');