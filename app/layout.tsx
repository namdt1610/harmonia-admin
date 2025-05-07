import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Sidebar from '@/components/shared/Sidebar'
import Header from '@/components/shared/Header'
import './globals.css'
import ClientProvider from '@/libs/provider'
import { Toaster } from 'sonner'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Spotify Admin Panel',
    description: 'Management dashboard for Spotify administrators',
    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
            >
                <ClientProvider>
                    <Toaster/>
                    <div className="flex h-screen overflow-hidden">
                        <Sidebar />
                        <div className="flex flex-col flex-1">
                            <Header />
                            <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-spotifyGray to-black">
                                <div className="container mx-auto max-w-7xl">
                                    {children}
                                </div>
                            </main>
                        </div>
                    </div>
                </ClientProvider>
            </body>
        </html>
    )
}
