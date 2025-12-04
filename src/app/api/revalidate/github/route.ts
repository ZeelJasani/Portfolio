import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

// Secret token to protect the endpoint
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'your-secret-token-here';

export async function POST(request: NextRequest) {
    try {
        // Check for secret token in authorization header or query param
        const authHeader = request.headers.get('authorization');
        const { searchParams } = new URL(request.url);
        const token = authHeader?.replace('Bearer ', '') || searchParams.get('token');

        if (token !== REVALIDATE_SECRET) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        // Revalidate the github-contributions tag
        revalidateTag('github-contributions', { expire: 0 });

        return NextResponse.json({
            revalidated: true,
            message: 'GitHub contributions cache cleared successfully',
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error revalidating GitHub contributions:', error);
        return NextResponse.json(
            { error: 'Error revalidating cache' },
            { status: 500 }
        );
    }
}

// Also support GET for easier testing
export async function GET(request: NextRequest) {
    return POST(request);
}
