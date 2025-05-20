'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/columns'
import { Artist } from '@/types'
import { Eye, Trash } from 'lucide-react'
import { ColumnDef, Column } from '@tanstack/react-table'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { useAdminArtists } from '../hooks/useAdminArtists'
import Image from 'next/image'
interface DeleteArtistDialogProps {
    artistId: number
    open: boolean
    onOpenChange: (open: boolean) => void
}

function DeleteArtistDialog({
    artistId,
    open,
    onOpenChange,
}: DeleteArtistDialogProps) {
    const { deleteArtist } = useAdminArtists()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Artist</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete this artist?
                </DialogDescription>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            deleteArtist(artistId)
                            onOpenChange(false)
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const columns: ColumnDef<Artist>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'avatar',
        header: ({ column }: { column: Column<Artist> }) => (
            <DataTableColumnHeader column={column} title="Ảnh đại diện" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Image
                    src={row.original.avatar || '/default-avatar.png'}
                    alt={row.original.name}
                    width={50}
                    height={50}
                />
            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }: { column: Column<Artist> }) => (
            <DataTableColumnHeader column={column} title="Tên" />
        ),
    },
    {
        accessorKey: 'bio',
        header: ({ column }: { column: Column<Artist> }) => (
            <DataTableColumnHeader column={column} title="Thông tin" />
        ),
    },
    {
        accessorKey: 'actions',
        header: ({ column }: { column: Column<Artist> }) => (
            <DataTableColumnHeader column={column} title="Hành động" />
        ),
        cell: ({ row }) => {
            const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

            return (
                <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/artists/${row.original.id}`}>
                        <Button variant="ghost" size="icon">
                            <Eye className="text-blue-500" />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        <Trash className="text-red-500" />
                    </Button>
                    <DeleteArtistDialog
                        artistId={row.original.id}
                        open={deleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                    />
                </div>
            )
        },
    },
]
