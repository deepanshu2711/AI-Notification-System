import { TemplateMetricCard } from './TemplateMatricCard'

export function TemplateMatricGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
      <TemplateMetricCard title="Total Templates" value="24" subtitle="of 100 quota" />
      <TemplateMetricCard title="Active Templates" value="18" subtitle="75% of total" />
      <TemplateMetricCard title="Total Uses" value="8,452" subtitle="99.2% success rate" />
      <TemplateMetricCard title="Uses This Month" value="1,247" subtitle="23% increase" />
    </div>
  )
}
