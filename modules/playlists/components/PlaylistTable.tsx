'use client'
import { useAdminPlaylists } from '../hooks/useAdminPlaylists'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useState } from 'react'

export default function PlaylistTable() {
    const { playlists, isLoading, deletePlaylist, isDeleting } =
        useAdminPlaylists()
    const [confirmId, setConfirmId] = useState<number | null>(null)
    const handleDelete = async () => {
        if (confirmId !== null) {
            await deletePlaylist(confirmId)
            setConfirmId(null)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Playlists</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {playlists.map((playlist) => (
                                <TableRow key={playlist.id}>
                                    <TableCell>{playlist.id}</TableCell>
                                    <TableCell>{playlist.name}</TableCell>
                                    <TableCell>
                                        {playlist.user?.username}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                setConfirmId(playlist.id)
                                            }
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
                description="Bạn có chắc chắn muốn xóa playlist này không?"
                onCancel={() => setConfirmId(null)}
                onConfirm={handleDelete}
                confirmText="Xóa"
                cancelText="Hủy"
                loading={isDeleting}
            />
        </Card>
    )
}
