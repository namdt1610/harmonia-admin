import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const isAuthPage = request.nextUrl.pathname === '/login'
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

    // Get access token from cookies
    const accessToken = request.cookies.get('access_token')

    let isAdmin = false
    if (accessToken) {
        try {
            // Call /auth/me endpoint to get user data
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/me/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken.value}`,
                        Cookie: `access_token=${accessToken.value}`,
                    },
                    credentials: 'include',
                }
            )

            if (response.ok) {
                const userData = await response.json()
                isAdmin = userData.is_superuser
            }
        } catch (error) {
            console.error('Error checking admin status:', error)
        }
    }

    // Redirect logic
    if (isAuthPage && isAdmin) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    if (isAdminRoute && !isAdmin) {
        return NextResponse.redirect(
            new URL('http://localhost:3000/login', request.url)
        )
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
