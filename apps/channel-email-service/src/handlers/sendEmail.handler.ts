import { MessageEventProducer } from "../producers/messageEvent.producer.js";

const publishMessageEvent = new MessageEventProducer();
export const sendEmailHandler = async (data: any) => {
  try {
    await publishMessageEvent.publishMessageEvent({
      messageId: data.messageId,
      event_type: "delivered",
    });
    console.log("received-email-datai-to-consume", data);
  } catch (e) {
    await publishMessageEvent.publishMessageEvent({
      messageId: data.messageId,
      event_type: "failed",
    });
    console.log("Error in send email handler", e);
  }
};
