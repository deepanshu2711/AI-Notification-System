import { Download, LayoutDashboard, RefreshCw } from 'lucide-react'
import { ChartsSection } from './ChartsSection'
import { MetricsGrid } from './MetricGrid'
import { NotificationFeed } from './NotificationFeed'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
        <div className="absolute top-[10%] right-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="mb-2 flex items-center gap-2 text-cyan-400">
              <LayoutDashboard className="h-4 w-4" />
              <span className="text-xs font-semibold tracking-wide uppercase">Overview</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Dashboard</h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Real-time monitoring of your notification infrastructure. Track delivery performance, system load, and
              recent activity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="flex items-center justify-center rounded-lg border border-white/5 bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              title="Refresh Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium tracking-wide text-zinc-400">Key Performance Indicators</h3>
          </div>
          <div className="relative">
            <MetricsGrid />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium tracking-wide text-zinc-400">Delivery Analytics</h3>
            </div>
            <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <ChartsSection />
            </div>
          </div>

          {/* Right Column: Activity Feed (Takes up 1/3 width) */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium tracking-wide text-zinc-400">Live Activity</h3>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-emerald-400 uppercase">Live</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm">
              <NotificationFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
