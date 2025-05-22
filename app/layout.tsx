'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loading } from '@/components/ui/loading'
import { Toaster } from 'sonner'
import Sidebar from '@/components/shared/Sidebar'
import Header from '@/components/shared/Header'
import './globals.css'
import ClientProvider from '@/libs/provider'
import { Providers } from '@/providers'
import { cn } from '@/lib/utils'
import { AuthBootstrap } from '@/modules/auth/components/AuthBootstrap'
const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const handleStart = () => {
            setIsLoading(true)
        }

        const handleStop = () => {
            setIsLoading(false)
        }

        window.addEventListener('beforeunload', handleStart)
        window.addEventListener('load', handleStop)

        return () => {
            window.removeEventListener('beforeunload', handleStart)
            window.removeEventListener('load', handleStop)
        }
    }, [])

    useEffect(() => {
        setIsLoading(false)
    }, [pathname, searchParams])

    return (
        <html lang="vi" suppressHydrationWarning>
            <body
                className={cn(
                    geistSans.variable,
                    geistMono.variable,
                    'min-h-screen bg-background'
                )}
            >
                <Providers>
                    <ClientProvider>
                        <Toaster />
                        <div className="flex min-h-screen">
                            <Sidebar />
                            <div className="flex-1">
                                <AuthBootstrap />
                                <Header />
                                <main className="p-6">{children}</main>
                            </div>
                        </div>
                        {isLoading && <Loading />}
                    </ClientProvider>
                </Providers>
            </body>
        </html>
    )
}
