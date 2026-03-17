import { AppError } from "@repo/config/helpers";
import { twilioClient } from "../config/twilio.js";

const replaceVariables = (text: string, vars: Record<string, any>) => {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => vars[key] || match);
};

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

    let { body } = data.template.channels?.whatsapp ?? {};
    if (!body) {
      throw new AppError("whatsapp body is empty", 400);
    }
    body = replaceVariables(body, data.variables);

    //NOTE: send whatapp through twilio

    const formattedTo = `whatsapp:${recipient}`;
    const formattedFrom = "whatsapp:+14155238886";

    console.log(formattedFrom, formattedTo);

    const message = await twilioClient.messages.create({
      body,
      from: formattedFrom,
      to: formattedTo,
    });

    console.log("Whatsapp message sent:", message.sid);
  } catch (error) {
    console.log("error sending whatapp message", error);
  }
};
