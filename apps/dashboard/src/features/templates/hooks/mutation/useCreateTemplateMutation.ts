import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TemplateService } from '../../services'

export const useCreateTemplateMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: TemplateService.createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    }
  })
}