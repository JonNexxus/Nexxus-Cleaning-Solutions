'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test the connection by trying to get the current session
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          throw error
        }

        // If we get here, the connection is working
        setConnectionStatus('connected')
      } catch (err) {
        console.error('Supabase connection error:', err)
        setConnectionStatus('error')
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Supabase Connection Test
          </h1>
          
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Status:</span>
              <div className="mt-1">
                {connectionStatus === 'testing' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Testing...
                  </span>
                )}
                {connectionStatus === 'connected' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✅ Connected
                  </span>
                )}
                {connectionStatus === 'error' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    ❌ Error
                  </span>
                )}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">Supabase URL:</span>
              <p className="mt-1 text-sm text-gray-900 font-mono break-all">
                {process.env.NEXT_PUBLIC_SUPABASE_URL}
              </p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">API Key (first 20 chars):</span>
              <p className="mt-1 text-sm text-gray-900 font-mono">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...
              </p>
            </div>

            {error && (
              <div>
                <span className="text-sm font-medium text-red-500">Error Details:</span>
                <p className="mt-1 text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </p>
              </div>
            )}

            <div className="pt-4">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
