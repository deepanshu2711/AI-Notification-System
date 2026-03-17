import { AppError } from "@repo/config/helpers";
import { twilioClient } from "../config/twilio.js";

export const whatsappHandler = async (data: any) => {
  console.log("sending whatapp message", data);
  try {
    //NOTE: find recipient
    const recipient = data?.to?.find(
      (type: { channel: string; destination: string }) =>
        type.channel === "whatsapp",
    ).destination;

    if (!recipient) {
      throw new AppError("sms destination not found", 400);
    }

    //NOTE: send whatapp through twilio

    const formattedTo = `whatsapp:${recipient}`;
    const formattedFrom = "whatsapp:+14155238886";

    console.log(formattedFrom, formattedTo);

    const message = await twilioClient.messages.create({
      body: data?.message || "Hi, Deepanshu",
      from: formattedFrom,
      to: formattedTo,
    });

    console.log("Whatsapp message sent:", message.sid);
  } catch (error) {
    console.log("error sending whatapp message", error);
  }
};
