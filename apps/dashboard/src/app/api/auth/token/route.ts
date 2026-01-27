import { createAuthCallbackHandler } from '@myauth/next'

export const POST = createAuthCallbackHandler({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
})
