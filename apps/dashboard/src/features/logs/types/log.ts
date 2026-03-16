export interface Log {
  _id: string
  globalUserId: string
  priority: string
  to: Array<{
    channel: string
    destination: string
    metadata?: Record<string, any>
  }>
  projectId: string
  createdAt: string
  latestStatus: string
}

export interface LogsResponse {
  messages: Log[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
