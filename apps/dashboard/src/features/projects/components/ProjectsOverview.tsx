'use client'

import { Activity, BarChart3, FolderOpen, Plus, Send } from 'lucide-react' // Assuming you have lucide-react or similar icons
import { useState } from 'react'

import { Button } from '@/components/elements/button'
import { useCreateProjectMutation } from '../hooks/mutation/useCreateProjectMutation'
import { useGetProjectsQuery } from '../hooks/query/useGetProjectsQuery'
import { CreateProjectModal } from './CreateProjectModal'

// Utility to merge classes if you use tailwind-merge (optional but recommended)
// import { cn } from '@/lib/utils'

export function ProjectsOverview() {
  const [showModal, setShowModal] = useState(false)
  const { data, isLoading } = useGetProjectsQuery()
  const { mutate: createProject } = useCreateProjectMutation()

  const handleCreateProject = (name: string, description: string) => {
    createProject({ name, description })
  }

  return (
    <div className="animate-in fade-in w-full space-y-8 duration-500">
      {/* --- Header Section --- */}
      <div className="flex flex-col justify-end gap-4 pb-6 sm:flex-row sm:items-center">
        <Button onClick={() => setShowModal(true)} size="md">
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </div>

      <CreateProjectModal open={showModal} onClose={() => setShowModal(false)} onCreate={handleCreateProject} />

      {!isLoading && data && data.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.map((project, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-lg hover:shadow-black/20"
            >
              {/* Card Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition-colors group-hover:text-white">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-200 transition-colors group-hover:text-white">
                      {project.name}
                    </h3>
                    {/* <p className="mt-0.5 font-mono text-xs text-zinc-500">ID: {project.id?.slice(0, 8) || '---'}</p> */}
                  </div>
                </div>

                {/* Active Status Pill */}
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-medium tracking-wider text-emerald-500 uppercase">Active</span>
                </div>
              </div>

              {/* Card Metrics Grid */}
              <div className="mt-2 grid grid-cols-2 gap-4 border-t border-zinc-800/50 pt-4">
                {/* Metric 1 */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Send className="h-3 w-3" />
                    <span>Sent</span>
                  </div>
                  <div className="text-lg font-light text-zinc-200">{1238}</div>
                </div>

                {/* Metric 2 */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Activity className="h-3 w-3" />
                    <span>Success Rate</span>
                  </div>
                  <div className={`text-lg font-light ${98 > 90 ? 'text-zinc-200' : 'text-red-400'}`}>{98}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* --- Empty State --- */}
      {!isLoading && (!data || data.length === 0) && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 py-20 text-center">
          <div className="mb-4 rounded-full bg-zinc-900 p-4">
            <BarChart3 className="h-8 w-8 text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium text-white">No projects found</h3>
          <p className="mt-2 mb-6 max-w-sm text-sm text-zinc-500">
            You haven't created any projects yet. Start by creating a new project to manage your notifications.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white"
          >
            <Plus className="h-4 w-4" />
            Create First Project
          </button>
        </div>
      )}
    </div>
  )
}
