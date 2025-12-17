'use server'

import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import type { Comment } from '@/types/blog'

// Get user from database by Clerk ID
async function getDbUser() {
    const { userId } = await auth()
    if (!userId) return null

    const supabase = await createClient()
    const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', userId)
        .single()

    return user
}

// Add a comment
export async function addComment(data: {
    postId: string
    content: string
    parentId?: string
}): Promise<{ success: boolean; error?: string; comment?: Comment }> {
    const user = await getDbUser()
    if (!user) {
        return { success: false, error: 'You must be signed in to comment' }
    }

    const supabase = await createClient()

    const { data: comment, error } = await supabase
        .from('comments')
        .insert({
            content: data.content,
            post_id: data.postId,
            user_id: user.id,
            parent_id: data.parentId || null,
        })
        .select(`
      *,
      user:users(*)
    `)
        .single()

    if (error) {
        console.error('Error adding comment:', error)
        return { success: false, error: error.message }
    }

    // Get post slug for revalidation
    const { data: post } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('id', data.postId)
        .single()

    if (post) {
        revalidatePath(`/blog/${post.slug}`)
    }

    return { success: true, comment }
}

// Edit a comment
export async function editComment(
    commentId: string,
    content: string
): Promise<{ success: boolean; error?: string }> {
    const user = await getDbUser()
    if (!user) {
        return { success: false, error: 'You must be signed in' }
    }

    const supabase = await createClient()

    // Check ownership
    const { data: comment } = await supabase
        .from('comments')
        .select('user_id, post_id')
        .eq('id', commentId)
        .single()

    if (!comment) {
        return { success: false, error: 'Comment not found' }
    }

    if (comment.user_id !== user.id && !user.is_admin) {
        return { success: false, error: 'You can only edit your own comments' }
    }

    const { error } = await supabase
        .from('comments')
        .update({
            content,
            is_edited: true,
        })
        .eq('id', commentId)

    if (error) {
        console.error('Error editing comment:', error)
        return { success: false, error: error.message }
    }

    // Revalidate
    const { data: post } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('id', comment.post_id)
        .single()

    if (post) {
        revalidatePath(`/blog/${post.slug}`)
    }

    return { success: true }
}

// Delete a comment
export async function deleteComment(commentId: string): Promise<{ success: boolean; error?: string }> {
    const user = await getDbUser()
    if (!user) {
        return { success: false, error: 'You must be signed in' }
    }

    const supabase = await createClient()

    // Check ownership
    const { data: comment } = await supabase
        .from('comments')
        .select('user_id, post_id')
        .eq('id', commentId)
        .single()

    if (!comment) {
        return { success: false, error: 'Comment not found' }
    }

    if (comment.user_id !== user.id && !user.is_admin) {
        return { success: false, error: 'You can only delete your own comments' }
    }

    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)

    if (error) {
        console.error('Error deleting comment:', error)
        return { success: false, error: error.message }
    }

    // Revalidate
    const { data: post } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('id', comment.post_id)
        .single()

    if (post) {
        revalidatePath(`/blog/${post.slug}`)
    }

    return { success: true }
}

// Get all comments for admin
export async function getAllComments() {
    const user = await getDbUser()
    if (!user?.is_admin) {
        return []
    }

    const supabase = await createClient()

    const { data: comments } = await supabase
        .from('comments')
        .select(`
      *,
      user:users(*),
      post:blog_posts(title, slug)
    `)
        .order('created_at', { ascending: false })

    return comments || []
}
