'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { BlogPost, BlogPostWithCounts, BlogPostWithComments } from '@/types/blog'

// Get all published posts
export async function getPublishedPosts(): Promise<BlogPostWithCounts[]> {
    const supabase = await createClient()

    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

    if (error) {
        console.error('Error fetching posts:', error)
        return []
    }

    // Get counts for each post in parallel
    const postsWithCounts = await Promise.all(
        posts.map(async (post) => {
            const [likesResult, commentsResult] = await Promise.all([
                supabase.from('likes').select('id', { count: 'exact', head: true }).eq('post_id', post.id),
                supabase.from('comments').select('id', { count: 'exact', head: true }).eq('post_id', post.id).eq('is_approved', true)
            ])

            return {
                ...post,
                likes_count: likesResult.count || 0,
                comments_count: commentsResult.count || 0
            }
        })
    )

    return postsWithCounts
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPostWithComments | null> {
    const supabase = await createClient()

    const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

    if (error || !post) {
        console.error('Error fetching post:', error)
        return null
    }

    // Increment view count (fire and forget - non-blocking)
    supabase
        .from('blog_posts')
        .update({ views: post.views + 1 })
        .eq('id', post.id)
        .then(() => { })

    // Get likes count and comments in parallel
    const [likesResult, commentsResult] = await Promise.all([
        supabase
            .from('likes')
            .select('id', { count: 'exact', head: true })
            .eq('post_id', post.id),
        supabase
            .from('comments')
            .select(`
                *,
                user:users(*)
            `)
            .eq('post_id', post.id)
            .eq('is_approved', true)
            .is('parent_id', null)
            .order('created_at', { ascending: false })
    ])

    // Get replies for each comment in parallel
    const commentsWithReplies = await Promise.all(
        (commentsResult.data || []).map(async (comment) => {
            const { data: replies } = await supabase
                .from('comments')
                .select(`
                    *,
                    user:users(*)
                `)
                .eq('parent_id', comment.id)
                .eq('is_approved', true)
                .order('created_at', { ascending: true })

            return {
                ...comment,
                replies: replies || []
            }
        })
    )

    return {
        ...post,
        likes_count: likesResult.count || 0,
        comments_count: commentsWithReplies.length,
        comments: commentsWithReplies
    }
}

// Get all posts (for admin)
export async function getAllPosts(): Promise<BlogPostWithCounts[]> {
    const supabase = await createClient()

    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching posts:', error)
        return []
    }

    const postsWithCounts = await Promise.all(
        posts.map(async (post) => {
            const [likesResult, commentsResult] = await Promise.all([
                supabase.from('likes').select('id', { count: 'exact', head: true }).eq('post_id', post.id),
                supabase.from('comments').select('id', { count: 'exact', head: true }).eq('post_id', post.id)
            ])

            return {
                ...post,
                likes_count: likesResult.count || 0,
                comments_count: commentsResult.count || 0
            }
        })
    )

    return postsWithCounts
}

// Create new post (admin only)
export async function createPost(data: {
    title: string
    slug: string
    content: string
    description?: string
    cover_image?: string
    tags?: string[]
    published?: boolean
}): Promise<{ success: boolean; error?: string; post?: BlogPost }> {
    const supabase = await createClient()

    const { data: post, error } = await supabase
        .from('blog_posts')
        .insert({
            ...data,
            published_at: data.published ? new Date().toISOString() : null,
            reading_time: Math.ceil(data.content.split(/\s+/).length / 200)
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating post:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true, post }
}

// Update post (admin only)
export async function updatePost(
    id: string,
    data: Partial<{
        title: string
        slug: string
        content: string
        description: string
        cover_image: string
        tags: string[]
        published: boolean
        featured: boolean
    }>
): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient()

    const updateData: Record<string, unknown> = { ...data }

    if (data.published !== undefined) {
        updateData.published_at = data.published ? new Date().toISOString() : null
    }

    if (data.content) {
        updateData.reading_time = Math.ceil(data.content.split(/\s+/).length / 200)
    }

    const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)

    if (error) {
        console.error('Error updating post:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true }
}

// Delete post (admin only)
export async function deletePost(id: string): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient()

    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting post:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true }
}
