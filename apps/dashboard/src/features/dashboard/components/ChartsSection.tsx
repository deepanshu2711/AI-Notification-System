'use client'

import { Heading } from '@/components/typescript/heading'
import { ApiUsageChart } from './ApiUsageChart'
import { DeliveryRateChart } from './DeliveryRateChart'

export function ChartsSection() {
  return (
    <div className="space-y-4">
      <Heading level={3}>Analytics Overview</Heading>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-500 bg-white p-4">
          <p className="mb-4 text-lg font-semibold">Delivery Rate Trends (Last 7 Days)</p>
          <DeliveryRateChart />
        </div>
        <div className="rounded-lg border border-gray-500 bg-white p-4">
          <p className="mb-4 text-lg font-semibold">API Usage Trends (Last 7 Days)</p>
          <ApiUsageChart />
        </div>
      </div>
    </div>
  )
}
