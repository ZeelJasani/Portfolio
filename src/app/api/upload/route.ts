import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check environment variables
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !serviceKey) {
            console.error('Missing Supabase environment variables')
            return NextResponse.json({
                error: 'Server configuration error. Check SUPABASE_SERVICE_ROLE_KEY.'
            }, { status: 500 })
        }

        // Create Supabase client with service role
        const supabase = createClient(supabaseUrl, serviceKey)

        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
        }

        // Generate unique filename
        const extension = file.name.split('.').pop() || 'jpg'
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 8)
        const filename = `blog/${timestamp}-${randomString}.${extension}`

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('image')
            .upload(filename, buffer, {
                contentType: file.type,
                cacheControl: '31536000',
                upsert: false,
            })

        if (error) {
            console.error('Supabase upload error:', error.message)
            return NextResponse.json({
                error: `Upload failed: ${error.message}`
            }, { status: 500 })
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('image')
            .getPublicUrl(data.path)

        return NextResponse.json({
            url: urlData.publicUrl,
            path: data.path
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
