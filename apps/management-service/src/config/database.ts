import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/management-service");
    console.log("Management Service Db Connected");
  } catch (e) {
    console.log("Error connection to Management Service Database");
    process.exit();
  }
};
