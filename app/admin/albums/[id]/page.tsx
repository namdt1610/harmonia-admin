'use client'

import {
    useGetAlbumQuery,
    useUpdateAlbumMutation,
    useDeleteAlbumMutation,
    useUploadCoverMutation,
} from '@/modules/albums/api'
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

export default function AlbumPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { data: album, isLoading } = useGetAlbumQuery(Number(params.id))
    const [updateAlbum] = useUpdateAlbumMutation()
    const [uploadCover] = useUploadCoverMutation()
    const [deleteAlbum] = useDeleteAlbumMutation()
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        releaseDate: '',
        artist: 0,
    })
    const [previewCover, setPreviewCover] = useState<string | null>(null)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!album) {
        return <div>Album not found</div>
    }

    const handleEdit = () => {
        setFormData({
            title: album.title,
            description: album.description || '',
            releaseDate: album.releaseDate,
            artist: album.artist,
        })
        setIsEditing(true)
    }

    const handleSave = async () => {
        try {
            await updateAlbum({
                id: album.id,
                data: formData,
            }).unwrap()
            toast.success('Album updated successfully')
            setIsEditing(false)
        } catch (error) {
            toast.error('Failed to update album')
        }
    }

    const handleDelete = async () => {
        try {
            await deleteAlbum(album.id).unwrap()
            toast.success('Album deleted successfully')
            router.push('/admin/albums')
        } catch (error) {
            toast.error('Failed to delete album')
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
                    id: album.id,
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
                <h1 className="text-3xl font-bold">Thông tin album</h1>
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
                        <CardTitle>Thông tin album</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-center mb-6 relative group">
                                <div className="relative">
                                    <Image
                                        src={
                                            previewCover ||
                                            album.cover ||
                                            '/default-cover.png'
                                        }
                                        alt={album.title}
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
                                        <Label htmlFor="title">Tên album</Label>
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
                                    <div className="space-y-2">
                                        <Label htmlFor="releaseDate">
                                            Ngày phát hành
                                        </Label>
                                        <Input
                                            id="releaseDate"
                                            type="date"
                                            value={formData.releaseDate}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    releaseDate: e.target.value,
                                                })
                                            }
                                        />
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
                                        <Label>Tên album</Label>
                                        <p className="text-lg">{album.title}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Mô tả</Label>
                                        <p className="text-gray-600">
                                            {album.description ||
                                                'Không có mô tả'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Ngày phát hành</Label>
                                        <p className="text-gray-600">
                                            {new Date(
                                                album.releaseDate
                                            ).toLocaleDateString()}
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
                        <DialogTitle>Xóa album</DialogTitle>
                        <DialogDescription>
                            Bạn có chắc chắn muốn xóa album này? Hành động này
                            không thể hoàn tác.
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
