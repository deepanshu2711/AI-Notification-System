'use client'

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Dummy data: Delivery rate percentage over last 7 days
const data = [
  { date: 'Jan 3', rate: 95 },
  { date: 'Jan 2', rate: 98 },
  { date: 'Jan 1', rate: 97 },
  { date: 'Dec 31', rate: 96 },
  { date: 'Dec 30', rate: 99 },
  { date: 'Dec 29', rate: 94 },
  { date: 'Dec 28', rate: 98 },
]

export function DeliveryRateChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[90, 100]} />
        <Tooltip formatter={(value) => [`${value}%`, 'Delivery Rate']} />
        <Line type="monotone" dataKey="rate" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}
