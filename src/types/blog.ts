// Database types for the blog feature
export interface User {
    id: string
    clerk_id: string
    email: string
    name: string | null
    username: string | null
    image_url: string | null
    is_admin: boolean
    created_at: string
    updated_at: string
}

export interface BlogPost {
    id: string
    slug: string
    title: string
    description: string | null
    content: string
    cover_image: string | null
    published: boolean
    featured: boolean
    reading_time: number | null
    tags: string[]
    views: number
    created_at: string
    updated_at: string
    published_at: string | null
}

export interface Comment {
    id: string
    content: string
    user_id: string
    post_id: string
    parent_id: string | null
    is_approved: boolean
    is_edited: boolean
    created_at: string
    updated_at: string
    // Joined fields
    user?: User
    replies?: Comment[]
}

export interface Like {
    id: string
    user_id: string
    post_id: string
    created_at: string
}

// API response types
export interface BlogPostWithCounts extends BlogPost {
    likes_count: number
    comments_count: number
}

export interface BlogPostWithComments extends BlogPost {
    likes_count: number
    comments_count: number
    comments: (Comment & { user: User; replies: (Comment & { user: User })[] })[]
}
