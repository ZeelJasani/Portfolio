'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import { updatePost, deletePost } from '@/features/blog/actions/posts'
import { ImageUpload } from '@/components/blog/image-upload'
import { createClient } from '@/lib/supabase/client'

interface EditPostPageProps {
    params: Promise<{ id: string }>
}

export default function EditPostPage({ params }: EditPostPageProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [postId, setPostId] = useState<string>('')

    const [form, setForm] = useState({
        title: '',
        slug: '',
        description: '',
        content: '',
        cover_image: '',
        tags: '',
        published: false,
        featured: false,
    })

    // Load post data
    useEffect(() => {
        async function loadPost() {
            const { id } = await params
            setPostId(id)

            const supabase = createClient()
            const { data: post, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', id)
                .single()

            if (error || !post) {
                router.push('/admin/blog')
                return
            }

            setForm({
                title: post.title,
                slug: post.slug,
                description: post.description || '',
                content: post.content,
                cover_image: post.cover_image || '',
                tags: post.tags?.join(', ') || '',
                published: post.published,
                featured: post.featured,
            })
            setLoading(false)
        }

        loadPost()
    }, [params, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        startTransition(async () => {
            const result = await updatePost(postId, {
                title: form.title,
                slug: form.slug,
                description: form.description || undefined,
                content: form.content,
                cover_image: form.cover_image || undefined,
                tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
                published: form.published,
                featured: form.featured,
            })

            if (result.success) {
                router.push('/admin/blog')
            } else {
                setError(result.error || 'Failed to update post')
            }
        })
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            return
        }

        startTransition(async () => {
            const result = await deletePost(postId)
            if (result.success) {
                router.push('/admin/blog')
            } else {
                setError(result.error || 'Failed to delete post')
            }
        })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        )
    }

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

                <div className="flex items-center gap-4">
                    {/* Status Select */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <div className="relative">
                            <select
                                value={form.published ? 'public' : 'draft'}
                                onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.value === 'public' }))}
                                className={`appearance-none rounded-lg border px-4 py-2 pr-8 text-sm font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${form.published
                                    ? 'border-green-500/30 bg-green-500/10 text-green-500'
                                    : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500'
                                    }`}
                            >
                                <option value="draft" className="bg-background text-foreground">Draft</option>
                                <option value="public" className="bg-background text-foreground">Public</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Featured Select */}
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <select
                                value={form.featured ? 'yes' : 'no'}
                                onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.value === 'yes' }))}
                                className={`appearance-none rounded-lg border px-4 py-2 pr-8 text-sm font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${form.featured
                                    ? 'border-primary/30 bg-primary/10 text-primary'
                                    : 'border-border bg-secondary text-muted-foreground'
                                    }`}
                            >
                                <option value="no" className="bg-background text-foreground">Not Featured</option>
                                <option value="yes" className="bg-background text-foreground">Featured</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
                        {error}
                    </div>
                )}

                {/* Title */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Title *
                    </label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter post title..."
                        className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-lg font-medium placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Slug *
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">/blog/</span>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                            placeholder="post-slug"
                            className="flex-1 rounded-lg border border-border bg-secondary/50 px-4 py-2 placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Description
                    </label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the post..."
                        rows={2}
                        className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-4 py-3 placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* Cover Image */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Cover Image
                    </label>
                    <ImageUpload
                        value={form.cover_image}
                        onChange={(url) => setForm((prev) => ({ ...prev, cover_image: url }))}
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Tags
                    </label>
                    <input
                        type="text"
                        value={form.tags}
                        onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                        placeholder="React, TypeScript, Web Development"
                        className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                        Separate tags with commas
                    </p>
                </div>

                {/* Content */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Content (Markdown) *
                    </label>
                    <textarea
                        value={form.content}
                        onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your blog post content in Markdown..."
                        rows={20}
                        className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-4 py-3 font-mono text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
                    <Link
                        href="/admin/blog"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {isPending ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}
