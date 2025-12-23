import { AppError } from "@repo/config/helpers";
import { TemplateClient } from "../clients/templateClient.js";
import transporter from "../config/email.js";
import { MessageEventProducer } from "../producers/messageEvent.producer.js";
import { AiClient } from "../clients/aiClient.js";

const templateClient = new TemplateClient();
const aiClient = new AiClient();
const messageEventProducer = new MessageEventProducer();

export const sendEmailHandler = async (data: any) => {
  console.log("received-email-data-to-consume", data);

  try {
    /** -------------------------
     *  Validate input
     *  ------------------------- */
    const recipient = data?.to?.[0]?.destination;
    if (!recipient) {
      throw new AppError("Email destination not found", 400);
    }

    /** -------------------------
     *  Fetch template
     *  ------------------------- */
    const templateResponse = await templateClient.getTemplateDetails(
      data.templateId,
    );

    if (!templateResponse) {
      throw new AppError("Template not found", 400);
    }

    const template = templateResponse.toObject();
    let { subject, body } = template.content ?? {};

    if (!body) {
      throw new AppError("Email body is empty", 400);
    }

    /** -------------------------
     *  AI content generation
     *  ------------------------- */
    if (template.aiGenerated) {
      body = await aiClient.generateContent(body);
    }

    /** -------------------------
     *  Send email
     *  ------------------------- */
    const mailOptions = {
      to: recipient,
      subject,
      html: body,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    /** -------------------------
     *  Publish success event
     *  ------------------------- */
    await messageEventProducer.publishMessageEvent({
      messageId: data.messageId,
      event_type: "delivered",
    });
  } catch (error) {
    console.error("Error in sendEmailHandler:", error);

    /** -------------------------
     *  Publish failure event
     *  ------------------------- */
    await messageEventProducer.publishMessageEvent({
      messageId: data.messageId,
      event_type: "failed",
    });
  }
};
