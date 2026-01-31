import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-zinc-900/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wide text-zinc-400 uppercase">{title}</h3>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20 transition-colors group-hover:bg-cyan-500/20 group-hover:text-cyan-300">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
      </div>

      {/* Footer / Trend */}
      {subtitle && (
        <div className="mt-3 flex items-center text-xs">
          <span
            className={`font-medium ${trend === 'up' ? 'text-emerald-400' : ''} ${trend === 'down' ? 'text-rose-400' : ''} ${!trend || trend === 'neutral' ? 'text-zinc-500' : ''} `}
          >
            {subtitle}
          </span>
        </div>
      )}

      {/* Decorative Hover Gradient (Cyan for Dashboard) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}
