'use client'

import { useState } from 'react'

import { useSession } from 'next-auth/react'

export default function UploadPage() {
  const { data: session, status } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    setIsUploading(true)
    setError(null)
    setSuccessMessage(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      if (session?.user.tokens.access) {
        const response = await fetch(
          'http://127.0.0.1:8000/api/v1/upload-csv/',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${session?.user.tokens.access}`,
            },
            body: formData,
          }
        )

        if (response.ok) {
          setSuccessMessage('File uploaded successfully!')
        } else {
          setError('Failed to upload the file.')
        }
      } else {
        setError('No access token available. Please sign in again.')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      setError('An error occurred while uploading the file.')
    } finally {
      setIsUploading(false)
    }
  }

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>
  }

  return (
    <div className="p-4">
      <h1 className="mb-2 text-2xl font-bold">Add Data</h1>
      <p className="mb-4">Upload a CSV file to add data to your Equipment.</p>
      <p className="mb-2">
        We expect the CSV file to have the following format:
      </p>
      <div className="mb-8 overflow-x-auto">
        <table className="bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border-b px-4 py-2 text-left">Equipment ID</th>
              <th className="border-b px-4 py-2 text-left">Timestamp</th>
              <th className="border-b px-4 py-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b px-4 py-2">EQ-12495</td>
              <td className="border-b px-4 py-2">
                2023-02-12T01:30:00.000-05:00
              </td>
              <td className="border-b px-4 py-2">78.8</td>
            </tr>
            <tr>
              <td className="border-b px-4 py-2">EQ-12492</td>
              <td className="border-b px-4 py-2">
                2023-01-12T01:30:00.000-05:00
              </td>
              <td className="border-b px-4 py-2">8.8</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-1">
        <h2>Upload your file here</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4 rounded border border-gray-300 p-2"
        />
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
        )}
        <button
          onClick={handleUpload}
          className={`rounded bg-blue-500 p-2 text-white ${isUploading ? 'opacity-50' : ''}`}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  )
}
