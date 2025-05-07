'use client'
import { useState } from 'react'
import { useAdminArtists } from '../hooks/useAdminArtists'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

export default function ArtistTable() {
    const { artists, isLoading, deleteArtist, isDeleting } = useAdminArtists()
    const [confirmId, setConfirmId] = useState<number | null>(null)

    const handleDelete = async () => {
        if (confirmId !== null) {
            await deleteArtist(confirmId)
            setConfirmId(null)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Artists</CardTitle>
            </CardHeader>
            <CardContent>
                <Separator className="mb-4" />
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Bio</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...artists]
                                .sort((a, b) => a.id - b.id)
                                .map((artist) => (
                                    <TableRow key={artist.id}>
                                        <TableCell>{artist.id}</TableCell>
                                        <TableCell>{artist.name}</TableCell>
                                        <TableCell>{artist.bio}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="mr-2"
                                                onClick={() =>
                                                    (window.location.href = `/admin/artists/${artist.id}`)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    setConfirmId(artist.id)
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
                description="Bạn có chắc chắn muốn xóa nghệ sĩ này không?"
                onCancel={() => setConfirmId(null)}
                onConfirm={handleDelete}
                confirmText="Xóa"
                cancelText="Hủy"
                loading={isDeleting}
            />
        </Card>
    )
}
