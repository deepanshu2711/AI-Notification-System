import { ArrowRight, CheckCircle2, Clock, Mail, MessageSquare, MoreHorizontal, XCircle } from 'lucide-react'

// --- Types ---
interface Notification {
  _id: string
  projectId: string
  globalUserId: string
  priority: 'high' | 'medium' | 'low'
  to: {
    channel: string
    destination: string
  }[]
  createdAt: string
  latestStatus: string
}

// --- Dummy Data ---
const dummyData: Notification[] = [
  {
    _id: '695619f4cd3c67ca9f487c1sdsf',
    projectId: 'Proj-Gamma',
    globalUserId: '12313',
    priority: 'low',
    to: [{ channel: 'whatsapp', destination: '+44 7700 900077' }],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    latestStatus: 'delivered',
  },
  {
    _id: '695619b0cd3c67ca9f487c1sd7',
    projectId: 'Proj-Alpha',
    globalUserId: '12313',
    priority: 'medium',
    to: [{ channel: 'email', destination: 'billing@client.com' }],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    latestStatus: 'delivered',
  },
  {
    _id: '695619f4cd3c67ca9f487c1dsdf',
    projectId: 'Proj-Gamma',
    globalUserId: '12313',
    priority: 'low',
    to: [{ channel: 'whatsapp', destination: '+44 7700 900077' }],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    latestStatus: 'delivered',
  },
  {
    _id: '6945619b0cd3c67ca9f487c17',
    projectId: 'Proj-Alpha',
    globalUserId: '12313',
    priority: 'medium',
    to: [{ channel: 'email', destination: 'billing@client.com' }],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    latestStatus: 'delivered',
  },
  {
    _id: '69561b73f6b823c86dcc1bd1',
    projectId: 'Proj-Alpha',
    globalUserId: '12313',
    priority: 'high',
    to: [{ channel: 'email', destination: 'alex.dev@example.com' }],
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 mins ago
    latestStatus: 'delivered',
  },
]

// --- Helpers ---
function timeAgo(dateString: string) {
  const now = new Date()
  const past = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  return `${Math.floor(diffInSeconds / 86400)}d ago`
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'delivered':
      return { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' }
    case 'failed':
      return { icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20' }
    case 'queued':
      return { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' }
    default:
      return { icon: MoreHorizontal, color: 'text-zinc-400', bg: 'bg-zinc-400/10 border-zinc-400/20' }
  }
}

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'email':
      return <Mail className="h-3.5 w-3.5" />
    case 'sms':
      return <MessageSquare className="h-3.5 w-3.5" />
    default:
      return <Mail className="h-3.5 w-3.5" />
  }
}

// --- Component ---
export function NotificationFeed() {
  return (
    <div className="flex h-full flex-col">
      {/* Scrollable Feed Area */}
      <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {dummyData.map((notification) => {
            const statusStyle = getStatusConfig(notification.latestStatus)
            const StatusIcon = statusStyle.icon
            const channel = notification.to[0]?.channel || 'email'

            return (
              <div
                key={notification._id}
                className="group relative flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-white/5"
              >
                {/* Left: Status Icon (Visual Anchor) */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${statusStyle.bg} ${statusStyle.color}`}
                >
                  <StatusIcon className="h-4 w-4" />
                </div>

                {/* Middle: Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center justify-between">
                    <p className="truncate text-xs font-medium text-zinc-400">{notification.projectId}</p>
                    <span className="text-[10px] text-zinc-500 tabular-nums">{timeAgo(notification.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`flex items-center justify-center text-zinc-500`}>{getChannelIcon(channel)}</span>
                    <p className="truncate font-mono text-sm text-zinc-200">{notification.to[0]?.destination}</p>
                  </div>
                </div>

                {/* Right: Hover Action / Priority Indicator */}
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {/* Priority Dot */}
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      notification.priority === 'high'
                        ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                        : notification.priority === 'medium'
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                    }`}
                    title={`${notification.priority} priority`}
                  />

                  {/* Ghost arrow only visible on hover */}
                  <ArrowRight className="h-4 w-4 -translate-x-2 text-zinc-500 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer / View All Action */}
      <div className="border-t border-white/5 p-4">
        <button className="group flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 py-2 text-xs font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white active:scale-95">
          <span>View Full Log</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}
