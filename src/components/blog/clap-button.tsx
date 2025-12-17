'use client'

import { useEffect, useState, useTransition } from 'react'
import { useUser } from '@clerk/nextjs'
import { HandMetal } from 'lucide-react'
import { toggleClap, hasUserClappedPost, getClapCount } from '@/features/blog/actions/claps'
import { AuthModal } from './auth-modal'
import { cn } from '@/lib/utils'

interface ClapButtonProps {
    postId: string
    initialClaps: number
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
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-200',
                    'border border-border bg-secondary',
                    hasClapped
                        ? 'text-amber-500 border-amber-500/50'
                        : 'text-muted-foreground hover:text-amber-500',
                    isPending && 'opacity-50 cursor-not-allowed'
                )}
            >
                <HandMetal
                    className={cn(
                        'h-4 w-4 transition-all duration-200',
                        hasClapped && 'scale-110'
                    )}
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
