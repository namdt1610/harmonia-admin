'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Bell,
    Search,
    User,
    Settings,
    LogOut,
    HelpCircle,
    Music,
    Link,
} from 'lucide-react'
import { cn } from '@/libs/utils'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Header() {
    const [searchFocused, setSearchFocused] = useState(false)

    return (
        <header className="bg-background border-b border-border px-6 py-3">
            <div className="flex justify-between items-center">
                {/* Search section */}
                <div
                    className={cn(
                        'relative flex items-center w-80 transition-all duration-200',
                        searchFocused ? 'w-96' : 'w-80'
                    )}
                >
                    <div className="absolute left-3 text-muted-foreground">
                        <Search size={18} />
                    </div>
                    <Input
                        placeholder="Search..."
                        className="pl-10"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                </div>

                {/* Right section with notifications and profile */}
                <div className="flex items-center space-x-4">
                    {/* Theme toggle */}
                    <ThemeToggle />

                    {/* Notifications */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <Bell size={20} />
                    </Button>

                    {/* User profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2 rounded-full p-1"
                            >
                                <Avatar className="h-8 w-8 border border-border">
                                    <AvatarImage src="/images/avatar.png" />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        AD
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm hidden md:inline">
                                    Admin User
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    window.open(
                                        `${process.env.NEXT_PUBLIC_DOMAIN_CLIENT}`,
                                        '_blank'
                                    )
                                }}
                                className="cursor-pointer"
                            >
                                <Music className="mr-2 h-4 w-4" />
                                <span>Client</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                <span>Help</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
