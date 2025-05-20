import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value
    console.log('accessToken', accessToken)
    const isAuthPage = request.nextUrl.pathname === '/login'
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

    // If trying to access login page while logged in, redirect to admin dashboard
    if (isAuthPage && accessToken) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // If trying to access protected admin pages while not logged in, redirect to login
    if (isAdminRoute && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
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
