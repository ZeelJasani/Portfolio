import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, Users, MessageSquare, ArrowLeft } from 'lucide-react'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()

    if (!userId) {
        redirect('/')
    }

    return (
        <div className="mx-auto max-w-6xl py-8 px-4">
            {/* Admin Header */}
            <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your blog posts, users, and comments
                    </p>
                </div>
                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to site
                </Link>
            </div>

            {/* Admin Navigation */}
            <nav className="mb-8 flex gap-1 rounded-lg bg-secondary/50 p-1">
                <Link
                    href="/admin/blog"
                    className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
                >
                    <FileText className="h-4 w-4" />
                    Blog Posts
                </Link>
                <Link
                    href="/admin/users"
                    className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
                >
                    <Users className="h-4 w-4" />
                    Users
                </Link>
                <Link
                    href="/admin/comments"
                    className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
                >
                    <MessageSquare className="h-4 w-4" />
                    Comments
                </Link>
            </nav>

            {children}
        </div>
    )
}
