import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ProjectService } from '../../services'

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ProjectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      })
      toast.success('Project created successfully')
    },
    onError: (err) => {
      toast.error('Something went wrong while creating project')
    },
  })
}
