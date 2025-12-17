import Link from 'next/link'
import { Trash2, ExternalLink, MessageSquare, User } from 'lucide-react'
import { getAllComments, deleteComment } from '@/features/blog/actions/comments'

export const metadata = {
    title: 'Manage Comments | Admin',
}

function formatDate(date: string | null): string {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export default async function AdminCommentsPage() {
    const comments = await getAllComments()

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                    Comments ({comments.length})
                </h2>
                <p className="text-sm text-muted-foreground">
                    All comments across blog posts
                </p>
            </div>

            {/* Comments List */}
            {comments.length > 0 ? (
                <div className="space-y-4">
                    {comments.map((comment: any) => (
                        <div
                            key={comment.id}
                            className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex gap-3">
                                    {/* Avatar */}
                                    {comment.user?.image_url ? (
                                        <img
                                            src={comment.user.image_url}
                                            alt={comment.user.name || 'User'}
                                            className="h-10 w-10 rounded-full ring-2 ring-border flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                                            <User className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        {/* Header */}
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <span className="font-semibold text-foreground">
                                                {comment.user?.name || 'Anonymous'}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                on
                                            </span>
                                            <Link
                                                href={`/blog/${comment.post?.slug}`}
                                                target="_blank"
                                                className="text-xs text-primary hover:underline flex items-center gap-1"
                                            >
                                                {comment.post?.title}
                                                <ExternalLink className="h-3 w-3" />
                                            </Link>
                                        </div>

                                        {/* Content */}
                                        <p className="text-foreground whitespace-pre-wrap break-words">
                                            {comment.content}
                                        </p>

                                        {/* Meta */}
                                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                                            <span>{formatDate(comment.created_at)}</span>
                                            {comment.is_edited && <span>(edited)</span>}
                                            {comment.parent_id && (
                                                <span className="text-primary">↳ Reply</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <form
                                    action={async () => {
                                        'use server'
                                        await deleteComment(comment.id)
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                        title="Delete comment"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border py-16 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        No comments yet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Comments will appear here when users start commenting on your posts
                    </p>
                </div>
            )}
        </div>
    )
}
