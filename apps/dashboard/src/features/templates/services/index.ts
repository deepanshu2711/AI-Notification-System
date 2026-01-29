import api from '@/lib/api'
import { CreateTemplateData, Template } from '../types/template'

export const TemplateService = {
  getTemplate: async (): Promise<Template[]> => {
    const response = await api.get('/template')
    return response.data.data
  },
  createTemplate: async (templateData: CreateTemplateData) => {
    const response = await api.post('/template', templateData)
    return response.data.data
  },
}
