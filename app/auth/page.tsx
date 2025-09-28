'use client'

import { useState } from 'react'
import { SignInForm } from '@/components/auth/SignInForm'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const router = useRouter()

  const handleAuthSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to CryptoDash
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {mode === 'signin' 
              ? 'Sign in to access your mining dashboard' 
              : 'Create your account and start mining today'
            }
          </p>
        </div>

        {mode === 'signin' ? (
          <SignInForm 
            onSuccess={handleAuthSuccess}
            onToggleMode={() => setMode('signup')}
          />
        ) : (
          <SignUpForm 
            onSuccess={handleAuthSuccess}
            onToggleMode={() => setMode('signin')}
          />
        )}
      </div>
    </div>
  )
}