import { useMutation } from '@tanstack/react-query'
import { ProjectService } from '../../services'

export const useCreateProjectMutation = () => {
  return useMutation({
    mutationFn: ProjectService.createProject,
  })
}
