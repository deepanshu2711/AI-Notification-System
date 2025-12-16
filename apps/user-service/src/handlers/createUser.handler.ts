import { User } from "../models/user.model.js";

export const createUserHandler = async (data: any) => {
  try {
    await User.create({
      email: data.data.email,
      globalUserId: data.data.globalUserId,
    });
  } catch (error) {
    console.log("Error Creating User", error);
    throw error;
  }
};
