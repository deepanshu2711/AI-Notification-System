import { Text } from '@/components/elements/text'
import { Badge } from '@/components/typescript/badge'
import { Subheading } from '@/components/typescript/heading'

interface ApiKey {
  id: string
  name: string
  createdAt: string
  lastUsed: string
  usageCount: number
  quota: number
}

const dummyApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    createdAt: '2024-12-01',
    lastUsed: '2026-01-03',
    usageCount: 15420,
    quota: 50000,
  },
  {
    id: '2',
    name: 'Development API Key',
    createdAt: '2024-11-15',
    lastUsed: '2026-01-02',
    usageCount: 3240,
    quota: 10000,
  },
  {
    id: '3',
    name: 'Testing API Key',
    createdAt: '2024-12-15',
    lastUsed: '2026-01-01',
    usageCount: 890,
    quota: 5000,
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString()
}

export function ApiKeysManagement() {
  return (
    <div className="space-y-4">
      <Subheading className="text-lg font-semibold">API Keys Management</Subheading>
      <div className="space-y-4">
        {dummyApiKeys.map((key) => (
          <div key={key.id} className="rounded-lg border border-gray-500 p-4 transition-colors hover:bg-gray-50/1">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <Text className="font-medium">{key.name}</Text>
                <Text className="text-xs text-gray-500">ID: {key.id}</Text>
              </div>
              <Badge color="emerald">Active</Badge>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div>Created: {formatDate(key.createdAt)}</div>
              <div>Last Used: {formatDate(key.lastUsed)}</div>
              <div>
                Usage: {key.usageCount.toLocaleString()} / {key.quota.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
