'use client'

import {
    useGetArtistQuery,
    useUpdateArtistMutation,
    useDeleteArtistMutation,
    useUploadAvatarMutation,
} from '@/modules/artists/api'
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

export default function ArtistPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { data: artist, isLoading } = useGetArtistQuery(Number(params.id))
    const [updateArtist] = useUpdateArtistMutation()
    const [uploadAvatar] = useUploadAvatarMutation()
    const [deleteArtist] = useDeleteArtistMutation()
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
    })
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!artist) {
        return <div>Artist not found</div>
    }

    const handleEdit = () => {
        setFormData({
            name: artist.name,
            bio: artist.bio || '',
        })
        setIsEditing(true)
    }

    const handleSave = async () => {
        try {
            await updateArtist({
                id: artist.id,
                data: formData,
            }).unwrap()
            toast.success('Artist updated successfully')
            setIsEditing(false)
        } catch (error) {
            toast.error('Failed to update artist')
        }
    }

    const handleDelete = async () => {
        try {
            await deleteArtist(artist.id).unwrap()
            toast.success('Artist deleted successfully')
            router.push('/admin/artists')
        } catch (error) {
            toast.error('Failed to delete artist')
        }
    }

    const handleAvatarClick = () => {
        if (isEditing) {
            fileInputRef.current?.click()
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPreviewAvatar(URL.createObjectURL(file))

            try {
                setIsUploading(true)
                await uploadAvatar({
                    id: artist.id,
                    file,
                }).unwrap()
                toast.success('Avatar uploaded successfully')
            } catch (error) {
                toast.error('Failed to upload avatar')
                setPreviewAvatar(null)
            } finally {
                setIsUploading(false)
            }
        }
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Thông tin nghệ sĩ</h1>
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
                        <CardTitle>Thông tin nghệ sĩ</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-center mb-6 relative group">
                                <div className="relative">
                                    <Image
                                        src={
                                            previewAvatar ||
                                            artist.avatar ||
                                            '/default-avatar.png'
                                        }
                                        alt={artist.name}
                                        width={200}
                                        height={200}
                                        className="rounded-full object-cover"
                                    />
                                    {isEditing && (
                                        <div
                                            className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                                            onClick={handleAvatarClick}
                                        >
                                            <Camera className="w-8 h-8 text-white" />
                                        </div>
                                    )}
                                    {isUploading && (
                                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
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
                                        <Label htmlFor="name">Tên nghệ sĩ</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">
                                            Thông tin nghệ sĩ
                                        </Label>
                                        <Textarea
                                            id="bio"
                                            value={formData.bio}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    bio: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setIsEditing(false)
                                                setPreviewAvatar(null)
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
                                        <Label>Tên nghệ sĩ</Label>
                                        <p className="text-lg">{artist.name}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Thông tin nghệ sĩ</Label>
                                        <p className="text-gray-600">
                                            {artist.bio || 'Không có thông tin'}
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
                        <DialogTitle>Delete Artist</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this artist? This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
