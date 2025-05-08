import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('refresh_token')?.value
    const isAuthPage =
        request.nextUrl.pathname.startsWith('/admin/login') ||
        request.nextUrl.pathname.startsWith('/admin/register')

    // If trying to access auth pages while logged in, redirect to dashboard
    if (isAuthPage && accessToken) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // If trying to access protected pages while not logged in, redirect to login
    if (!isAuthPage && !accessToken) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
}
