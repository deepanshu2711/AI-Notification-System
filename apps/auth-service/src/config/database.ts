import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth-service");
  } catch (e) {
    console.log("Error connection to Auth Service Database");
    process.exit();
  }
};
