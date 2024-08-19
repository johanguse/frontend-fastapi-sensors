'use client'

import * as React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from '@/components/Dropdown'

import { RiComputerLine, RiMoonLine, RiSunLine } from '@remixicon/react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'

export type DropdownUserProfileProps = {
  children: React.ReactNode
  align?: 'center' | 'start' | 'end'
}

export function DropdownUserProfile({
  children,
  align = 'start',
}: DropdownUserProfileProps) {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuLabel>{session?.user?.username}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSubMenu>
            <DropdownMenuSubMenuTrigger>Theme</DropdownMenuSubMenuTrigger>
            <DropdownMenuSubMenuContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => {
                  setTheme(value)
                }}
              >
                <DropdownMenuRadioItem
                  aria-label="Switch to Light Mode"
                  value="light"
                  iconType="check"
                >
                  <RiSunLine className="size-4 shrink-0" aria-hidden="true" />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  aria-label="Switch to Dark Mode"
                  value="dark"
                  iconType="check"
                >
                  <RiMoonLine className="size-4 shrink-0" aria-hidden="true" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  aria-label="Switch to System Mode"
                  value="system"
                  iconType="check"
                >
                  <RiComputerLine
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubMenuContent>
          </DropdownMenuSubMenu>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <button onClick={() => signOut()} className="text-red-500">
              Sign out
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
