import { User } from "../models/user.model.js";

export const updateUserHandler = async (data: any) => {
  try {
    await User.findOneAndUpdate(
      { globalUserId: data.data.globalUserId },
      { $set: { email: data.data.email } },
      { new: true },
    );
  } catch (error) {
    console.log("Error Updating User", error);
    throw error;
  }
};
