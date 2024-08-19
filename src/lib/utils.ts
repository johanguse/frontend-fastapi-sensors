import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth/auth'

import { ClassValue, clsx } from 'clsx'
import { getServerSession } from 'next-auth/next'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge.
 * @param inputs - A variadic set of class values to be combined.
 * @returns A string with combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Constructs the full API URL by combining the base API URL from the environment
 * variables with the provided path and query parameters.
 *
 * @param {string} path - The relative path for the API endpoint (e.g. `/users`).
 * @param {Record<string, string>} [params] - An optional object of query parameters.
 * @returns {string} The fully qualified API URL.
 */
export function apiUrl(path: string, params?: Record<string, string>): string {
  let url = `${process.env.APIBASEURL}${process.env.APIPREFIX}${path}`

  if (params) {
    const queryParams = new URLSearchParams(params).toString()
    url += `?${queryParams}`
  }

  return url
}

/**
 * Fetches data from the API with authentication.
 *
 * @param path - The API endpoint path.
 * @param params - Optional query parameters.
 * @returns The fetched data as JSON.
 * @throws Error if not authenticated or if the fetch fails.
 */
export async function getData<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const session = await getServerSession(authOptions)

  if (!session?.user?.tokens?.access) {
    throw new Error('Not authenticated')
  }

  const url = apiUrl(path, params)
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.tokens.access}`,
    },
    credentials: 'include',
    cache: 'no-store',
  })

  if (!res.ok) {
    redirect('/auth-error')
  }

  return res.json()
}

/**
 * Extracts initials from a given name.
 *
 * This function takes a name string and returns the initials based on the following rules:
 * - For a single name, it returns the first letter.
 * - For two or more names, it returns the first letter of the first and last name.
 * - If the name is empty, null, or undefined, it returns "Guest".
 *
 * @param {string | null | undefined} name - The full name to extract initials from.
 * @returns {string} The extracted initials or "Guest" if no valid name is provided.
 *
 * @example
 * getInitials("Johan Guse") // Returns "JG"
 * getInitials("Johan Robertt Guse") // Returns "JG"
 * getInitials("Johan") // Returns "J"
 * getInitials("") // Returns "Guest"
 * getInitials(null) // Returns "Guest"
 * getInitials(undefined) // Returns "Guest"
 */
export function getInitials(name: string | null | undefined): string {
  if (!name || name.trim() === '') return 'Guest'

  const words = name.trim().split(/\s+/)

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

// Number formatter function
export const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat('us', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString()

export const formatters: { [key: string]: any } = {
  currency: (number: number, currency: string = 'USD') =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(number),
  unit: (number: number) => `${usNumberformatter(number)}`,
}

export function formatDate(timestamp?: number): string {
  if (!timestamp) return 'N/A'
  return new Date(timestamp * 1000).toLocaleString()
}
