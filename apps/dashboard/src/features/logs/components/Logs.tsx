'use client'

import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Smartphone,
  XCircle,
} from 'lucide-react'

import { useGetLogsQuery } from '../hooks/query/useGetLogsQuery'
import { Log } from '../types/log'

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'delivered':
      return {
        color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        icon: CheckCircle2,
        label: 'Delivered',
      }
    case 'sent':
      return {
        color: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
        icon: CheckCircle2,
        label: 'Sent',
      }
    case 'failed':
      return {
        color: 'text-red-400 bg-red-400/10 border-red-400/20',
        icon: XCircle,
        label: 'Failed',
      }
    case 'queued':
      return {
        color: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
        icon: Clock,
        label: 'Queued',
      }
    case 'processing':
      return {
        color: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
        icon: Loader2,
        label: 'Processing',
      }
    default:
      return {
        color: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
        icon: AlertCircle,
        label: 'Unknown',
      }
  }
}

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'email':
      return Mail
    case 'sms':
      return MessageSquare
    case 'whatsapp':
      return Smartphone
    case 'push':
      return Bell
    default:
      return FileText
  }
}

function LogsTable({ logs }: { logs: Log[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">
            <th className="py-4 pl-4">Status</th>
            <th className="py-4">Channels</th>
            <th className="py-4">Priority</th>
            <th className="py-4">Project</th>
            <th className="py-4">Date</th>
            <th className="py-4 pr-4">Message ID</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {logs.map((log) => {
            const statusConfig = getStatusConfig(log.latestStatus || 'unknown')
            const StatusIcon = statusConfig.icon

            return (
              <tr key={log._id} className="group transition-colors hover:bg-white/[0.02]">
                <td className="py-4 pl-4">
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusConfig.color}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    <span>{statusConfig.label}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-1">
                    {log.to.map((channel, idx) => {
                      const ChannelIcon = getChannelIcon(channel.channel)
                      return (
                        <div
                          key={idx}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400"
                          title={channel.channel}
                        >
                          <ChannelIcon className="h-4 w-4" />
                        </div>
                      )
                    })}
                  </div>
                </td>
                <td className="py-4">
                  <span
                    className={`text-xs font-medium ${
                      log.priority === 'high'
                        ? 'text-red-400'
                        : log.priority === 'medium'
                          ? 'text-amber-400'
                          : 'text-zinc-500'
                    }`}
                  >
                    {log.priority || 'normal'}
                  </span>
                </td>
                <td className="py-4">
                  <span className="font-mono text-xs text-zinc-400">{log.projectId?.slice(-8) || 'N/A'}</span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(log.createdAt).toLocaleString()}</span>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="font-mono text-xs text-zinc-600">{log._id.slice(-12)}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function Logs() {
  const [page, setPage] = React.useState(1)
  const { data, isLoading } = useGetLogsQuery(page, 10)

  const logs = data?.messages || []
  const pagination = data?.pagination

  return (
    <div className="min-h-screen rounded-xl bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="mb-2 flex items-center gap-2 text-indigo-400">
              <FileText className="h-4 w-4" />
              <span className="text-xs font-semibold tracking-wide uppercase">Monitor</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Logs</h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Track and monitor all your notification deliveries.
            </p>
          </div>
        </div>

        <section className="space-y-5">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
              </div>
            ) : logs.length > 0 ? (
              <>
                <LogsTable logs={logs} />

                {pagination && pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-white/5 px-6 py-4">
                    <div className="text-xs text-zinc-500">
                      Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                      {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={pagination.page <= 1}
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-zinc-400">
                        Page {pagination.page} of {pagination.totalPages}
                      </span>
                      <button
                        onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                        disabled={pagination.page >= pagination.totalPages}
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 rounded-2xl bg-zinc-900 p-4 ring-1 ring-white/10">
                  <FileText className="h-8 w-8 text-zinc-600" />
                </div>
                <h3 className="text-lg font-semibold text-white">No logs yet</h3>
                <p className="mt-2 max-w-sm text-sm text-zinc-400">Send your first notification to see logs here.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

import React from 'react'
