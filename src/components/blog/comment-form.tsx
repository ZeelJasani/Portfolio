'use client'

import { useState, useTransition } from 'react'
import { useUser } from '@clerk/nextjs'
import { Send } from 'lucide-react'
import { addComment } from '@/features/blog/actions/comments'
import { AuthModal } from './auth-modal'
import { cn } from '@/lib/utils'

interface CommentFormProps {
    postId: string
    parentId?: string
    onSuccess?: () => void
    onCancel?: () => void
    placeholder?: string
    autoFocus?: boolean
}

export function CommentForm({
    postId,
    parentId,
    onSuccess,
    onCancel,
    placeholder,
    autoFocus = false,
}: CommentFormProps) {
    const { isSignedIn, user } = useUser()
    const [content, setContent] = useState('')
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [showAuthModal, setShowAuthModal] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!content.trim()) return

        if (!isSignedIn) {
            setShowAuthModal(true)
            return
        }

        setError(null)

        startTransition(async () => {
            const result = await addComment({
                postId,
                content: content.trim(),
                parentId,
            })

            if (result.success) {
                setContent('')
                onSuccess?.()
            } else {
                setError(result.error || 'Failed to post comment')
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-3">
                    {/* User Avatar */}
                    {isSignedIn && user?.imageUrl ? (
                        <img
                            src={user.imageUrl}
                            alt={user.fullName || 'User'}
                            className="h-10 w-10 rounded-full ring-2 ring-border"
                        />
                    ) : (
                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                            <span className="text-lg">👤</span>
                        </div>
                    )}

                    {/* Input */}
                    <div className="flex-1">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={placeholder || (parentId ? 'Write a reply...' : 'Share your thoughts...')}
                            autoFocus={autoFocus}
                            className={cn(
                                'w-full resize-none rounded-xl border border-border bg-secondary/50 p-4',
                                'placeholder:text-muted-foreground/60',
                                'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
                                'transition-all duration-200',
                                parentId ? 'min-h-[80px]' : 'min-h-[120px]'
                            )}
                            disabled={isPending}
                        />
                    </div>
                </div>

                {error && (
                    <p className="text-sm text-destructive ml-13">{error}</p>
                )}

                <div className="flex justify-end gap-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isPending || !content.trim()}
                        className={cn(
                            'flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium',
                            'bg-primary text-primary-foreground',
                            'hover:bg-primary/90 transition-colors',
                            'disabled:opacity-50 disabled:cursor-not-allowed'
                        )}
                    >
                        <Send className="h-4 w-4" />
                        {isPending ? 'Posting...' : parentId ? 'Reply' : 'Comment'}
                    </button>
                </div>
            </form>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    )
}
