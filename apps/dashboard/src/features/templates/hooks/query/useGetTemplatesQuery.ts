import { Template } from '@repo/types'
import { useQuery } from '@tanstack/react-query'
import { TemplateService } from '../../services'

export const useGetTemplatesQuery = () => {
  return useQuery<Template[]>({
    queryKey: ['templates'],
    queryFn: TemplateService.getTemplate,
  })
}
