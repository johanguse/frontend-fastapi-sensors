'use client'

import React from 'react'

import ThemeChanger from '@/components/theme-change'

import { signIn, signOut, useSession } from 'next-auth/react'

const AppBar = () => {
  const { data: session } = useSession()

  return (
    <div className="flex gap-5 bg-gray-100 p-2">
      <div className="ml-auto flex gap-2">
        <div>
          <ThemeChanger />
        </div>
        {session?.user ? (
          <>
            <p className="text-sky-600"> {session.user.username}</p>
            <button className="text-red-500" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="text-green-600" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  )
}

export default AppBar
