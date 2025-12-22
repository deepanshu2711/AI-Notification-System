import { model, Schema } from "mongoose";

const ChannelSchema = new Schema(
  {
    channel: {
      type: String,
      enum: ["email", "sms", "slack", "push"],
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { _id: false },
);

const MessageSchema = new Schema(
  {
    projectId: { type: String, required: true },
    globalUserId: { type: String, required: true },
    priority: { type: String },
    to: {
      type: [ChannelSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export const Message = model("message", MessageSchema);
