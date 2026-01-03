import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { Subheading } from '@/components/typescript/heading'
import { ChartsSection } from './ChartsSection'
import { MetricsGrid } from './MetricGrid'
import { NotificationFeed } from './NotificationFeed'

export default function Dashboard() {
  return (
    <Container className="flex flex-col gap-10">
      <div>
        <Eyebrow>Overview</Eyebrow>
        <Heading>Dashboard</Heading>
        <Subheading level={2}>Monitor your notification system's performance and activity</Subheading>
      </div>
      <MetricsGrid />
      <ChartsSection />
      <NotificationFeed />
      {/* <ProjectsOverview /> */}
      {/* <TemplatesAnalytics /> */}
      {/* <ApiKeysManagement /> */}
      {/* <ChannelPerformance /> */}
      {/* <SystemAlerts /> */}
      {/* <ActivityLog /> */}
    </Container>
  )
}
