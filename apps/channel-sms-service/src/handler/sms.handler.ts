import { AppError } from "@repo/config/helpers";
import { twilioClient } from "../config/twilio";

const replaceVariables = (text: string, vars: Record<string, any>) => {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => vars[key] || match);
};

export const sendSmsHandler = async (data: any) => {
  console.log("received-sms-data-to-consume", data);

  try {
    //NOTE: find recipient
    const recipient = data?.to?.find(
      (type: { channel: string; destination: string }) =>
        type.channel === "sms",
    ).destination;

    if (!recipient) {
      throw new AppError("sms destination not found", 400);
    }

    let { body } = data.template.channels?.sms ?? {};
    if (!body) {
      throw new AppError("sms body is empty", 400);
    }

    body = replaceVariables(body, data.variables);

    //NOTE: send sms through twilio
    const message = await twilioClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: recipient,
    });

    console.log("Message sent:", message.sid);
  } catch (error) {
    console.log("error sending sms", error);
  }
};
