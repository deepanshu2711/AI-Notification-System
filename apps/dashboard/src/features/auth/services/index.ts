import axios from 'axios'

export const AuthService = {
  exchangeToken: async (data: { clientId: string; code: string }) => {
    const response = await axios.post('/api/v1/auth/token', data)
    return response.data
  },
}
