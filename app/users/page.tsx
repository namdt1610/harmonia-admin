'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    User,
    Edit,
    Trash2,
    ExternalLink,
    Mail,
    Shield,
    CheckCircle2,
    XCircle,
    UserPlus,
    Download,
    Lock,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserFilters } from '@/components/users/UserFilters'
import { Pagination } from '@/components/shared/Pagination'

// Mock data for users
const users = Array.from({ length: 10 }).map((_, i) => ({
    id: `USR${(i + 1).toString().padStart(5, '0')}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: i % 3 === 0 ? `/avatars/avatar-${i + 1}.jpg` : null,
    type:
        i % 4 === 0
            ? 'premium'
            : i % 4 === 1
            ? 'family'
            : i % 4 === 2
            ? 'student'
            : 'free',
    status: i % 5 === 0 ? 'inactive' : 'active',
    verified: i % 3 !== 0,
    country: ['US', 'UK', 'CA', 'AU', 'DE'][i % 5],
    joined: new Date(
        Date.now() - Math.floor(Math.random() * 1000) * 24 * 60 * 60 * 1000
    )
        .toISOString()
        .split('T')[0],
    lastActive: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    )
        .toISOString()
        .split('T')[0],
}))

export default function UsersPage() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-gray-400 mt-1">
                        Manage user accounts and permissions
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button className="bg-spotifyGreen hover:bg-spotifyGreen/90 text-black">
                        <UserPlus className="mr-2 h-4 w-4" /> Add User
                    </Button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <Input
                        placeholder="Search by name, email or ID..."
                        className="pl-10 bg-gray-800 border-gray-700 focus:border-spotifyGreen focus:ring-spotifyGreen text-white"
                    />
                </div>
                <UserFilters />
            </div>

            {/* Users Table */}
            <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-gray-800">
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    <input
                                        type="checkbox"
                                        className="rounded bg-gray-700 border-gray-600 text-spotifyGreen focus:ring-spotifyGreen"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedUsers(
                                                    users.map((user) => user.id)
                                                )
                                            } else {
                                                setSelectedUsers([])
                                            }
                                        }}
                                        checked={
                                            selectedUsers.length ===
                                                users.length && users.length > 0
                                        }
                                    />
                                </TableHead>
                                <TableHead>User</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Subscription
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Status
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Country
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Joined
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Last Active
                                </TableHead>
                                <TableHead className="w-[70px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    className="hover:bg-gray-800"
                                >
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            className="rounded bg-gray-700 border-gray-600 text-spotifyGreen focus:ring-spotifyGreen"
                                            checked={selectedUsers.includes(
                                                user.id
                                            )}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedUsers([
                                                        ...selectedUsers,
                                                        user.id,
                                                    ])
                                                } else {
                                                    setSelectedUsers(
                                                        selectedUsers.filter(
                                                            (id) =>
                                                                id !== user.id
                                                        )
                                                    )
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border border-gray-700">
                                                <AvatarImage
                                                    src={user.avatar || ''}
                                                />
                                                <AvatarFallback className="bg-gray-800 text-gray-300">
                                                    {user.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium flex items-center">
                                                    {user.name}
                                                    {user.verified && (
                                                        <span className="ml-1 text-spotifyGreen">
                                                            <CheckCircle2
                                                                size={14}
                                                            />
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge
                                            variant="outline"
                                            className={
                                                user.type === 'premium'
                                                    ? 'border-spotifyGreen text-spotifyGreen'
                                                    : user.type === 'family'
                                                    ? 'border-purple-500 text-purple-500'
                                                    : user.type === 'student'
                                                    ? 'border-blue-500 text-blue-500'
                                                    : 'border-gray-500 text-gray-400'
                                            }
                                        >
                                            {user.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge
                                            variant={
                                                user.status === 'active'
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className={
                                                user.status === 'active'
                                                    ? 'bg-green-500/20 text-green-500 hover:bg-green-500/20'
                                                    : 'border-red-500/50 text-red-500'
                                            }
                                        >
                                            {user.status === 'active' ? (
                                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                            ) : (
                                                <XCircle className="mr-1 h-3 w-3" />
                                            )}
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {user.country}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-gray-400">
                                        {user.joined}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-gray-400">
                                        {user.lastActive}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="bg-gray-800 border-gray-700 text-white"
                                            >
                                                <DropdownMenuLabel>
                                                    Actions
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-gray-700" />
                                                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                                                    <Edit className="mr-2 h-4 w-4" />{' '}
                                                    Edit Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                                                    <Mail className="mr-2 h-4 w-4" />{' '}
                                                    Send Email
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                                                    <Lock className="mr-2 h-4 w-4" />{' '}
                                                    Reset Password
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                                                    <Shield className="mr-2 h-4 w-4" />{' '}
                                                    Manage Permissions
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                                                    <ExternalLink className="mr-2 h-4 w-4" />{' '}
                                                    View Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-gray-700" />
                                                <DropdownMenuItem className="text-red-500 hover:bg-gray-700 cursor-pointer">
                                                    <Trash2 className="mr-2 h-4 w-4" />{' '}
                                                    Delete Account
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Bulk Actions Bar - Only visible when users are selected */}
            {selectedUsers.length > 0 && (
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <div className="text-sm">
                        <span className="font-medium text-white">
                            {selectedUsers.length}
                        </span>{' '}
                        users selected
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-700"
                        >
                            <Mail className="mr-2 h-4 w-4" /> Email Selected
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-700"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Verify
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-red-800 text-red-500 hover:bg-red-950"
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                    Showing <span className="font-medium text-white">1-10</span>{' '}
                    of <span className="font-medium text-white">256</span> users
                </div>
                <Pagination totalPages={26} currentPage={1} />
            </div>
        </div>
    )
}
