import { Toaster } from 'sonner'
import { TanstackQueryProvider } from './TanstackQueryProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanstackQueryProvider>
      <Toaster />
      {children}
    </TanstackQueryProvider>
  )
}
