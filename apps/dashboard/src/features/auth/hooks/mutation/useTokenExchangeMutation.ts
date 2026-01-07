import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AuthService } from '../../services'

export const useTokenExchangeMutation = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: AuthService.exchangeToken,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken)
      router.push('/')
    },
  })
}
