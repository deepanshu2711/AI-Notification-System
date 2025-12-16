import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    globalUserId: { type: String, unique: true },
    email: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const User = mongoose.model("user", userSchema);
