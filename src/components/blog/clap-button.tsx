'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState, useTransition } from 'react'

import { getClapCount, hasUserClappedPost, toggleClap } from '@/features/blog/actions/claps'
import { cn } from '@/lib/utils'

import { AuthModal } from './auth-modal'

interface ClapButtonProps {
    postId: string
    initialClaps: number
}

function MediumClapIcon({ className, filled }: { className?: string; filled?: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={cn(className, filled ? 'fill-current' : 'fill-none stroke-current')}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Clapping hands icon */}
            <path d="M6 12.5V10a2 2 0 0 1 4 0v.025" />
            <path d="M10 10v.025a2 2 0 0 1 4 0V11" />
            <path d="M14 10a2 2 0 0 1 4 0v2" />
            <path d="M6 10V5a2 2 0 1 1 4 0v5" />
            <path d="M18 12v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6v-5" />
            <path d="m7 3-1.35 2.45" />
            <path d="m12 2-.5 2.6" />
            <path d="m17 3 1.35 2.45" />
        </svg>
    )
}

export function ClapButton({ postId, initialClaps }: ClapButtonProps) {
    const { isSignedIn } = useUser()
    const [claps, setClaps] = useState(initialClaps)
    const [hasClapped, setHasClapped] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [showAuthModal, setShowAuthModal] = useState(false)

    // Check if user has already clapped this post
    useEffect(() => {
        if (isSignedIn) {
            hasUserClappedPost(postId).then(setHasClapped)
        }
    }, [postId, isSignedIn])

    // Fetch initial clap count
    useEffect(() => {
        getClapCount(postId).then(setClaps)
    }, [postId])

    const handleClap = () => {
        if (!isSignedIn) {
            setShowAuthModal(true)
            return
        }

        // Optimistic update
        const newHasClapped = !hasClapped
        const prevClaps = claps
        setHasClapped(newHasClapped)
        setClaps(newHasClapped ? prevClaps + 1 : prevClaps - 1)

        startTransition(async () => {
            const result = await toggleClap(postId)

            if (result.success) {
                setHasClapped(result.clapped ?? newHasClapped)
                if (result.count !== undefined) {
                    setClaps(result.count)
                }
            } else {
                // Revert on error
                console.error('Clap error:', result.error)
                setHasClapped(!newHasClapped)
                setClaps(prevClaps)
            }
        })
    }

    return (
        <>
            <button
                onClick={handleClap}
                disabled={isPending}
                className={cn(
                    'group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-200',
                    'border border-border bg-secondary',
                    hasClapped
                        ? 'text-amber-500 border-amber-500/50'
                        : 'text-muted-foreground hover:text-amber-500',
                    isPending && 'opacity-50 cursor-not-allowed'
                )}
            >
                <MediumClapIcon
                    className={cn(
                        'h-4 w-4 transition-all duration-200',
                        hasClapped && 'scale-110',
                        !isPending && 'group-hover:scale-110'
                    )}
                    filled={hasClapped}
                />
                <span>{claps}</span>
            </button>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    )
}
