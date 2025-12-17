import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import type { BlogPostWithCounts } from '@/types/blog'
import { cn } from '@/lib/utils'

interface BlogCardProps {
    post: BlogPostWithCounts
    featured?: boolean
}

function formatDate(date: string | null): string {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article
                className={cn(
                    'relative overflow-hidden rounded-lg border border-border bg-card',
                    'h-full flex flex-col',
                    featured && 'md:col-span-2'
                )}
            >
                {/* Cover Image */}
                {post.cover_image ? (
                    <div className="relative w-full overflow-hidden bg-muted">
                        <div className="aspect-video">
                            <img
                                src={post.cover_image}
                                alt={post.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <span className="text-3xl font-bold text-muted-foreground">
                            {post.title.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                    {/* Title */}
                    <h3 className="mb-1.5 text-sm font-semibold text-foreground line-clamp-2">
                        {post.title}
                    </h3>

                    {/* Description */}
                    {post.description && (
                        <p className="mb-3 text-xs text-muted-foreground line-clamp-2 flex-1">
                            {post.description}
                        </p>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded bg-secondary border border-border px-2 py-0.5 text-[10px] font-medium text-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Footer - Date and Read More */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.published_at)}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground group-hover:underline">
                            Read More
                            <ArrowRight className="h-3 w-3" />
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}
