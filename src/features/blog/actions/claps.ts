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
    const { data: newUser, error } = await supabase
        .from('users')
        .insert({
            clerk_id: userId,
            email: `${userId}@temp.local`,
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

// Check if user has clapped a post
export async function hasUserClappedPost(postId: string): Promise<boolean> {
    const user = await getOrCreateDbUser()
    if (!user) return false

    const supabase = createAdminClient()

    const { data: clap } = await supabase
        .from('claps')
        .select('id')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single()

    return !!clap
}

// Toggle clap on a post
export async function toggleClap(postId: string): Promise<{
    success: boolean
    clapped?: boolean
    count?: number
    error?: string
}> {
    const user = await getOrCreateDbUser()
    if (!user) {
        return { success: false, error: 'You must be signed in to clap' }
    }

    const supabase = createAdminClient()

    // Check if already clapped
    const { data: existingClap } = await supabase
        .from('claps')
        .select('id')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single()

    if (existingClap) {
        // Remove clap
        const { error } = await supabase
            .from('claps')
            .delete()
            .eq('id', existingClap.id)

        if (error) {
            console.error('Error removing clap:', error)
            return { success: false, error: error.message }
        }
    } else {
        // Add clap
        const { error } = await supabase
            .from('claps')
            .insert({
                user_id: user.id,
                post_id: postId,
            })

        if (error) {
            console.error('Error adding clap:', error)
            return { success: false, error: error.message }
        }
    }

    // Get updated count
    const { count } = await supabase
        .from('claps')
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
        clapped: !existingClap,
        count: count || 0,
    }
}

// Get clap count for a post
export async function getClapCount(postId: string): Promise<number> {
    const supabase = createAdminClient()

    const { count } = await supabase
        .from('claps')
        .select('id', { count: 'exact', head: true })
        .eq('post_id', postId)

    return count || 0
}
