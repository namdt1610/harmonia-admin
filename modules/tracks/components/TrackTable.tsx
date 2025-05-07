'use client'
import { useState } from 'react'
import { useAdminTracks } from '../hooks/useAdminTracks'
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
import { Track } from '@/types'

export default function TrackTable() {
    const { tracks, isLoading, deleteTrack, isDeleting } = useAdminTracks()
    const [confirmId, setConfirmId] = useState<number | null>(null)

    const handleDelete = async () => {
        if (confirmId !== null) {
            await deleteTrack(confirmId)
            setConfirmId(null)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tracks</CardTitle>
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
                                <TableHead>Title</TableHead>
                                <TableHead>Artist</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...tracks]
                                .sort((a, b) => a.id - b.id)
                                .map((track) => (
                                    <TableRow key={track.id}>
                                        <TableCell>{track.id}</TableCell>
                                        <TableCell>{track.title}</TableCell>
                                        <TableCell>{track.artist?.name}</TableCell>
                                        <TableCell>{track.duration}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => setConfirmId(track.id)}
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
                description="Bạn có chắc chắn muốn xóa bài hát này không?"
                onCancel={() => setConfirmId(null)}
                onConfirm={handleDelete}
                confirmText="Xóa"
                cancelText="Hủy"
                loading={isDeleting}
            />
        </Card>
    )
}