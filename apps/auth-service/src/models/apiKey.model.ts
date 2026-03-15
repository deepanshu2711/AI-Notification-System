import { model, Schema } from "mongoose";

const ApiKeySchema = new Schema(
  {
    globalUserId: { type: String, required: true },
    hashedKey: { type: String, required: true },
    name: { type: String },

    usageCount: { type: Number, default: 0 },
    lastUsedAt: { type: Date },
  },
  { timestamps: true },
);

ApiKeySchema.index({ globalUserId: 1 }, { unique: true });
ApiKeySchema.index({ hashedKey: 1 }, { unique: true });

export const ApiKey = model("apikey", ApiKeySchema);
