'use client'
import { useAdminUsers } from '../hooks/useAdminUsers'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useState } from 'react'

export default function UserTable() {
    const { users, isLoading, deleteUser, isDeleting } = useAdminUsers()
    const [confirmId, setConfirmId] = useState<number | null>(null)
    const handleDelete = async () => {
        if (confirmId !== null) {
            await deleteUser(confirmId)
            setConfirmId(null)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setConfirmId(user.id)}
                                            disabled={isDeleting}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
            <ConfirmDialog
                open={confirmId !== null}
                title="Xác nhận xóa"
                description="Bạn có chắc chắn muốn xóa user này không?"
                onCancel={() => setConfirmId(null)}
                onConfirm={handleDelete}
                confirmText="Xóa"
                cancelText="Hủy"
                loading={isDeleting}
            />
        </Card>
    )
}