import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {getToken} from "next-auth/jwt";

const JWT_SECRET = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/test') ||
        request.nextUrl.pathname.endsWith('/api/user')) {
        if (!JWT_SECRET)
            return NextResponse.error()
        const token = await getToken({req: request, secret: JWT_SECRET})

        if (!token)
            return NextResponse.json({'error': 'No token provided or invalid token'}, {
                status: 401,
                headers: {'Content-Type': 'application/json'},
            });
    }
    return NextResponse.next()
}