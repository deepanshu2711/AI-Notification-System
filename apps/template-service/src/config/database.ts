import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/template-service");
    console.log("Template Service Db Connected");
  } catch (e) {
    console.log("Error connection to Template Service Database");
    process.exit();
  }
};
