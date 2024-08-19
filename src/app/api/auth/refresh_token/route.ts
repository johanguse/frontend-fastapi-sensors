import { NextRequest, NextResponse } from 'next/server'

import { apiUrl } from '@/lib/utils'

import { getToken } from 'next-auth/jwt'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const refreshToken = token.data?.tokens?.refresh

    if (!refreshToken) {
      console.error('No refresh token found in token object')
      return NextResponse.json(
        { error: 'No refresh token available' },
        { status: 400 }
      )
    }

    const response = await fetch(apiUrl('/refresh_token'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.data.tokens.access}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Failed to refresh token')
    }

    const newTokens = await response.json()

    return NextResponse.json(
      {
        message: 'Token refreshed successfully',
        newTokens,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error refreshing token:', error)
    return NextResponse.json(
      { error: 'An error occurred while refreshing the token' },
      { status: 500 }
    )
  }
}
