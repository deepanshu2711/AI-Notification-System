import { useMutation } from '@tanstack/react-query'
import { ApiService } from '../../service'

export const useGenerateApiKeyMutation = () => {
  return useMutation({
    mutationFn: ApiService.generateApiKey,
  })
}
