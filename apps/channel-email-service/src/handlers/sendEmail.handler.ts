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
    // const recipient = data?.to?.[0]?.destination;
    const recipient = data?.to?.find(
      (type: { channel: string; destination: string }) =>
        type.channel === "email",
    ).destination;

    if (!recipient) {
      throw new AppError("Email destination not found", 400);
    }

    const template = data.template;
    let { subject, body } = template.channels?.email ?? {};

    if (!template.aiGenerated && !body) {
      throw new AppError("Email body is empty", 400);
    }

    /** -------------------------
     *  AI content generation
     *  ------------------------- */
    console.log("template", template);
    if (!template.aiGenerated) {
      const replaceVariables = (text: string, vars: Record<string, any>) => {
        return text.replace(
          /\{\{(\w+)\}\}/g,
          (match, key) => vars[key] || match,
        );
      };
      subject = subject ? replaceVariables(subject, data.variables) : subject;
      body = replaceVariables(body!, data.variables);
    } else {
      // For AI templates: generate personalized content
      const aiContent = await aiClient.generateContent(
        data.variables,
        template,
      );

      body = aiContent.body;
      subject = aiContent.subject;
      // body = await aiClient.generateContent(
      //   "Generate personalized content based on template and variables",
      //   data.variables,
      //   template,
      // );
      //
      console.log("aiContent", aiContent);
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
