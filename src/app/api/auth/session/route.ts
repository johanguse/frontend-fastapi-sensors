import { NextRequest, NextResponse } from 'next/server'

import { authOptions } from '@/lib/auth/auth'

import { getServerSession } from 'next-auth/next'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    return NextResponse.json(session, { status: 200 })
  } catch (error) {
    console.error('Error getting session:', error)
    return NextResponse.json(
      { error: 'Failed to get session' },
      { status: 500 }
    )
  }
}
