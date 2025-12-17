'use client'

import { useState, useTransition } from 'react'
import { useUser } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import { MoreHorizontal, Pencil, Trash2, Reply, Check, X } from 'lucide-react'
import { deleteComment, editComment } from '@/features/blog/actions/comments'
import { CommentForm } from './comment-form'
import type { Comment, User } from '@/types/blog'
import { cn } from '@/lib/utils'

type CommentWithUser = Comment & { user: User }

interface CommentItemProps {
    comment: CommentWithUser & { replies?: CommentWithUser[] }
    postId: string
    isReply?: boolean
}

export function CommentItem({ comment, postId, isReply = false }: CommentItemProps) {
    const { user: clerkUser, isSignedIn } = useUser()
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState(comment.content)
    const [showReplies, setShowReplies] = useState(true)
    const [isReplying, setIsReplying] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [isPending, startTransition] = useTransition()

    const isOwner = isSignedIn && clerkUser?.id === comment.user.clerk_id

    const handleEdit = () => {
        startTransition(async () => {
            const result = await editComment(comment.id, editContent)
            if (result.success) {
                setIsEditing(false)
            }
        })
    }

    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete this comment?')) return

        startTransition(async () => {
            await deleteComment(comment.id)
        })
    }

    return (
        <div className={cn('group', isReply && 'ml-12 mt-4')}>
            <div className="flex gap-3">
                {/* Avatar */}
                <img
                    src={comment.user.image_url || '/default-avatar.png'}
                    alt={comment.user.name || 'User'}
                    className="h-10 w-10 rounded-full ring-2 ring-border flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-foreground">
                                {comment.user.name || 'Anonymous'}
                            </span>
                            {comment.user.is_admin && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                    Author
                                </span>
                            )}
                            <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(comment.created_at), {
                                    addSuffix: true,
                                })}
                            </span>
                            {comment.is_edited && (
                                <span className="text-xs text-muted-foreground">(edited)</span>
                            )}
                        </div>

                        {/* Menu */}
                        {isOwner && !isEditing && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="rounded-lg p-1.5 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>

                                {showMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowMenu(false)}
                                        />
                                        <div className="absolute right-0 top-full z-50 mt-1 w-32 rounded-lg border border-border bg-popover p-1 shadow-lg">
                                            <button
                                                onClick={() => {
                                                    setIsEditing(true)
                                                    setShowMenu(false)
                                                }}
                                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-secondary transition-colors"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDelete()
                                                    setShowMenu(false)
                                                }}
                                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    {isEditing ? (
                        <div className="mt-2 space-y-2">
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full resize-none rounded-lg border border-border bg-secondary/50 p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                rows={3}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleEdit}
                                    disabled={isPending}
                                    className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    <Check className="h-3.5 w-3.5" />
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false)
                                        setEditContent(comment.content)
                                    }}
                                    className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 transition-colors"
                                >
                                    <X className="h-3.5 w-3.5" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-1 text-foreground whitespace-pre-wrap break-words">
                            {comment.content}
                        </p>
                    )}

                    {/* Actions */}
                    {!isReply && !isEditing && (
                        <div className="mt-2 flex items-center gap-4">
                            <button
                                onClick={() => setIsReplying(!isReplying)}
                                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Reply className="h-3.5 w-3.5" />
                                Reply
                            </button>

                            {comment.replies && comment.replies.length > 0 && (
                                <button
                                    onClick={() => setShowReplies(!showReplies)}
                                    className="text-xs font-medium text-primary hover:underline"
                                >
                                    {showReplies ? 'Hide' : 'Show'} {comment.replies.length}{' '}
                                    {comment.replies.length === 1 ? 'reply' : 'replies'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Reply Form */}
                    {isReplying && (
                        <div className="mt-4">
                            <CommentForm
                                postId={postId}
                                parentId={comment.id}
                                onSuccess={() => setIsReplying(false)}
                                onCancel={() => setIsReplying(false)}
                                autoFocus
                            />
                        </div>
                    )}

                    {/* Nested Replies */}
                    {showReplies && comment.replies && comment.replies.length > 0 && (
                        <div className="space-y-4">
                            {comment.replies.map((reply) => (
                                <CommentItem
                                    key={reply.id}
                                    comment={reply as CommentWithUser & { replies?: CommentWithUser[] }}
                                    postId={postId}
                                    isReply
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
