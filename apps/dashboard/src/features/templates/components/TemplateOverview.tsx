'use client'
import { useState } from 'react'

import { Button } from '@/components/elements/button'
import { Text } from '@/components/elements/text'
import { PlusIcon } from '@/components/icons/plus-icon'
import { Badge } from '@/components/typescript/badge'
import { Heading } from '@/components/typescript/heading'
import { useCreateTemplateMutation } from '../hooks/mutation/useCreateTemplateMutation'
import { useGetTemplatesQuery } from '../hooks/query/useGetTemplatesQuery'
import { TemplateVariable } from '../types/template'
import { CreateTemplateModal } from './CreateTemplateModal'

interface Template {
  _id: string
  name: string
  channel: 'email' | 'sms' | 'whatsapp' | 'push' | 'multi'
  content: any
  variables: Record<string, TemplateVariable>
  aiGenerated: boolean
  globalUserId: string
  projectId: string
  createdAt: string
  updatedAt: string
}

const dummyTemplates: Template[] = [
  {
    _id: '1',
    name: 'Welcome Email',
    channel: 'email',
    content: { subject: 'Welcome to our platform!', body: 'Hi {{userName}}, welcome aboard!' },
    variables: {
      userName: {
        description: 'Recipient full name',
        required: true,
        example: 'Deepanshu',
      },
    },
    aiGenerated: true,
    globalUserId: 'user123',
    projectId: 'proj1',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    _id: '2',
    name: 'Order Confirmation SMS',
    channel: 'sms',
    content: { message: 'Your order #{{orderId}} is confirmed!' },
    variables: {
      orderId: {
        description: 'Order ID',
        required: true,
        example: 'ORD-1234',
      },
    },
    aiGenerated: false,
    globalUserId: 'user123',
    projectId: 'proj1',
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
  },
  {
    _id: '3',
    name: 'Promotional WhatsApp',
    channel: 'whatsapp',
    content: { message: 'Special offer: {{discount}}% off on {{product}}!' },
    variables: {
      discount: {
        description: 'Discount percentage',
        required: true,
        example: '25',
      },
      product: {
        description: 'Product name',
        required: true,
        example: 'Premium Plan',
      },
    },
    aiGenerated: true,
    globalUserId: 'user123',
    projectId: 'proj2',
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z',
  },
  {
    _id: '4',
    name: 'Push Notification',
    channel: 'push',
    content: { title: 'New Update', body: '{{message}}' },
    variables: {
      message: {
        description: 'Notification message',
        required: true,
        example: 'Your profile has been updated successfully',
      },
    },
    aiGenerated: false,
    globalUserId: 'user123',
    projectId: 'proj2',
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
  },
  {
    _id: '5',
    name: 'Multi-Channel Alert',
    channel: 'multi',
    content: {
      email: { subject: 'Alert', body: '{{alertMessage}}' },
      sms: { message: '{{alertMessage}}' },
      push: { title: 'Alert', body: '{{alertMessage}}' },
    },
    variables: {
      alertMessage: {
        description: 'Alert message content',
        required: true,
        example: 'Server maintenance scheduled for tonight',
      },
    },
    aiGenerated: true,
    globalUserId: 'user123',
    projectId: 'proj3',
    createdAt: '2024-01-19T11:30:00Z',
    updatedAt: '2024-01-19T11:30:00Z',
  },
]

const getChannelColor = (channel: string) => {
  switch (channel) {
    case 'email':
      return 'blue'
    case 'sms':
      return 'green'
    case 'whatsapp':
      return 'lime'
    case 'push':
      return 'purple'
    case 'multi':
      return 'orange'
    default:
      return 'zinc'
  }
}

export function TemplateOverview() {
  const [showModal, setShowModal] = useState(false)
  const { data } = useGetTemplatesQuery()
  const createTemplateMutation = useCreateTemplateMutation()

  const handleCreateTemplate = async (templateData: {
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
  }) => {
    try {
      await createTemplateMutation.mutateAsync(templateData)
      setShowModal(false)
    } catch (error) {
      console.error('Failed to create template:', error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading>Templates Overview</Heading>
        <Button onClick={() => setShowModal(true)}>
          <PlusIcon />
          Create New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        {data &&
          data.map((template) => (
            <div key={template._id} className="border-t border-gray-500 p-4 transition-colors hover:bg-gray-50/1">
              <div className="mb-2 flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Text className="font-medium">{template.name}</Text>
                  {template.aiGenerated && <Badge color="blue">AI Generated</Badge>}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge color={getChannelColor(template.channel)}>{template.channel.toUpperCase()}</Badge>
                  <Badge color="green">Active</Badge>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <div>Project ID: {template.projectId}</div>
                <div>Variables: {Object.keys(template.variables).length} defined</div>
                <div className="text-xs text-gray-500">
                  Created: {new Date(template.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
      </div>

      <CreateTemplateModal open={showModal} onClose={() => setShowModal(false)} onCreate={handleCreateTemplate} />
    </div>
  )
}
