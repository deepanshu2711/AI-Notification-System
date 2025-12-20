import { MessageEvent } from "../models/messageEvent.model.js";

export const messgaeEventHandler = async (data: any) => {
  try {
    console.log(data);
    //    await MessageEvent.create();
  } catch (error) {
    console.log("Error Creating User", error);
    throw error;
  }
};
