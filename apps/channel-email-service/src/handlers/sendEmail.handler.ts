import { AppError } from "@repo/config/helpers";
import { TemplateClient } from "../clients/templateClient.js";
import transporter from "../config/email.js";
import { MessageEventProducer } from "../producers/messageEvent.producer.js";

const publishMessageEvent = new MessageEventProducer();
const templateClient = new TemplateClient();

export const sendEmailHandler = async (data: any) => {
  console.log("received-email-data-to-consume", data);
  try {
    //NOTE: Fetch template from Template Service
    const templateResponse = await templateClient.getTemplateDetails(
      data.templateId,
    );
    if (!templateResponse) {
      throw new AppError("Template not found", 400);
    }

    //NOTE: convert proto → plain object (IMPORTANT)
    const template = templateResponse.toObject();

    //NOTE: Prepare email payload
    const mailOptions = {
      to: data.to?.[0]?.destination,
      subject: template.content?.subject,
      html: template.content?.body,
    };

    if (!mailOptions.to) {
      throw new AppError("Email destination not found", 400);
    }

    //NOTE: end email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    //NOTE: Publish success event
    await publishMessageEvent.publishMessageEvent({
      messageId: data.messageId,
      event_type: "delivered",
    });
  } catch (error) {
    console.error("Error in send email handler:", error);

    //NOTE: Publish failure event
    await publishMessageEvent.publishMessageEvent({
      messageId: data.messageId,
      event_type: "failed",
    });
  }
};
