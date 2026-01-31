'use client'

import { Bell, Braces, Calendar, FileText, Layers, Mail, MessageSquare, Plus, Smartphone, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { useCreateTemplateMutation } from '../hooks/mutation/useCreateTemplateMutation'
import { useGetTemplatesQuery } from '../hooks/query/useGetTemplatesQuery'
import { TemplateVariable } from '../types/template'
import { CreateTemplateModal } from './CreateTemplateModal'

// --- Types ---
interface Template {
  _id: string
  name: string
  channel: 'email' | 'sms' | 'whatsapp' | 'push' | 'multi'
  content: any
  variables: Record<string, TemplateVariable>
  aiGenerated: boolean
  globalUserId: string
  projectId: string
  createdAt: string
  updatedAt: string
}

// --- Helpers ---

// Helper to get distinct styles and icons for channels
const getChannelConfig = (channel: string) => {
  switch (channel) {
    case 'email':
      return {
        color: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
        icon: Mail,
        label: 'Email',
      }
    case 'sms':
      return {
        color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        icon: MessageSquare,
        label: 'SMS',
      }
    case 'whatsapp':
      return {
        color: 'text-lime-400 bg-lime-400/10 border-lime-400/20',
        icon: Smartphone,
        label: 'WhatsApp',
      }
    case 'push':
      return {
        color: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
        icon: Bell,
        label: 'Push',
      }
    case 'multi':
      return {
        color: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
        icon: Layers,
        label: 'Multi-Channel',
      }
    default:
      return {
        color: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
        icon: FileText,
        label: 'Draft',
      }
  }
}

// Helper to extract a preview string from the dynamic content object
const getContentPreview = (content: any): string => {
  if (!content) return 'No content defined...'
  return content.body || content.message || content.title || content.subject || 'No preview available'
}

export function TemplateOverview() {
  const [showModal, setShowModal] = useState(false)
  const { data, isLoading } = useGetTemplatesQuery()
  const createTemplateMutation = useCreateTemplateMutation()

  const handleCreateTemplate = async (templateData: {
    name: string
    channel: string
    content: {
      subject?: string
      body?: string
      message?: string
      title?: string
    }
    variables: Record<string, TemplateVariable>
    projectId: string
  }) => {
    try {
      await createTemplateMutation.mutateAsync(templateData)
      setShowModal(false)
    } catch (error) {
      console.error('Failed to create template:', error)
    }
  }

  return (
    <div className="animate-in fade-in w-full space-y-8 duration-500">
      <CreateTemplateModal open={showModal} onClose={() => setShowModal(false)} onCreate={handleCreateTemplate} />

      {!isLoading && data && data.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((template) => {
            const channelStyle = getChannelConfig(template.channel)
            const ChannelIcon = channelStyle.icon

            return (
              <div
                key={template._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-xl"
              >
                {/* --- Card Header --- */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <h3 className="line-clamp-1 font-semibold text-zinc-100 group-hover:text-white">{template.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className="font-mono opacity-70">ID: {template.projectId.slice(-6)}</span>
                    </div>
                  </div>

                  {/* Channel Badge */}
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${channelStyle.color}`}>
                    <ChannelIcon className="h-4 w-4" />
                  </div>
                </div>

                {/* --- Content Preview --- */}
                <div className="mb-6 flex-1">
                  <div className="rounded-lg border border-white/5 bg-black/20 p-3">
                    <p className="line-clamp-3 font-mono text-xs leading-relaxed text-zinc-400">
                      "{getContentPreview(template.content)}"
                    </p>
                  </div>
                </div>

                {/* --- Card Footer --- */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  {/* Left: Metadata */}
                  <div className="flex items-center gap-3">
                    {/* Variables Count */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500" title="Variables">
                      <Braces className="h-3 w-3" />
                      <span>{Object.keys(template.variables).length}</span>
                    </div>
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Right: AI Badge or Status */}
                  {template.aiGenerated ? (
                    <div className="flex items-center gap-1 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-400 ring-1 ring-indigo-500/20 ring-inset">
                      <Sparkles className="h-3 w-3" />
                      <span>AI Generated</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-zinc-600 uppercase">
                      Manual
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : null}

      {/* --- Empty State --- */}
      {!isLoading && (!data || data.length === 0) && (
        <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/20 py-24 text-center transition-all hover:bg-zinc-900/40">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="relative z-10 mb-6 rounded-2xl bg-zinc-900 p-4 shadow-xl ring-1 ring-white/10">
            <Layers className="h-8 w-8 text-purple-400" />
          </div>

          <h3 className="relative z-10 text-lg font-semibold text-white">No templates created</h3>
          <p className="relative z-10 mt-2 mb-8 max-w-sm text-sm leading-relaxed text-zinc-400">
            Get started by designing your first notification template manually or generate one with AI.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="relative z-10 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4" />
            Create Template
          </button>
        </div>
      )}
    </div>
  )
}
