'use client'

import { signIn } from 'next-auth/react'

export default function Page() {
  return (
    <main className="flex justify-center p-4">
      <div className="flex flex-col items-center">
        <h1 className="mb-2 text-3xl font-bold">
          Welcome to Sensor Data Dashboard
        </h1>
        <div className="mb-8">
          <p className="mb-6">
            Current we have three users on database, choose one of them to
            login. <br />
            The credentials are posted on{' '}
            <a
              href="https://github.com/johanguse/frontend-fastapi-sensors"
              className="text-blue-500 underline"
              target="_blank"
            >
              github repository
            </a>
          </p>
        </div>
        <p className="text-lg">Please sign in bellow to continue</p>
        <button
          className="only-button mt-4 rounded-md bg-slate-200 p-4 dark:bg-slate-800"
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
