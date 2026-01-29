import api from '@/lib/api'

export interface Project {
  _id: string
  name: string
  description?: string
  globalUserId: string
  createdAt: string
  updatedAt: string
}

export const ProjectService = {
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get('/management/projects')
    return response.data.data
  },

  createProject: async (data: { name: string; description: string }) => {
    const response = await api.post('/management/projects', data)
    return response.data
  },
}
