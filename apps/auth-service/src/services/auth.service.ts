import axios from "axios";
import crypto from "crypto";

import { AppError } from "@repo/config/helpers";
import { ApiKey } from "../models/apiKey.model.js";

export const getToken = async ({
  code,
  clientId,
}: {
  code: string;
  clientId: string;
}) => {
  const response = await axios.post(`http://localhost:5005/api/auth/token`, {
    code,
    clientId,
    clientSecret: process.env.CLIENT_SECRET,
  });

  const { accessToken, refreshToken } = response.data.data;
  return { accessToken, refreshToken };
};

export const generateApiKey = async (userId: string, name?: string) => {
  const existingKey = await ApiKey.findOne({ globalUserId: userId });
  if (existingKey) throw new AppError("Api Key already exists", 400);
  const rawKey = crypto.randomBytes(32).toString("hex");
  const hashedKey = crypto.createHash("sha256").update(rawKey).digest("hex");

  await ApiKey.create({
    globalUserId: userId,
    hashedKey,
    name: name ?? "Default",
  });
  return rawKey;
};
