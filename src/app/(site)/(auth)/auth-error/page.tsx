'use client'

import type { PageParams } from '@/types/next'

import { getError } from './auth-error-mapping'
import { signIn } from 'next-auth/react'

export default function AuthErrorPage(props: PageParams<{}>) {
  const { errorMessage, error } = getError(props.searchParams.error)

  return (
    <div className="size-screen container flex flex-col items-center justify-center">
      <div className="mt-4 flex flex-col items-center gap-4">
        <div>
          <h1 className="mb-8 text-3xl">Oops! Something went wrong</h1>
          <h2>{error}</h2>
          <p>{errorMessage}</p>
        </div>
        <div className="flex items-center gap-2 text-center">
          <button
            onClick={() =>
              signIn('credentials', {
                callbackUrl: process.env.NEXT_PUBLIC_URL + '/dashboard',
              })
            }
            className="text-indigo-600 dark:text-indigo-400"
          >
            Sign in again
          </button>
        </div>
      </div>
    </div>
  )
}
