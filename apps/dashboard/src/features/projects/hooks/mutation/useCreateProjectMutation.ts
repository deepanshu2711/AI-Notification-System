import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ProjectService } from '../../services'

export const useCreateProjectMutation = () => {
  return useMutation({
    mutationFn: ProjectService.createProject,
    onSuccess: () => {
      toast.success('Project created successfully')
    },
    onError: (err) => {
      toast.error('Something went wrong while creating project')
    },
  })
}
