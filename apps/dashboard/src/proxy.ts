import { withAuthMiddleware } from '@myauth/next'

export default withAuthMiddleware(process.env.NEXT_PUBLIC_CLIENT_ID!)

export const config = {
  matcher: ['/dashboard', '/profile/:path*'],
}
