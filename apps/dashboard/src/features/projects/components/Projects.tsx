import { LayoutGrid, Plus } from 'lucide-react' // Assuming Lucide icons
import { ProjectMatricGrid } from './ProjectMatricsGrid'
import { ProjectsOverview } from './ProjectsOverview'

export default function Projects() {
  return (
    <div className="min-h-screen rounded-xl bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
      <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="mb-2 flex items-center gap-2 text-indigo-400">
              <LayoutGrid className="h-4 w-4" />
              <span className="text-xs font-semibold tracking-wide uppercase">Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Projects</h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Manage your notification campaigns. Monitor delivery rates, track active templates, and analyze system
              health.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] active:scale-95">
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium tracking-wide text-zinc-400">System Health & Overview</h3>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-1 backdrop-blur-sm">
            <ProjectMatricGrid />
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium tracking-wide text-zinc-400">Active Campaigns</h3>
          </div>

          <div className="relative">
            <ProjectsOverview />
          </div>
        </section>
      </div>
    </div>
  )
}
