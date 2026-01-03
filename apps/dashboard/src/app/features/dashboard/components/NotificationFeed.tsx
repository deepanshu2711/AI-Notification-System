import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Badge } from '@/components/typescript/badge'
import { Heading } from '@/components/typescript/heading'
import { DotIcon } from 'lucide-react'

interface Notification {
  _id: string
  projectId: string
  globalUserId: string
  priority: 'high' | 'medium' | 'low'
  to: {
    channel: string
    destination: string
  }[]
  createdAt: string
  latestStatus: string
}

const dummyData: Notification[] = [
  {
    _id: '69561b73f6b823c86dcc1bd1',
    projectId: '123',
    globalUserId: '12313',
    priority: 'high',
    to: [
      {
        channel: 'email',
        destination: 'deepanshusaini2711@gmail.com',
      },
    ],
    createdAt: '2026-01-01T07:00:03.820Z',
    latestStatus: 'delivered',
  },
  {
    _id: '69561b37f6b823c86dcc1bc9',
    projectId: '123',
    globalUserId: '12313',
    priority: 'high',
    to: [
      {
        channel: 'email',
        destination: 'deepanshusaini2711@gmail.com',
      },
    ],
    createdAt: '2026-01-01T06:59:03.054Z',
    latestStatus: 'failed',
  },
  {
    _id: '69561a70d075e07ca07669c0',
    projectId: '123',
    globalUserId: '12313',
    priority: 'low',
    to: [
      {
        channel: 'email',
        destination: 'deepanshusaini2711@gmail.com',
      },
    ],
    createdAt: '2026-01-01T06:55:44.232Z',
    latestStatus: 'queued',
  },
  {
    _id: '695619f4cd3c67ca9f487c1f',
    projectId: '123',
    globalUserId: '12313',
    priority: 'low',
    to: [
      {
        channel: 'email',
        destination: 'deepanshusaini2711@gmail.com',
      },
    ],
    createdAt: '2026-01-01T06:53:40.012Z',
    latestStatus: 'delivered',
  },
  {
    _id: '695619b0cd3c67ca9f487c17',
    projectId: '123',
    globalUserId: '12313',
    priority: 'high',
    to: [
      {
        channel: 'email',
        destination: 'deepanshusaini2711@gmail.com',
      },
    ],
    createdAt: '2026-01-01T06:52:32.358Z',
    latestStatus: 'delivered',
  },
]

function timeAgo(dateString: string) {
  const now = new Date()
  const past = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }

  return 'just now'
}

export function NotificationFeed() {
  return (
    <div className="space-y-4">
      <Heading level={3}>Recent Notifications</Heading>
      <div className="space-y-6">
        {dummyData.map((notification) => (
          <div
            key={notification._id}
            className="border-t border-gray-500 bg-gray-50/1 p-4 transition-colors hover:cursor-pointer hover:bg-gray-50/2"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Text>Proj-{notification.projectId}</Text>
                  <Text className="text-sm text-gray-600">
                    <Badge
                      color={
                        notification.priority === 'high' ? 'red' : notification.priority === 'medium' ? 'amber' : 'sky'
                      }
                    >
                      {notification.priority}
                    </Badge>
                  </Text>
                </div>

                <Text className="mb-1 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    {notification.to[0]?.channel}
                    <DotIcon className="h-4 w-4 text-gray-100" />
                    {notification.to[0]?.destination}
                  </span>
                </Text>

                <Text className="text-xs text-gray-500">{timeAgo(notification.createdAt)}</Text>
              </div>
              <Badge
                color={
                  notification.latestStatus === 'delivered'
                    ? 'emerald'
                    : notification.latestStatus === 'failed'
                      ? 'rose'
                      : 'orange'
                }
                className="text-sm font-medium"
              >
                {notification.latestStatus}
              </Badge>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end">
        <button className="text-sm font-medium text-blue-600 transition hover:text-blue-700">
          View all notifications <ArrowNarrowRightIcon />
        </button>
      </div>
    </div>
  )
}
