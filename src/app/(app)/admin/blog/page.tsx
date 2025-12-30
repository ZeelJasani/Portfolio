import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye, EyeOff, FileText, BarChart3 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { BlogPost } from '@/types/blog'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Manage Blog Posts | Admin',
}

function formatDate(date: string | null): string {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

async function getPosts() {
    try {
        const supabase = await createClient()
        const { data: posts, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching posts:', error)
            return []
        }
        return posts || []
    } catch (error) {
        console.error('Error:', error)
        return []
    }
}

async function handleDeletePost(formData: FormData) {
    'use server'
    const postId = formData.get('postId') as string
    const supabase = await createClient()
    await supabase.from('blog_posts').delete().eq('id', postId)
    revalidatePath('/admin/blog')
}

export default async function AdminBlogPage() {
    const posts = await getPosts()

    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                    Blog Posts ({posts.length})
                </h2>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    New Post
                </Link>
            </div>

            {/* Posts Table */}
            {posts.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-border">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-secondary/50">
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Title
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                                    Views
                                </th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post: BlogPost) => (
                                <tr
                                    key={post.id}
                                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            {post.cover_image ? (
                                                <img
                                                    src={post.cover_image}
                                                    alt=""
                                                    className="h-10 w-16 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="h-10 w-16 rounded-lg bg-secondary flex items-center justify-center">
                                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-foreground line-clamp-1">
                                                    {post.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    /{post.slug}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${post.published
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-yellow-500/10 text-yellow-500'
                                                }`}
                                        >
                                            {post.published ? (
                                                <>
                                                    <Eye className="h-3 w-3" />
                                                    Published
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff className="h-3 w-3" />
                                                    Draft
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-muted-foreground">
                                        {formatDate(post.published_at || post.created_at)}
                                    </td>
                                    <td className="px-4 py-4 text-center text-sm text-muted-foreground">
                                        {post.views || 0}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/admin/blog/${post.id}/details`}
                                                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                                                title="View Details"
                                            >
                                                <BarChart3 className="h-4 w-4" />
                                            </Link>
                                            {post.published && (
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                                                    title="View Live"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            )}
                                            <Link
                                                href={`/admin/blog/${post.id}`}
                                                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <form action={handleDeletePost}>
                                                <input type="hidden" name="postId" value={post.id} />
                                                <button
                                                    type="submit"
                                                    className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border py-16 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        No blog posts yet
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        Create your first blog post to get started
                    </p>
                    <Link
                        href="/admin/blog/new"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Create Post
                    </Link>
                </div>
            )}
        </div>
    )
}
