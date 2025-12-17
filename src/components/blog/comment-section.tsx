'use client'

import { useUser } from '@clerk/nextjs'
import { MessageCircle } from 'lucide-react'
import { CommentForm } from './comment-form'
import { CommentItem } from './comment-item'
import type { Comment, User } from '@/types/blog'

interface CommentSectionProps {
    postId: string
    comments: (Comment & { user: User; replies: (Comment & { user: User })[] })[]
}

export function CommentSection({ postId, comments }: CommentSectionProps) {
    const { isSignedIn } = useUser()

    return (
        <section className="mt-12 pt-8">
            <div className="flex items-center gap-3 mb-8">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                    Comments ({comments.length})
                </h2>
            </div>

            {/* Add Comment Form */}
            <div className="mb-10">
                <CommentForm postId={postId} />
            </div>

            {/* Comments List */}
            <div className="space-y-8">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} postId={postId} />
                ))}
            </div>

            {comments.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No comments yet</p>
                    <p className="text-sm">Be the first to share your thoughts!</p>
                </div>
            )}
        </section>
    )
}
