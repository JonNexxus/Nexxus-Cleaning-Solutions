'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">ProjectX Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user.user_metadata?.full_name || user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🎉 Welcome to your Dashboard!
              </h2>
              <p className="text-gray-600 mb-6">
                You&apos;ve successfully signed in to ProjectX. This is your protected dashboard area.
              </p>
              
              {/* User Info Card */}
              <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Account</h3>
                <div className="space-y-2 text-left">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Email:</span>
                    <p className="text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Full Name:</span>
                    <p className="text-sm text-gray-900">
                      {user.user_metadata?.full_name || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">User ID:</span>
                    <p className="text-sm text-gray-900 font-mono">{user.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Account Created:</span>
                    <p className="text-sm text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-medium text-gray-900 mb-2">Profile</h4>
                  <p className="text-sm text-gray-600 mb-4">Manage your account settings</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                    Edit Profile
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-medium text-gray-900 mb-2">Settings</h4>
                  <p className="text-sm text-gray-600 mb-4">Configure your preferences</p>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
                    View Settings
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-medium text-gray-900 mb-2">Support</h4>
                  <p className="text-sm text-gray-600 mb-4">Get help when you need it</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
