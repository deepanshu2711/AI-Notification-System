import mongoose, { model, Schema } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    globalUserId: { type: String, required: true },
    settings: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

ProjectSchema.index({ globalUserId: 1 });

export const Project = model("project", ProjectSchema);
