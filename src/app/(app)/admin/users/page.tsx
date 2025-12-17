import { createClient } from '@/lib/supabase/server'
import { User } from 'lucide-react'
import type { User as UserType } from '@/types/blog'

export const metadata = {
    title: 'Manage Users | Admin',
}

function formatDate(date: string | null): string {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export default async function AdminUsersPage() {
    const supabase = await createClient()

    const { data: users } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                    Users ({users?.length || 0})
                </h2>
                <p className="text-sm text-muted-foreground">
                    All registered users from Clerk authentication
                </p>
            </div>

            {/* Users Table */}
            {users && users.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-border">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-secondary/50">
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    User
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Role
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Joined
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: UserType) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            {user.image_url ? (
                                                <img
                                                    src={user.image_url}
                                                    alt={user.name || 'User'}
                                                    className="h-10 w-10 rounded-full ring-2 ring-border"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                                                    <User className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {user.name || 'Anonymous'}
                                                </p>
                                                {user.username && (
                                                    <p className="text-xs text-muted-foreground">
                                                        @{user.username}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-muted-foreground">
                                        {user.email}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${user.is_admin
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'bg-secondary text-muted-foreground'
                                                }`}
                                        >
                                            {user.is_admin ? 'Admin' : 'User'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-muted-foreground">
                                        {formatDate(user.created_at)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border py-16 text-center">
                    <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        No users yet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Users will appear here when they sign up
                    </p>
                </div>
            )}
        </div>
    )
}
