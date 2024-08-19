'use client'

import { useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'

export const dynamic = 'force-dynamic'

export default function SettingsPage() {
  const { data: session, status, update } = useSession()
  const [refreshStatus, setRefreshStatus] = useState<string | null>(null)

  const handleRefreshToken = async () => {
    setRefreshStatus('Refreshing...')
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/auth/refresh_token',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to refresh token')
      }

      await update()
      setRefreshStatus('Token refreshed successfully')
    } catch (error) {
      console.error('Error refreshing token:', error)
      setRefreshStatus('Failed to refresh token')
    }
  }

  if (status === 'loading') {
    return <p className="p-4">Loading...</p>
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <p>Not signed in</p>
        <p>URL: {process.env.NEXT_PUBLIC_URL}</p>
        <button
          onClick={() =>
            signIn('credentials', {
              callbackUrl: process.env.NEXT_PUBLIC_URL + '/dashboard',
            })
          }
        >
          Sign in with Credentials
        </button>
      </>
    )
  }

  return (
    <div className="p-4">
      <h1 className="mb-2 text-2xl font-bold">Settings</h1>
      <div className="flex flex-col gap-1">
        <p>You can view this page because you are signed in.</p>
        <p>Signed in as: {session?.user?.name || 'Unknown User'}</p>
        <p>Username: {session?.user?.username || 'Unknown'}</p>
        <p>
          Access token valid until: {formatDate(session?.validity?.valid_until)}
        </p>
        <p className="mb-6">
          Access token refresh until:{' '}
          {formatDate(session?.validity?.refresh_until)}
        </p>
      </div>
      <div className="mb-8">
        <button onClick={handleRefreshToken} className="text-green-500">
          Refresh Token
        </button>
        {refreshStatus && <p className="text-sm">{refreshStatus}</p>}
      </div>
      <div className="mb-4">
        <button onClick={() => signOut()} className="text-red-500">
          Sign out
        </button>
      </div>
    </div>
  )
}

function formatDate(timestamp?: number): string {
  if (!timestamp) return 'N/A'
  return new Date(timestamp * 1000).toLocaleString()
}
