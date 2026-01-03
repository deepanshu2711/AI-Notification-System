import { Container } from '@/components/elements/container'
import { Heading } from '@/components/typescript/heading'
import { MetricsGrid } from './MetricGrid'
import { NotificationFeed } from './NotificationFeed'

export default function Dashboard() {
  return (
    <Container className="flex flex-col gap-10">
      <Heading>Dashboard</Heading>
      <MetricsGrid />
      <NotificationFeed />
    </Container>
  )
}
