'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Dummy data: API calls per day over last 7 days
const data = [
  { date: 'Jan 3', calls: 1200 },
  { date: 'Jan 2', calls: 1100 },
  { date: 'Jan 1', calls: 1300 },
  { date: 'Dec 31', calls: 1050 },
  { date: 'Dec 30', calls: 1250 },
  { date: 'Dec 29', calls: 1150 },
  { date: 'Dec 28', calls: 1350 },
]

export function ApiUsageChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => [value, 'API Calls']} />
        <Area type="monotone" dataKey="calls" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
