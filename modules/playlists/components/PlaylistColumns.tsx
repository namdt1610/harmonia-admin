'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Playlist } from '@/types'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useDeletePlaylistMutation } from '../api'
import { toast } from 'sonner'

export const columns: ColumnDef<Playlist>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Tên playlist
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'user',
        header: 'Người tạo',
        cell: ({ row }) => {
            const user = row.original.user
            return <div>{user.username}</div>
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Ngày tạo',
        cell: ({ row }) => {
            const date = new Date(row.original.created_at)
            return <div>{date.toLocaleDateString('vi-VN')}</div>
        },
    },
    {
        accessorKey: 'tracks',
        header: 'Số bài hát',
        cell: ({ row }) => {
            return <div>{row.original.tracks?.length || 0}</div>
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const playlist = row.original
            const router = useRouter()
            const [deletePlaylist] = useDeletePlaylistMutation()

            const handleDelete = async () => {
                try {
                    await deletePlaylist(playlist.id).unwrap()
                    toast.success('Xóa playlist thành công')
                } catch (error) {
                    toast.error('Có lỗi xảy ra khi xóa playlist')
                }
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                router.push(`/admin/playlists/${playlist.id}`)
                            }
                        >
                            Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={handleDelete}
                        >
                            Xóa
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
