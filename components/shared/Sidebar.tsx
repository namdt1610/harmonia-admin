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
            label: 'Bảng điều khiển',
            icon: <HomeIcon size={20} />,
            href: '/admin/dashboard',
            active: pathname === '/dashboard',
        },
        {
            label: 'Thống kê',
            icon: <BarChartIcon size={20} />,
            href: '/admin/analytics',
            active: pathname === '/analytics',
        },
        {
            label: 'Nghệ sĩ',
            icon: <UsersIcon size={20} />,
            href: '/admin/artists',
            active: pathname === '/artists',
        },
        {
            label: 'Bài hát',
            icon: <MusicIcon size={20} />,
            href: '/admin/tracks',
            active: pathname === '/tracks',
        },
        {
            label: 'Người dùng',
            icon: <UsersIcon size={20} />,
            href: '/admin/users',
            active: pathname === '/users',
        },
        {
            label: 'Cài đặt',
            icon: <SettingsIcon size={20} />,
            href: '/admin/settings',
            active: pathname === '/settings',
        },
    ]

    return (
        <aside className="w-64 bg-background border-r h-full flex flex-col">
            {/* Logo Section */}
            <div className="p-6">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <MusicIcon
                            size={18}
                            className="text-primary-foreground"
                        />
                    </div>
                    <span className="text-xl font-bold text-foreground">
                        Harmonia Admin
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="mb-4">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider px-3 mb-2">
                        Menu chính
                    </p>
                    <nav className="space-y-1">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    route.active
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
            <div className="p-4 border-t border-border">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground"
                >
                    <LogOutIcon size={18} className="mr-2" />
                    Đăng xuất
                </Button>
            </div>
        </aside>
    )
}
