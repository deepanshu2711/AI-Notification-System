import { MessageEventProducer } from "../producers/messageEvent.producer.js";

const publishMessageEvent = new MessageEventProducer();
export const sendEmailHandler = async (data: any) => {
  try {
    await publishMessageEvent.publishMessageEvent(data);
    console.log("received-email-datai-to-consume", data);
  } catch (e) {
    console.log("Error in send email handler", e);
  }
};
