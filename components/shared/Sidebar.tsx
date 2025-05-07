'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/libs/utils'
import { Button } from '@/components/ui/button'
import {
    HomeIcon,
    UsersIcon,
    SettingsIcon,
    BarChartIcon,
    MusicIcon,
    LogOutIcon,
} from 'lucide-react'

export default function Sidebar() {
    const pathname = usePathname()

    const routes = [
        {
            label: 'Dashboard',
            icon: <HomeIcon size={20} />,
            href: '/admin/dashboard',
            active: pathname === '/dashboard',
        },
        {
            label: 'Analytics',
            icon: <BarChartIcon size={20} />,
            href: '/admin/analytics',
            active: pathname === '/analytics',
        },
        {
            label: 'Artists',
            icon: <UsersIcon size={20} />,
            href: '/admin/artists',
            active: pathname === '/artists',
        },
        {
            label: 'Tracks',
            icon: <MusicIcon size={20} />,
            href: '/admin/tracks',
            active: pathname === '/tracks',
        },
        {
            label: 'Users',
            icon: <UsersIcon size={20} />,
            href: '/admin/users',
            active: pathname === '/users',
        },
        {
            label: 'Settings',
            icon: <SettingsIcon size={20} />,
            href: '/admin/settings',
            active: pathname === '/settings',
        },
    ]

    return (
        <aside className="w-64 bg-spotifyGray h-full flex flex-col ">
            {/* Logo Section */}
            <div className="p-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-spotifyGreen rounded-full flex items-center justify-center">
                        <MusicIcon size={18} className="text-black" />
                    </div>
                    <span className="text-xl font-bold text-white">
                        Harmonia Admin
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="mb-4">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider px-3 mb-2">
                        Main Menu
                    </p>
                    <nav className="space-y-1">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    route.active
                                        ? 'bg-spotifyGreen/10 text-spotifyGreen'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                )}
                            >
                                {route.icon}
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* User Section */}
            <div className="p-4 border-t border-gray-700">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                >
                    <LogOutIcon size={18} className="mr-2" />
                    Logout
                </Button>
            </div>
        </aside>
    )
}
