import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, MessageCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

import { getPostBySlug, getPublishedPosts } from '@/features/blog/actions/posts'
import { CommentSection } from '@/components/blog/comment-section'
import { LikeButton } from '@/components/blog/like-button'
import { ClapButton } from '@/components/blog/clap-button'
import { ShareButton } from '@/components/blog/share-button'
import { BlogCard } from '@/components/blog/blog-card'
import { USER } from '@/features/portfolio/data/user'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return { title: 'Post Not Found' }
    }

    return {
        title: post.title,
        description: post.description || `Read ${post.title} on ${USER.displayName}'s blog`,
        openGraph: {
            title: post.title,
            description: post.description || undefined,
            images: post.cover_image ? [post.cover_image] : undefined,
            type: 'article',
            publishedTime: post.published_at || undefined,
        },
    }
}

function formatDate(date: string | null): string {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    // Get related posts (same tags or recent posts)
    const allPosts = await getPublishedPosts()
    const relatedPosts = allPosts
        .filter((p) => p.id !== post.id)
        .slice(0, 3)

    return (
        <div className="mx-auto border-x border-edge md:max-w-3xl min-h-svh">
            {/* Back Button */}
            <div className="w-full mx-auto px-4 pt-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Link>
            </div>

            {/* Cover Image - Smaller */}
            {post.cover_image && (
                <div className="w-full mx-auto px-4 pt-6">
                    <div className="relative aspect-21/9 overflow-hidden rounded-xl border border-edge">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Content Container */}
            <article className="mx-auto px-4 py-8">
                {/* Header */}
                <header className="mb-6 screen-line-after pb-6">
                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
                        {post.title}
                    </h1>

                    {/* Description */}
                    {post.description && (
                        <p className="text-base text-muted-foreground leading-relaxed mb-4">
                            {post.description}
                        </p>
                    )}

                    {/* Meta Row with Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
                        {/* Left - Date */}
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.published_at)}
                        </span>

                        {/* Right - Actions */}
                        <div className="flex items-center gap-2">
                            <LikeButton postId={post.id} initialLikes={post.likes_count} />

                            <ClapButton postId={post.id} initialClaps={0} />

                            <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground">
                                <MessageCircle className="h-4 w-4" />
                                {post.comments?.length || 0}
                            </span>

                            <ShareButton title={post.title} />
                        </div>
                    </div>
                </header>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 pb-6 screen-line-after">
                        {post.tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/blog?tag=${encodeURIComponent(tag)}`}
                                className="rounded-md bg-secondary border border-border px-3 py-1 text-xs font-medium text-foreground hover:bg-secondary/80 transition-colors"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary prose-code:text-primary prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-blockquote:border-l-zinc-600 prose-blockquote:text-muted-foreground prose-img:rounded-xl prose-strong:text-foreground prose-li:text-foreground/80">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                {/* Comments */}
                <div className="mt-12">
                    <CommentSection postId={post.id} comments={post.comments} />
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="mx-auto px-4 py-12 screen-line-before">
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                        You may also like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {relatedPosts.map((relatedPost) => (
                            <BlogCard key={relatedPost.id} post={relatedPost} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
