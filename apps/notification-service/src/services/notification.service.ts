import { AppError } from "@repo/config/helpers";
import { ProjectClient } from "../clients/projectClient.js";
import { Message } from "../models/message.model.js";
import { NotificationProducer } from "../producers/notification.producer.js";
import { MessageEvent } from "../models/messageEvent.model.js";
import { TemplateClient } from "../clients/templateClient.js";

const projectClient = new ProjectClient();
const templateClient = new TemplateClient();
const publishNotification = new NotificationProducer();

type ChannelInput = {
  type: "email" | "sms" | "slack" | "push";
  destination: string;
  metadata?: Record<string, any>;
};

//NOTE: Duplication key logic
//"to": [{"channel":"sms","destination":"+9199..."}, {"channel":"email","destination":"a@b.com"}],
export const sendNotification = async (
  projectId: string,
  globalUserId: string,
  to: ChannelInput[],
  priority: string,
  templateId: string,
  variables: Record<string, any> = {},
) => {
  //NOTE: FIRST CHECK IF THIS PROJECT EXISTS FROM MANAGEMENT SERVICE
  const projectExists = await projectClient.checkProjectExists(projectId);
  if (projectExists) throw new AppError("Project does not exist", 400);

  //NOTE: CHECK TEMPLATE EXIST LOGIC HERE
  const template = await templateClient.getTemplateDetails(templateId);
  if (!template) throw new AppError("Template does not exist", 400);

  //NOTE: CREATE MESSAGE AND MESSAGE
  const createdMessage = await Message.create({
    projectId,
    priority,
    to,
    globalUserId,
  });

  //NOTE: CREATE MESSAGE EVENT
  await MessageEvent.create({
    messageId: createdMessage._id,
    event_type: "queued",
  });

  //NOTE: PUBLISH MESSAGE TO RABBITMQ
  await publishNotification.publishNotification({
    to,
    messageId: createdMessage._id,
    templateId,
    variables,
  });

  return createdMessage;
};
