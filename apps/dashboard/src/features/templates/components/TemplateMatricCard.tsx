import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
}

export function TemplateMetricCard({ title, value, subtitle, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/80">
      {/* Header: Title & Optional Icon */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wide text-zinc-400">{title}</h3>
        {Icon && (
          // Hover effect: changed to purple-ish to distinguish 'Templates' from 'Projects'
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-500 transition-colors group-hover:bg-purple-500/10 group-hover:text-purple-300">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Body: Value */}
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-light tracking-tight text-zinc-100">{value}</span>
      </div>

      {/* Footer: Subtitle / Trend */}
      {subtitle && (
        <div className="mt-2 flex items-center text-xs">
          <p
            className={` ${trend === 'up' ? 'text-emerald-400' : ''} ${trend === 'down' ? 'text-rose-400' : ''} ${!trend ? 'text-zinc-500' : ''} `}
          >
            {subtitle}
          </p>
        </div>
      )}

      {/* Hover Gradient: Subtle Purple tint for Templates context */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}
