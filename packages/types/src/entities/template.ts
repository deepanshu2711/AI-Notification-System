export interface Template {
  _id: string;
  name: string;
  channels: {
    email?: {
      subject: string;
      body: string;
    };
    sms?: {
      body: string;
    };
    whatsapp?: {
      body: string;
    };
  };
  aiGenerated: boolean;
  globalUserId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  variables: Record<string, any>;
}

export interface TemplateChannels {
  email?: {
    subject: string;
    body: string;
  };
  sms?: {
    body: string;
  };
  whatsapp?: {
    body: string;
  };
}

export interface TemplateVariable {
  description: string;
  required: boolean;
  example: string;
}

export interface CreateTemplateData {
  name: string;
  channels: TemplateChannels;
  variables: Record<string, TemplateVariable>;
  projectId: string;
}
