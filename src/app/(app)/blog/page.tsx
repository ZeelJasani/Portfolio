import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedPosts } from '@/features/blog/actions/posts'
import { BlogCard } from '@/components/blog/blog-card'
import { USER } from '@/features/portfolio/data/user'

export const metadata: Metadata = {
    title: 'Blogs',
    description: `Thoughts, tutorials, and insights about web development by ${USER.displayName}`,
}

interface Props {
    searchParams: Promise<{ tag?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
    const { tag: selectedTag } = await searchParams
    const allPosts = await getPublishedPosts()

    // Filter posts by tag if selected
    const posts = selectedTag
        ? allPosts.filter((post) => post.tags?.includes(selectedTag))
        : allPosts

    // Get all unique tags
    const allTags = Array.from(
        new Set(allPosts.flatMap((post) => post.tags || []))
    ).slice(0, 10)

    return (
        <div className="min-h-screen py-12">
            <div className="mx-auto max-w-4xl px-4">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-3">Blogs</h1>
                    <p className="text-muted-foreground mb-4">
                        Thoughts, tutorials, and insights on engineering and programming.
                    </p>
                    <div className="w-40 h-px bg-border mx-auto" />
                </header>

                {/* Popular Tags */}
                {allTags.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-sm font-medium text-muted-foreground mb-3">
                            Popular Tags
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {selectedTag && (
                                <Link
                                    href="/blog"
                                    className="rounded-md bg-amber-500/20 border border-amber-500/50 px-3 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/30 transition-colors"
                                >
                                    Clear filter ✕
                                </Link>
                            )}
                            {allTags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${selectedTag === tag
                                        ? 'bg-amber-500/20 border border-amber-500/50 text-amber-600 dark:text-amber-400'
                                        : 'bg-secondary border border-border text-foreground hover:bg-secondary/80'
                                        }`}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Latest Posts Header */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground">
                        {selectedTag ? `Posts tagged "${selectedTag}"` : 'Latest Posts'}{' '}
                        <span className="text-sm font-normal text-muted-foreground">
                            ({posts.length} posts)
                        </span>
                    </h2>
                </div>

                {/* Posts Grid - 2x2 centered */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
                        {posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border border-border rounded-xl bg-card max-w-3xl mx-auto">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            No posts found
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            {selectedTag ? (
                                <>
                                    No posts with tag &quot;{selectedTag}&quot;.{' '}
                                    <Link href="/blog" className="text-amber-600 dark:text-amber-400 hover:underline">
                                        View all posts
                                    </Link>
                                </>
                            ) : (
                                'Check back soon for new content!'
                            )}
                        </p>
                    </div>
                )}

                {/* Load More */}
                {posts.length >= 6 && (
                    <div className="mt-8 text-center">
                        <span className="text-sm text-muted-foreground border-b border-muted-foreground/50 pb-0.5 cursor-pointer hover:text-foreground transition-colors">
                            Load more posts
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
