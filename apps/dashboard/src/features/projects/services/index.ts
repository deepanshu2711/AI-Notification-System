import api from '@/lib/api'

export const ProjectService = {
  getProjects: async () => {
    const response = await api.get('/management/projects')
    return response.data
  },
}
