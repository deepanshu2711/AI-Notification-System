import api from '@/lib/api'
import { LogsResponse } from '../types/log'

export const LogService = {
  getLogs: async (page: number = 1, limit: number = 20): Promise<LogsResponse> => {
    const response = await api.get('/notification/messages', {
      params: { page, limit },
    })
    return response.data.data
  },
}
