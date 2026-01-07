'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useTokenExchangeMutation } from '../hooks/mutation/useTokenExchangeMutation'

const Callback = () => {
  const searchParams = useSearchParams()
  const { mutate: exchangeToken, isPending } = useTokenExchangeMutation()

  useEffect(() => {
    const code = searchParams.get('code')
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID

    if (!code || !clientId || isPending) return

    exchangeToken({ code, clientId })
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-700">Authenticating...</p>
      <p className="mt-2 text-sm text-gray-500">Please wait while we complete your sign-in</p>
    </div>
  )
}

export default Callback
