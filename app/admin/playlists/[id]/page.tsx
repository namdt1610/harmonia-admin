'use client'

import {
    useGetPlaylistQuery,
    useUpdatePlaylistMutation,
    useDeletePlaylistMutation,
    useUploadCoverMutation,
} from '@/modules/playlists/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { Camera } from 'lucide-react'

export default function PlaylistPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { data: playlist, isLoading } = useGetPlaylistQuery(Number(params.id))
    const [updatePlaylist] = useUpdatePlaylistMutation()
    const [uploadCover] = useUploadCoverMutation()
    const [deletePlaylist] = useDeletePlaylistMutation()
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        isPublic: true,
    })
    const [previewCover, setPreviewCover] = useState<string | null>(null)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!playlist) {
        return <div>Playlist not found</div>
    }

    const handleEdit = () => {
        setFormData({
            title: playlist.title,
            description: playlist.description || '',
            isPublic: playlist.isPublic,
        })
        setIsEditing(true)
    }

    const handleSave = async () => {
        try {
            await updatePlaylist({
                id: playlist.id,
                data: formData,
            }).unwrap()
            toast.success('Playlist updated successfully')
            setIsEditing(false)
        } catch (error) {
            toast.error('Failed to update playlist')
        }
    }

    const handleDelete = async () => {
        try {
            await deletePlaylist(playlist.id).unwrap()
            toast.success('Playlist deleted successfully')
            router.push('/admin/playlists')
        } catch (error) {
            toast.error('Failed to delete playlist')
        }
    }

    const handleCoverClick = () => {
        if (isEditing) {
            fileInputRef.current?.click()
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPreviewCover(URL.createObjectURL(file))

            try {
                setIsUploading(true)
                await uploadCover({
                    id: playlist.id,
                    file,
                }).unwrap()
                toast.success('Cover uploaded successfully')
            } catch (error) {
                toast.error('Failed to upload cover')
                setPreviewCover(null)
            } finally {
                setIsUploading(false)
            }
        }
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Thông tin playlist</h1>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => router.back()}>
                        Quay lại
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        Xóa
                    </Button>
                </div>
            </div>

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin playlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-center mb-6 relative group">
                                <div className="relative">
                                    <Image
                                        src={
                                            previewCover ||
                                            playlist.cover ||
                                            '/default-cover.png'
                                        }
                                        alt={playlist.title}
                                        width={200}
                                        height={200}
                                        className="rounded-lg object-cover"
                                    />
                                    {isEditing && (
                                        <div
                                            className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                                            onClick={handleCoverClick}
                                        >
                                            <Camera className="w-8 h-8 text-white" />
                                        </div>
                                    )}
                                    {isUploading && (
                                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            {isEditing ? (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="title">
                                            Tên playlist
                                        </Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">
                                            Mô tả
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="isPublic"
                                            checked={formData.isPublic}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    isPublic: e.target.checked,
                                                })
                                            }
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="isPublic">
                                            Công khai
                                        </Label>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setIsEditing(false)
                                                setPreviewCover(null)
                                            }}
                                        >
                                            Hủy bỏ
                                        </Button>
                                        <Button onClick={handleSave}>
                                            Lưu
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <Label>Tên playlist</Label>
                                        <p className="text-lg">
                                            {playlist.title}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Mô tả</Label>
                                        <p className="text-gray-600">
                                            {playlist.description ||
                                                'Không có mô tả'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Trạng thái</Label>
                                        <p className="text-gray-600">
                                            {playlist.isPublic
                                                ? 'Công khai'
                                                : 'Riêng tư'}
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button onClick={handleEdit}>
                                            Chỉnh sửa
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Xóa playlist</DialogTitle>
                        <DialogDescription>
                            Bạn có chắc chắn muốn xóa playlist này? Hành động
                            này không thể hoàn tác.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Hủy
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
