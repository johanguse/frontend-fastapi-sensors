import { ClassValue, clsx } from 'clsx'
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
 * Fetches JSON data from a given URL and handles errors.
 * @param input - The URL to fetch data from.
 * @param init - Additional options for the fetch request.
 * @returns A promise that resolves with the fetched JSON data.
 */
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const contentType = res.headers.get('Content-Type')
    if (contentType?.includes('application/json')) {
      try {
        const json = await res.json()
        if (json.error) {
          const error = new Error(json.error) as Error & {
            status: number
          }
          error.status = res.status
          throw error
        } else {
          throw new Error('An unexpected error occurred')
        }
      } catch (error) {
        if (error instanceof Error) {
          throw error
        } else {
          throw new Error('An unexpected error occurred')
        }
      }
    } else {
      try {
        const text = await res.text()
        throw new Error(`Unexpected response: ${text}`)
      } catch (error) {
        if (error instanceof Error) {
          throw error
        } else {
          throw new Error('An unexpected error occurred')
        }
      }
    }
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

export const focusInput = [
  // base
  'focus:ring-2',
  // ring color
  'focus:ring-indigo-200 focus:dark:ring-indigo-700/30',
  // border color
  'focus:border-indigo-500 focus:dark:border-indigo-700',
]

export const focusRing = [
  // base
  'outline outline-offset-2 outline-0 focus-visible:outline-2',
  // outline color
  'outline-indigo-500 dark:outline-indigo-500',
]

export const hasErrorInput = [
  // base
  'ring-2',
  // border color
  'border-red-500 dark:border-red-700',
  // ring color
  'ring-red-200 dark:ring-red-700/30',
]

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
