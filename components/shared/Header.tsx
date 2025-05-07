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
import { Bell, Search, User, Settings, LogOut, HelpCircle } from 'lucide-react'
import { cn } from '@/libs/utils'

export default function Header() {
    const [searchFocused, setSearchFocused] = useState(false)

    return (
        <header className="bg-spotifyGray border-b border-gray-700 px-6 py-3">
            <div className="flex justify-between items-center">
                {/* Search section */}
                <div
                    className={cn(
                        'relative flex items-center w-80 transition-all duration-200',
                        searchFocused ? 'w-96' : 'w-80'
                    )}
                >
                    <div className="absolute left-3 text-gray-400">
                        <Search size={18} />
                    </div>
                    <Input
                        placeholder="Search..."
                        className="pl-10 bg-gray-700 border-0 focus:ring-1 focus:ring-spotifyGreen text-white"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                </div>

                {/* Right section with notifications and profile */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-full"
                    >
                        <Bell size={20} />
                    </Button>

                    {/* User profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2 hover:bg-gray-700 rounded-full p-1"
                            >
                                <Avatar className="h-8 w-8 border border-gray-700">
                                    <AvatarImage src="/images/avatar.png" />
                                    <AvatarFallback className="bg-spotifyGreen text-black">
                                        AD
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm hidden md:inline">
                                    Admin User
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-56 bg-gray-800 border-gray-700 text-white"
                        >
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                <span>Help</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="hover:bg-gray-700 text-red-400 cursor-pointer">
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
