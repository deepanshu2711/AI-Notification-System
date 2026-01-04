import { Text } from '@/components/elements/text'
import { Badge } from '@/components/typescript/badge'
import { Subheading } from '@/components/typescript/heading'

interface Channel {
  name: string
  totalSent: number
  deliveryRate: number
  averageResponseTime: string
  costPerUnit: number
  status: 'healthy' | 'degraded' | 'down'
}

const dummyChannels: Channel[] = [
  {
    name: 'Email',
    totalSent: 25680,
    deliveryRate: 97.5,
    averageResponseTime: '2.3s',
    costPerUnit: 0.001,
    status: 'healthy',
  },
  {
    name: 'SMS',
    totalSent: 8940,
    deliveryRate: 94.2,
    averageResponseTime: '1.8s',
    costPerUnit: 0.008,
    status: 'healthy',
  },
  {
    name: 'Push Notifications',
    totalSent: 12340,
    deliveryRate: 89.7,
    averageResponseTime: '0.5s',
    costPerUnit: 0.003,
    status: 'degraded',
  },
]

export function ChannelPerformance() {
  return (
    <div className="space-y-4">
      <Subheading className="text-lg font-semibold">Channel Performance</Subheading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {dummyChannels.map((channel) => (
          <div
            key={channel.name}
            className="rounded-lg border border-gray-500 p-4 transition-colors hover:bg-gray-50/1"
          >
            <div className="mb-2 flex items-start justify-between">
              <Text className="font-medium">{channel.name}</Text>
              <Badge
                color={channel.status === 'healthy' ? 'emerald' : channel.status === 'degraded' ? 'amber' : 'rose'}
              >
                {channel.status}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div>Total Sent: {channel.totalSent.toLocaleString()}</div>
              <div>Delivery Rate: {channel.deliveryRate}%</div>
              <div>Avg Response: {channel.averageResponseTime}</div>
              <div>Cost/Unit: ${channel.costPerUnit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
