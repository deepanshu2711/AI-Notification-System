export interface TemplateVariable {
  description: string
  required: boolean
  example: string
}

export interface Template {
  _id: string
  name: string
  channel: 'email' | 'sms' | 'whatsapp' | 'push' | 'multi'
  content: {
    subject?: string
    body?: string
    message?: string
    title?: string
    email?: {
      subject: string
      body: string
    }
    sms?: {
      message: string
    }
    push?: {
      title: string
      body: string
    }
  }
  variables: Record<string, TemplateVariable>
  aiGenerated: boolean
  globalUserId: string
  projectId: string
  createdAt: string
  updatedAt: string
}

export interface CreateTemplateData {
  name: string
  channel: string
  content: {
    subject?: string
    body?: string
    message?: string
    title?: string
  }
  variables: Record<string, TemplateVariable>
  projectId: string
}
