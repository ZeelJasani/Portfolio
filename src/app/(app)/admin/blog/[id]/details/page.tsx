import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Eye, Heart, MessageSquare, Clock, Calendar, Tag, Pencil, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

interface Props {
    params: Promise<{ id: string }>
}

function formatDate(date: string | null): string {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export default async function BlogDetailsPage({ params }: Props) {
    const { id } = await params
    const supabase = await createClient()

    // Get post with counts
    const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !post) {
        notFound()
    }

    // Get likes count
    const { count: likesCount } = await supabase
        .from('likes')
        .select('id', { count: 'exact', head: true })
        .eq('post_id', id)

    // Get comments count
    const { count: commentsCount } = await supabase
        .from('comments')
        .select('id', { count: 'exact', head: true })
        .eq('post_id', id)

    // Get recent comments
    const { data: recentComments } = await supabase
        .from('comments')
        .select(`
      *,
      user:users(name, image_url, email)
    `)
        .eq('post_id', id)
        .order('created_at', { ascending: false })
        .limit(5)

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <Link
                    href="/admin/blog"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Posts
                </Link>
                <div className="flex items-center gap-2">
                    {post.published && (
                        <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                            <ExternalLink className="h-4 w-4" />
                            View Live
                        </Link>
                    )}
                    <Link
                        href={`/admin/blog/${id}`}
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit Post
                    </Link>
                </div>
            </div>

            {/* Post Title & Status */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${post.published
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-yellow-500/10 text-yellow-500'
                            }`}
                    >
                        {post.published ? 'Published' : 'Draft'}
                    </span>
                    {post.featured && (
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                            Featured
                        </span>
                    )}
                </div>
                <h1 className="text-3xl font-bold text-foreground">{post.title}</h1>
                {post.description && (
                    <p className="mt-2 text-muted-foreground">{post.description}</p>
                )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">Views</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{post.views || 0}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">Likes</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{likesCount || 0}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">Comments</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{commentsCount || 0}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Read Time</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{post.reading_time || 0} min</p>
                </div>
            </div>

            {/* Meta Information */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Post Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Created</p>
                                <p className="text-foreground">{formatDate(post.created_at)}</p>
                            </div>
                        </div>
                        {post.published_at && (
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Published</p>
                                    <p className="text-foreground">{formatDate(post.published_at)}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Last Updated</p>
                                <p className="text-foreground">{formatDate(post.updated_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Tags & Categories</h2>
                    {post.tags && post.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-foreground"
                                >
                                    <Tag className="h-3 w-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No tags added</p>
                    )}
                </div>
            </div>

            {/* Recent Comments */}
            <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Recent Comments</h2>
                    <Link
                        href="/admin/comments"
                        className="text-sm text-primary hover:underline"
                    >
                        View all
                    </Link>
                </div>

                {recentComments && recentComments.length > 0 ? (
                    <div className="space-y-4">
                        {recentComments.map((comment: any) => (
                            <div key={comment.id} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                                {comment.user?.image_url ? (
                                    <img
                                        src={comment.user.image_url}
                                        alt={comment.user.name || 'User'}
                                        className="h-8 w-8 rounded-full"
                                    />
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-foreground text-sm">
                                            {comment.user?.name || comment.user?.email || 'Anonymous'}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDate(comment.created_at)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">No comments yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}
