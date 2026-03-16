import { useQuery } from '@tanstack/react-query'
import { LogService } from '../../services'

export const useGetLogsQuery = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['logs', page, limit],
    queryFn: () => LogService.getLogs(page, limit),
  })
}
