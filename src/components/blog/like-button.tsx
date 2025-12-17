'use client'

import { useEffect, useState, useTransition } from 'react'
import { useUser } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import { toggleLike, hasUserLikedPost } from '@/features/blog/actions/likes'
import { AuthModal } from './auth-modal'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
    postId: string
    initialLikes: number
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
    const { isSignedIn } = useUser()
    const [likes, setLikes] = useState(initialLikes)
    const [isLiked, setIsLiked] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [showAuthModal, setShowAuthModal] = useState(false)

    // Check if user has already liked this post
    useEffect(() => {
        if (isSignedIn) {
            hasUserLikedPost(postId).then(setIsLiked)
        }
    }, [postId, isSignedIn])

    const handleLike = () => {
        if (!isSignedIn) {
            setShowAuthModal(true)
            return
        }

        // Optimistic update
        const newIsLiked = !isLiked
        const prevLikes = likes
        setIsLiked(newIsLiked)
        setLikes(newIsLiked ? prevLikes + 1 : prevLikes - 1)

        startTransition(async () => {
            const result = await toggleLike(postId)

            if (result.success) {
                setIsLiked(result.liked ?? newIsLiked)
                setLikes(result.count ?? likes)
            } else {
                // Revert on error
                console.error('Like error:', result.error)
                setIsLiked(!newIsLiked)
                setLikes(prevLikes)
            }
        })
    }

    return (
        <>
            <button
                onClick={handleLike}
                disabled={isPending}
                className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-200',
                    'border border-border bg-secondary',
                    isLiked
                        ? 'text-red-500 border-red-500/50'
                        : 'text-muted-foreground hover:text-red-500',
                    isPending && 'opacity-50 cursor-not-allowed'
                )}
            >
                <Heart
                    className={cn(
                        'h-4 w-4 transition-all duration-200',
                        isLiked && 'fill-current scale-110',
                        !isPending && 'group-hover:scale-110'
                    )}
                />
                <span>{likes}</span>
            </button>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    )
}
