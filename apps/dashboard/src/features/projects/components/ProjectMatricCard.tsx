import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon // Optional: Allows you to pass an icon component
  trend?: 'up' | 'down' | 'neutral' // Optional: specific coloring for trends
}

export function ProjectMetricCard({ title, value, subtitle, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/80">
      {/* Header: Title & Optional Icon */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wide text-zinc-400">{title}</h3>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-500 transition-colors group-hover:text-zinc-300">
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
          {/* Conditional coloring if 'trend' prop is used, otherwise generic gray */}
          <p
            className={` ${trend === 'up' ? 'text-emerald-400' : ''} ${trend === 'down' ? 'text-rose-400' : ''} ${!trend ? 'text-zinc-500' : ''} `}
          >
            {subtitle}
          </p>
        </div>
      )}

      {/* Optional: subtle gradient glow on hover for premium feel */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}
