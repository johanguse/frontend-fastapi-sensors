'use client'

import { focusRing } from '@/lib/inputsUtils'
import { cn, getInitials } from '@/lib/utils'

import { Button } from '@/components/Button'

import { DropdownUserProfile } from './DropdownUserProfile'
import { RiMore2Fill } from '@remixicon/react'
import { useSession } from 'next-auth/react'

export const UserProfileDesktop = () => {
  const { data: session } = useSession()
  const userInitials = getInitials(session?.user?.name)

  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cn(
          focusRing,
          'group flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10 dark:data-[state=open]:bg-gray-100'
        )}
      >
        <span className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
            aria-hidden="true"
          >
            {userInitials}
          </span>
          <span>{session?.user?.name}</span>
        </span>
        <RiMore2Fill
          className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  )
}

export const UserProfileMobile = () => {
  return (
    <DropdownUserProfile align="end">
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cn(
          'group flex items-center rounded-md p-1 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10 dark:data-[state=open]:bg-gray-100'
        )}
      >
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
          aria-hidden="true"
        >
          ES
        </span>
      </Button>
    </DropdownUserProfile>
  )
}
