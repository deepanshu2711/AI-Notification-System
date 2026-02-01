import { useQuery } from '@tanstack/react-query'
import { ApiService } from '../../service'

export const useGetApiKeyQuery = () => {
  return useQuery({
    queryKey: ['api-key'],
    queryFn: ApiService.getApiKey,
  })
}
