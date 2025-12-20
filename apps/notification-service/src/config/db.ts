import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/notification");
    console.log("Connecd to Notification Service Successfully");
  } catch (e) {
    console.log(
      "Something went wrong while connection to Notification Service",
      e,
    );
  }
};
