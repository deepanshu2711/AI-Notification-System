import { AppError } from "@repo/config/helpers";
import { ProjectClient } from "../clients/projectClient.js";
import { Message } from "../models/message.model.js";
import { NotificationProducer } from "../producers/notification.producer.js";
import { MessageEvent } from "../models/messageEvent.model.js";
import { TemplateClient } from "../clients/templateClient.js";
import { ApiClient } from "../clients/apiClient.js";

const projectClient = new ProjectClient();
const templateClient = new TemplateClient();
const apiClient = new ApiClient();
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
  hashedApiKey: string,
) => {
  //NOTE: CHECK API KEY HERE

  const isValid = await apiClient.validateApiKey(hashedApiKey);
  if (!isValid) throw new AppError("Api Key is not valid", 401);

  //NOTE: FIRST CHECK IF THIS PROJECT EXISTS FROM MANAGEMENT SERVICE
  const projectExists = await projectClient.checkProjectExists(projectId);
  if (!projectExists) throw new AppError("Project does not exist", 400);

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

  //NOTE: FOR Testing
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  //NOTE: PUBLISH MESSAGE TO RABBITMQ
  await publishNotification.publishNotification({
    to,
    messageId: createdMessage._id,
    templateId,
    variables,
  });

  return createdMessage;
};

export const checkMessageExists = async (id: string) => {
  const message = await Message.findById(id);
  if (!message) throw new AppError("Message not found", 404);
};

export const getMessage = async (id: string) => {
  const message = await Message.findById(id);
  if (!message) throw new AppError("Message not found", 404);
  return message as any;
};

export const getMessageEvents = async (messageId: string) => {
  return await MessageEvent.find({ messageId }).sort({ createdAt: 1 });
};

export const getRecentNotifications = async (globalUserId: string) => {
  console.log("global user id", globalUserId);
  return await Message.aggregate([
    {
      $match: {
        globalUserId: globalUserId,
      },
    },
    {
      $lookup: {
        from: "message_events",
        localField: "_id",
        foreignField: "messageId",
        as: "messageEvents",
      },
    },
    {
      $addFields: {
        latestMessageEvent: {
          $arrayElemAt: [
            {
              $slice: [
                {
                  $sortArray: {
                    input: "$messageEvents",
                    sortBy: {
                      createdAt: -1,
                    },
                  },
                },
                0,
                1,
              ],
            },
            0,
          ],
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 1,
        globalUserId: 1,
        priority: 1,
        to: 1,
        projectId: 1,
        createdAt: 1,
        latestStatus: "$latestMessageEvent.event_type",
      },
    },
  ]);
};

export const getAllMessages = async (
  globalUserId: string,
  page: number = 1,
  limit: number = 20,
) => {
  const skip = (page - 1) * limit;

  const messages = await Message.aggregate([
    {
      $match: {
        globalUserId: globalUserId,
      },
    },
    {
      $lookup: {
        from: "message_events",
        localField: "_id",
        foreignField: "messageId",
        as: "messageEvents",
      },
    },
    {
      $addFields: {
        latestMessageEvent: {
          $arrayElemAt: [
            {
              $slice: [
                {
                  $sortArray: {
                    input: "$messageEvents",
                    sortBy: {
                      createdAt: -1,
                    },
                  },
                },
                0,
                1,
              ],
            },
            0,
          ],
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $project: {
        _id: 1,
        globalUserId: 1,
        priority: 1,
        to: 1,
        projectId: 1,
        createdAt: 1,
        latestStatus: "$latestMessageEvent.event_type",
      },
    },
  ]);

  const total = await Message.countDocuments({ globalUserId });

  return {
    messages,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
