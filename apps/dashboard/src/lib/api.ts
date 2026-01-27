import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY || 'http://localhost:5001/api/v1',
  withCredentials: true,
})

export default api
