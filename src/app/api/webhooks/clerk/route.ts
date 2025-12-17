import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

// Use service role key for admin operations
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        console.error('Missing CLERK_WEBHOOK_SECRET')
        return new Response('Missing webhook secret', { status: 500 })
    }

    // Get the headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Missing svix headers', { status: 400 })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Verify the webhook
    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Webhook verification failed:', err)
        return new Response('Webhook verification failed', { status: 400 })
    }

    // Handle the event
    const eventType = evt.type

    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, email_addresses, first_name, last_name, image_url, username } = evt.data

        const email = email_addresses[0]?.email_address
        const name = [first_name, last_name].filter(Boolean).join(' ')

        // Check if this is the admin user (first user or matches admin email)
        const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
        const isAdmin = adminEmails.includes(email || '')

        const { error } = await supabase
            .from('users')
            .upsert({
                clerk_id: id,
                email: email || '',
                name: name || null,
                username: username || null,
                image_url: image_url || null,
                is_admin: isAdmin,
                updated_at: new Date().toISOString(),
            }, {
                onConflict: 'clerk_id'
            })

        if (error) {
            console.error('Error upserting user:', error)
            return new Response('Error syncing user', { status: 500 })
        }
    }

    if (eventType === 'user.deleted') {
        const { id } = evt.data

        if (id) {
            const { error } = await supabase
                .from('users')
                .delete()
                .eq('clerk_id', id)

            if (error) {
                console.error('Error deleting user:', error)
            }
        }
    }

    return new Response('Webhook processed', { status: 200 })
}
