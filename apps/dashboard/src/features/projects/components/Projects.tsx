import { ProjectMatricGrid } from './ProjectMatricsGrid' // Keeping your import name
import { ProjectsOverview } from './ProjectsOverview'

export default function Projects() {
  return (
    // Replaced <Container> with standard Tailwind wrapper for predictability
    <div className="min-h-screen text-zinc-100 selection:bg-white/20">
      <div className="mx-auto max-w-7xl space-y-12 px-6">
        {/* --- Page Header --- */}
        <div className="flex flex-col gap-2 border-zinc-800">
          <div className="flex items-center gap-3">
            {/* Optional: Breadcrumb or Icon could go here */}
            <h1 className="text-3xl font-semibold tracking-tight text-white">Projects</h1>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
            Create and manage your notification projects. Monitor delivery rates, active templates, and overall system
            health in real-time.
          </p>
        </div>

        {/* --- Key Metrics Section --- */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">System Health</h3>
          <ProjectMatricGrid />
        </div>

        {/* --- Main Content (Projects List) --- */}
        <div className="space-y-4">
          {/* Note: ProjectsOverview likely has its own 'Create' button header */}
          <ProjectsOverview />
        </div>
      </div>
    </div>
  )
}
