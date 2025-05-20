'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Album } from '@/types'
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
import { useDeleteAlbumMutation } from '../api'
import { toast } from 'sonner'

export const columns: ColumnDef<Album>[] = [
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
                    Tên album
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'artist',
        header: 'Nghệ sĩ',
        cell: ({ row }) => {
            const artist = row.original.artist
            return <div>{artist.name}</div>
        },
    },
    {
        accessorKey: 'release_date',
        header: 'Ngày phát hành',
        cell: ({ row }) => {
            const date = new Date(row.original.release_date)
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
            const album = row.original
            const router = useRouter()
            const [deleteAlbum] = useDeleteAlbumMutation()

            const handleDelete = async () => {
                try {
                    await deleteAlbum(album.id).unwrap()
                    toast.success('Xóa album thành công')
                } catch (error) {
                    toast.error('Có lỗi xảy ra khi xóa album')
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
                                router.push(`/admin/albums/${album.id}`)
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
