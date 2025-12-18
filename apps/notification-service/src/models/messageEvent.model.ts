import mongoose, { model, Schema, Types } from "mongoose";

const MessageEventSchema = new Schema(
  {
    messageId: { type: Types.ObjectId, ref: "message", required: true },
    event_type: {
      type: String,
      enum: [
        "queued",
        "sent_to_provider",
        "provider_response",
        "delivered",
        "failed",
        "opened",
        "clicked",
        "bounced",
      ],
    },
    payload: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

MessageEventSchema.index({ messageId: 1, createdAt: -1 });
export const MessageEvent = model("message_event", MessageEventSchema);
