import { Text } from '@/components/elements/text'
import { Badge } from '@/components/typescript/badge'
import { Subheading } from '@/components/typescript/heading'

interface Template {
  id: string
  name: string
  usageCount: number
  successRate: number
  channel: string
  isAIGenerated: boolean
}

const dummyTemplates: Template[] = [
  {
    id: '1',
    name: 'Welcome Email',
    usageCount: 2340,
    successRate: 97.5,
    channel: 'email',
    isAIGenerated: true,
  },
  {
    id: '2',
    name: 'Order Confirmation',
    usageCount: 1890,
    successRate: 99.2,
    channel: 'email',
    isAIGenerated: false,
  },
  {
    id: '3',
    name: 'Password Reset SMS',
    usageCount: 567,
    successRate: 95.8,
    channel: 'sms',
    isAIGenerated: true,
  },
  {
    id: '4',
    name: 'Marketing Newsletter',
    usageCount: 3420,
    successRate: 94.1,
    channel: 'email',
    isAIGenerated: false,
  },
  {
    id: '5',
    name: 'Appointment Reminder',
    usageCount: 890,
    successRate: 98.7,
    channel: 'sms',
    isAIGenerated: true,
  },
]

export function TemplatesAnalytics() {
  return (
    <div className="space-y-4">
      <Subheading className="text-lg font-semibold">Templates Analytics</Subheading>
      <div className="space-y-4">
        {dummyTemplates.map((template) => (
          <div key={template.id} className="rounded-lg border border-gray-500 p-4 transition-colors hover:bg-gray-50/1">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <Text className="font-medium">{template.name}</Text>
                <div className="mt-1 flex items-center gap-2">
                  <Badge color={template.channel === 'email' ? 'blue' : 'green'}>{template.channel}</Badge>
                  {template.isAIGenerated && <Badge color="purple">AI Generated</Badge>}
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div>Usage Count: {template.usageCount.toLocaleString()}</div>
              <div>Success Rate: {template.successRate}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
