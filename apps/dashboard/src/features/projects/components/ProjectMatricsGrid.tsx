import { ProjectMetricCard } from './ProjectMatricCard'
export function ProjectMatricGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
      <ProjectMetricCard title="Total Projects" value="16" subtitle="of 50 quota" />
      <ProjectMetricCard title="Active Projects" value="12" subtitle="75% of total" />
      <ProjectMetricCard title="Total Notifications" value="32,977" subtitle="98.5% delivery rate" />
      <ProjectMetricCard title="Notifications This Month" value="5,232" subtitle="12% increase" />
    </div>
  )
}
