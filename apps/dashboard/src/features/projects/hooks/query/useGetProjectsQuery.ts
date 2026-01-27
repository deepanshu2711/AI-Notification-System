import { Project } from '@repo/types'
import { useQuery } from '@tanstack/react-query'
import { ProjectService } from '../../services'

export const useGetProjectsQuery = () => {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: ProjectService.getProjects,
  })
}
