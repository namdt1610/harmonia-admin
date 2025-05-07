'use client'
import { useAdminAlbums } from '../hooks/useAdminAlbums'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useState } from 'react'

export default function AlbumTable() {
    const { albums, isLoading, deleteAlbum, isDeleting } = useAdminAlbums()
    const [confirmId, setConfirmId] = useState<number | null>(null)
    const handleDelete = async () => {
        if (confirmId !== null) {
            await deleteAlbum(confirmId)
            setConfirmId(null)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Albums</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Artist</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {albums.map((album) => (
                                <TableRow key={album.id}>
                                    <TableCell>{album.id}</TableCell>
                                    <TableCell>{album.title}</TableCell>
                                    <TableCell>{album.artist?.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setConfirmId(album.id)}
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
                description="Bạn có chắc chắn muốn xóa album này không?"
                onCancel={() => setConfirmId(null)}
                onConfirm={handleDelete}
                confirmText="Xóa"
                cancelText="Hủy"
                loading={isDeleting}
            />
        </Card>
    )
}