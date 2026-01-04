import { Text } from '@/components/elements/text'
import { Badge } from '@/components/typescript/badge'
import { Subheading } from '@/components/typescript/heading'
import { AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'

interface Alert {
  id: string
  type: 'error' | 'warning' | 'success'
  message: string
  service: string
  timestamp: string
  resolved: boolean
}

const dummyAlerts: Alert[] = [
  {
    id: '1',
    type: 'error',
    message: 'Email service experiencing high latency',
    service: 'channel-email-service',
    timestamp: '2026-01-03T10:30:00Z',
    resolved: false,
  },
  {
    id: '2',
    type: 'warning',
    message: 'API quota nearing limit for key #123',
    service: 'auth-service',
    timestamp: '2026-01-03T09:15:00Z',
    resolved: false,
  },
  {
    id: '3',
    type: 'success',
    message: 'Template service restarted successfully',
    service: 'template-service',
    timestamp: '2026-01-03T08:45:00Z',
    resolved: true,
  },
  {
    id: '4',
    type: 'error',
    message: 'Database connection timeout in notification-service',
    service: 'notification-service',
    timestamp: '2026-01-03T07:20:00Z',
    resolved: true,
  },
]

function formatTimestamp(dateString: string) {
  return new Date(dateString).toLocaleString()
}

function getAlertIcon(type: string) {
  switch (type) {
    case 'error':
      return <XCircleIcon className="h-5 w-5 text-red-500" />
    case 'warning':
      return <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />
    case 'success':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />
    default:
      return null
  }
}

export function SystemAlerts() {
  return (
    <div className="space-y-4">
      <Subheading className="text-lg font-semibold">System Alerts</Subheading>
      <div className="space-y-4">
        {dummyAlerts.map((alert) => (
          <div key={alert.id} className="rounded-lg border border-gray-500 p-4 transition-colors hover:bg-gray-50/1">
            <div className="flex items-start gap-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Text className="font-medium">{alert.message}</Text>
                  {alert.resolved && <Badge color="emerald">Resolved</Badge>}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Service: {alert.service}</div>
                  <div>Time: {formatTimestamp(alert.timestamp)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
