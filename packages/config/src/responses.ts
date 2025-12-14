import type { Response } from "express";

export const successResponse = (
  res: Response,
  data: any,
  message: string = "success",
  status: number = 200,
) => {
  return res.status(status).json({ message, data });
};

export const errorResponse = (
  res: Response,
  message: string = "Something went wrong",
  status: number = 500,
) => {
  return res.status(status).json({ message });
};
