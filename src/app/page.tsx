'use client'

import { signIn } from 'next-auth/react'

export default function Page() {
  return (
    <main className="flex justify-center p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Welcome to Sensor Data Dashboard</h1>
        <p className="text-lg">Please sign in to continue</p>
        <button
          className="only-button mt-4"
          onClick={() =>
            signIn('credentials', { callbackUrl: '/dashboard/overview' })
          }
        >
          Sign in
        </button>
      </div>
    </main>
  )
}
