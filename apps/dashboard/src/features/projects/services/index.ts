import api from '@/lib/api'

export const ProjectService = {
  getProjects: async () => {
    const response = await api.get('/management/projects')
    return response.data.data
  },

  createProject: async (data: { name: string; description: string }) => {
    const response = await api.post('/management/projects', data)
    return response.data
  },
}
