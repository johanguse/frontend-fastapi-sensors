import { NextRequest, NextResponse } from 'next/server'

import { authOptions } from '@/lib/auth/auth'
import { apiUrl } from '@/lib/utils'

import { getServerSession } from 'next-auth/next'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'You must be signed in to access this endpoint.' },
      { status: 401 }
    )
  }

  try {
    const accessToken = session.user.tokens.access
    const response = await fetch(
      apiUrl('/companies', { page: '1', size: '10' }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch companies')
    }

    const companies = await response.json()
    return NextResponse.json(companies)
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching companies' },
      { status: 500 }
    )
  }
}
