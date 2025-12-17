'use server'

import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

// Create admin client that bypasses RLS
function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
}

// Get or create user in database by Clerk ID
async function getOrCreateDbUser() {
    const { userId } = await auth()
    if (!userId) return null

    const supabase = createAdminClient()

    // First try to find existing user
    const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', userId)
        .single()

    if (existingUser) return existingUser

    // If no user exists, create one
    // Get user details from Clerk
    const { data: newUser, error } = await supabase
        .from('users')
        .insert({
            clerk_id: userId,
            email: `${userId}@temp.local`, // Temporary email, will be updated by webhook
            name: 'User',
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating user:', error)
        return null
    }

    return newUser
}

// Check if user has liked a post
export async function hasUserLikedPost(postId: string): Promise<boolean> {
    const user = await getOrCreateDbUser()
    if (!user) return false

    const supabase = createAdminClient()

    const { data: like } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single()

    return !!like
}

// Toggle like on a post
export async function toggleLike(postId: string): Promise<{
    success: boolean
    liked?: boolean
    count?: number
    error?: string
}> {
    const user = await getOrCreateDbUser()
    if (!user) {
        return { success: false, error: 'You must be signed in to like posts' }
    }

    const supabase = createAdminClient()

    // Check if already liked
    const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single()

    if (existingLike) {
        // Unlike
        const { error } = await supabase
            .from('likes')
            .delete()
            .eq('id', existingLike.id)

        if (error) {
            console.error('Error removing like:', error)
            return { success: false, error: error.message }
        }
    } else {
        // Like
        const { error } = await supabase
            .from('likes')
            .insert({
                user_id: user.id,
                post_id: postId,
            })

        if (error) {
            console.error('Error adding like:', error)
            return { success: false, error: error.message }
        }
    }

    // Get updated count
    const { count } = await supabase
        .from('likes')
        .select('id', { count: 'exact', head: true })
        .eq('post_id', postId)

    // Revalidate the page
    const { data: post } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('id', postId)
        .single()

    if (post) {
        revalidatePath(`/blog/${post.slug}`)
    }

    return {
        success: true,
        liked: !existingLike,
        count: count || 0,
    }
}

// Get like count for a post
export async function getLikeCount(postId: string): Promise<number> {
    const supabase = createAdminClient()

    const { count } = await supabase
        .from('likes')
        .select('id', { count: 'exact', head: true })
        .eq('post_id', postId)

    return count || 0
}
