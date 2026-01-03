import { MetricCard } from './MetricCard'
export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard title="API Calls Used" value="1,234" subtitle="of 10,000 quota" />
      <MetricCard title="Notifications Today" value="89" subtitle="+12% from yesterday" />
      <MetricCard title="Notifications This Month" value="2,456" subtitle="98.5% delivery rate" />
      <MetricCard title="Active Projects" value="5" subtitle="3 created this week" />
    </div>
  )
}
