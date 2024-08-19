import { NextRequest, NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', encodeURIComponent(req.url))
      return NextResponse.redirect(loginUrl)
    }

    const expiration = token.exp
    if (typeof expiration === 'number' && Date.now() / 1000 > expiration) {
      const refreshUrl = new URL(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/refresh_token`,
        req.url
      )
      refreshUrl.searchParams.set('callbackUrl', encodeURIComponent(req.url))
      return NextResponse.redirect(refreshUrl)
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
