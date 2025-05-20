'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/columns'
import { User } from '@/types'
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
import { useAdminUsers } from '../hooks/useAdminUsers'
import Image from 'next/image'

interface DeleteUserDialogProps {
    userId: number
    open: boolean
    onOpenChange: (open: boolean) => void
}

function DeleteUserDialog({
    userId,
    open,
    onOpenChange,
}: DeleteUserDialogProps) {
    const { deleteUser } = useAdminUsers()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Xóa người dùng</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Bạn có chắc chắn muốn xóa người dùng này không?
                </DialogDescription>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            deleteUser(userId)
                            onOpenChange(false)
                        }}
                    >
                        Xóa
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const columns: ColumnDef<User>[] = [
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
        header: ({ column }: { column: Column<User> }) => (
            <DataTableColumnHeader column={column} title="Ảnh đại diện" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Image
                    src={row.original.avatar || '/default-avatar.png'}
                    alt={row.original.username}
                    width={50}
                    height={50}
                />
            </div>
        ),
    },
    {
        accessorKey: 'username',
        header: ({ column }: { column: Column<User> }) => (
            <DataTableColumnHeader column={column} title="Tên đăng nhập" />
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }: { column: Column<User> }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: 'is_superuser',
        header: ({ column }: { column: Column<User> }) => (
            <DataTableColumnHeader column={column} title="Admin" />
        ),
        cell: ({ row }) => (
            <div>{row.original.is_superuser ? 'Có' : 'Không'}</div>
        ),
    },
    {
        accessorKey: 'actions',
        header: ({ column }: { column: Column<User> }) => (
            <DataTableColumnHeader column={column} title="Hành động" />
        ),
        cell: ({ row }) => {
            const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

            return (
                <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/users/${row.original.id}`}>
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
                    <DeleteUserDialog
                        userId={row.original.id}
                        open={deleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                    />
                </div>
            )
        },
    },
]
