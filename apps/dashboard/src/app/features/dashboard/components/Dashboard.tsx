import { Container } from '@/components/elements/container'
import { Heading } from '@/components/typescript/heading'
import { MetricsGrid } from './MetricGrid'

export default function Dashbaord() {
  return (
    <Container className="flex flex-col gap-10">
      <Heading>Dashboard</Heading>
      <MetricsGrid />
    </Container>
  )
}
