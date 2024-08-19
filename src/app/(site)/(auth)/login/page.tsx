'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { signIn } from 'next-auth/react'

interface FormValues {
  email: string
  password: string
}

export default function SignInPage() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: formValues.email,
        password: formValues.password,
      })

      if (result?.error) {
        setError('Invalid email or password. Please try again.')
      } else {
        router.push('/dashboard/overview')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.')
      console.error('An unexpected error occurred:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="flex h-screen items-center justify-center dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 dark:text-white">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-100">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block font-medium dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleFormChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1 block font-medium dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleFormChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300 dark:focus:ring-offset-gray-900"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-2 size-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
