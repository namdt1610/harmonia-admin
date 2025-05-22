'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Track } from '@/types'
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
import { useDeleteTrackMutation } from '../api'
import { toast } from 'sonner'

export const columns: ColumnDef<Track>[] = [
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
                    Tên bài hát
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'artist_name',
        header: 'Nghệ sĩ',
        cell: ({ row }) => {
            const artist = row.original.artist_name
            return <div>{artist}</div>
        },
    },
    {
        accessorKey: 'album',
        header: 'Album',
        cell: ({ row }) => {
            const album = row.original.album
            return <div>{album?.title || 'Không có album'}</div>
        },
    },
    {
        accessorKey: 'duration',
        header: 'Thời lượng',
        cell: ({ row }) => {
            const duration = row.original.duration
            const minutes = Math.floor(duration / 60)
            const seconds = duration % 60
            return (
                <div>{`${minutes}:${seconds.toString().padStart(2, '0')}`}</div>
            )
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const track = row.original
            const router = useRouter()
            const [deleteTrack] = useDeleteTrackMutation()

            const handleDelete = async () => {
                try {
                    await deleteTrack(track.id).unwrap()
                    toast.success('Xóa bài hát thành công')
                } catch (error) {
                    toast.error('Có lỗi xảy ra khi xóa bài hát')
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
                                router.push(`/admin/tracks/${track.id}`)
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
