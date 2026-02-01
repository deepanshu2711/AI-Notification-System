import api from '@/lib/api'

export const ApiService = {
  generateApiKey: async () => {
    const response = await api.post('/auth/generate-api-key')
    return response.data.data
  },
  getApiKey: async () => {
    const response = await api.get('/auth/api-key')
    return response.data.data
  },
}
