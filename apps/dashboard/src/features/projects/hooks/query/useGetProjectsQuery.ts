import { useQuery } from '@tanstack/react-query'
import { Project, ProjectService } from '../../services'

export const useGetProjectsQuery = () => {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: ProjectService.getProjects,
  })
}
