import { Text } from '@/components/elements/text'
import { Subheading } from '@/components/typescript/heading'
import { FileTextIcon, SendIcon, SettingsIcon, UserIcon } from 'lucide-react'

interface Activity {
  id: string
  type: 'user_action' | 'system_event' | 'notification_sent' | 'template_updated'
  description: string
  user: string
  timestamp: string
}

const dummyActivities: Activity[] = [
  {
    id: '1',
    type: 'notification_sent',
    description: 'Sent bulk email campaign to 1,200 recipients',
    user: 'admin@example.com',
    timestamp: '2026-01-03T11:45:00Z',
  },
  {
    id: '2',
    type: 'template_updated',
    description: 'Updated welcome email template',
    user: 'designer@example.com',
    timestamp: '2026-01-03T10:20:00Z',
  },
  {
    id: '3',
    type: 'user_action',
    description: 'Created new project "Mobile App Notifications"',
    user: 'manager@example.com',
    timestamp: '2026-01-03T09:30:00Z',
  },
  {
    id: '4',
    type: 'system_event',
    description: 'Scheduled maintenance completed successfully',
    user: 'system',
    timestamp: '2026-01-03T08:00:00Z',
  },
  {
    id: '5',
    type: 'notification_sent',
    description: 'SMS reminders sent to 450 users',
    user: 'scheduler@example.com',
    timestamp: '2026-01-03T07:15:00Z',
  },
]

function formatTimestamp(dateString: string) {
  return new Date(dateString).toLocaleString()
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'user_action':
      return <UserIcon className="h-5 w-5 text-blue-500" />
    case 'system_event':
      return <SettingsIcon className="h-5 w-5 text-gray-500" />
    case 'notification_sent':
      return <SendIcon className="h-5 w-5 text-green-500" />
    case 'template_updated':
      return <FileTextIcon className="h-5 w-5 text-purple-500" />
    default:
      return null
  }
}

export function ActivityLog() {
  return (
    <div className="space-y-4">
      <Subheading className="text-lg font-semibold">Activity Log</Subheading>
      <div className="space-y-4">
        {dummyActivities.map((activity) => (
          <div key={activity.id} className="rounded-lg border border-gray-500 p-4 transition-colors hover:bg-gray-50/1">
            <div className="flex items-start gap-3">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <Text className="mb-1 font-medium">{activity.description}</Text>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>By: {activity.user}</span>
                  <span>•</span>
                  <span>{formatTimestamp(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
