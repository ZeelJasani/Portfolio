'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSignIn } from '@clerk/nextjs'
import { ArrowRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { signIn, isLoaded } = useSignIn()
    const [isLoading, setIsLoading] = useState(false)

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // Don't render on server
    if (typeof window === 'undefined') return null
    if (!isOpen) return null

    const handleGoogleSignIn = async () => {
        if (!isLoaded) return

        setIsLoading(true)
        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/',
            })
        } catch (error) {
            console.error('Error signing in:', error)
            setIsLoading(false)
        }
    }

    const modalContent = (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/60"
            />

            {/* Modal */}
            <div
                className={cn(
                    'relative z-10 w-full max-w-[460px] mx-4 rounded-2xl p-7 shadow-2xl',
                    'bg-white text-gray-900',
                    'dark:bg-zinc-900 dark:text-zinc-100',
                    'border border-gray-200 dark:border-zinc-800'
                )}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className={cn(
                        'absolute right-4 top-4 rounded-full p-1 transition',
                        'text-gray-400 hover:text-gray-600',
                        'dark:text-zinc-500 dark:hover:text-zinc-300'
                    )}
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-1">
                        Sign in to comment
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        Sign in to leave a comment on this blog post.
                    </p>
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className={cn(
                        'w-full flex items-center justify-center gap-3 rounded-lg px-4 py-3 font-medium transition',
                        'bg-gray-900 text-white hover:bg-gray-800',
                        'dark:bg-white dark:text-black dark:hover:bg-zinc-200',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                >
                    <ArrowRight className="h-4 w-4" />
                    {isLoading ? 'Signing in...' : 'Continue with Google'}
                </button>

                {/* Footer */}
                <p className="mt-6 text-xs text-center text-gray-400 dark:text-zinc-500">
                    Trust me, I won&apos;t sell your data.
                </p>
            </div>
        </div>
    )

    // Render using portal to document.body
    return createPortal(modalContent, document.body)
}
