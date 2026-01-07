import { Callback } from '@/features/auth'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense>
      <Callback />
    </Suspense>
  )
}
