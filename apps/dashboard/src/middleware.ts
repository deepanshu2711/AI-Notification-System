import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')
  if (!refreshToken) {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!
    const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_AI_NOTIFICATION_DASHBOARD}/callback`)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_AUTH}/login?clientId=${clientId}&redirect_uri=${redirectUri}`,
    )
  }
  try {
    const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/auth/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken.value}`,
      },
      credentials: 'include',
    })

    if (!verifyResponse.ok) {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!
      const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_AI_NOTIFICATION_DASHBOARD}/callback`)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_AUTH}/login?clientId=${clientId}&redirect_uri=${redirectUri}`,
      )
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Verification failed:', error)
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!
    const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_AI_NOTIFICATION_DASHBOARD}/callback`)
    return NextResponse.redirect(`http://localhost:3001/login?clientId=${clientId}&redirect_uri=${redirectUri}`)
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
