'use client'

import {
    useGetTrackQuery,
    useUpdateTrackMutation,
    useDeleteTrackMutation,
    useUploadCoverMutation,
} from '@/modules/tracks/api'
import { useGetArtistsQuery } from '@/modules/artists/api'
import { useGetAlbumsByArtistQuery } from '@/modules/albums/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRouter, useParams } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
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
import { Track } from '@/types'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface FormData {
    title: string
    lyrics: string
    duration: number
    artist: number
    album: number | null
    explicit: boolean
    file: string
    video: string
}

// Extend the Track type to include additional properties
interface ExtendedTrack extends Track {
    explicit?: boolean
    video?: string
}

export default function TrackPage() {
    const router = useRouter()
    const params = useParams()
    const trackId = Number(params.id)
    const [formData, setFormData] = useState<FormData>({
        title: '',
        lyrics: '',
        duration: 0,
        artist: 0,
        album: null,
        explicit: false,
        file: '',
        video: '',
    })
    const { data: track, isLoading } = useGetTrackQuery(trackId)
    const { data: artists = [] } = useGetArtistsQuery()
    const { data: albums = [] } = useGetAlbumsByArtistQuery(
        formData.artist || 0,
        {
            skip: !formData.artist,
        }
    )
    const [updateTrack] = useUpdateTrackMutation()
    const [uploadCover] = useUploadCoverMutation()
    const [deleteTrack] = useDeleteTrackMutation()
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [previewCover, setPreviewCover] = useState<string | null>(null)

    // Reset album when artist changes
    useEffect(() => {
        if (isEditing) {
            setFormData((prev) => ({
                ...prev,
                album: null,
            }))
        }
    }, [formData.artist, isEditing])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!track) {
        return <div>Track not found</div>
    }

    const handleEdit = () => {
        const extendedTrack = track as ExtendedTrack
        setFormData({
            title: track.title,
            lyrics: track.lyrics || '',
            duration: track.duration,
            artist: track.artist.id,
            album: track.album?.id || null,
            explicit: extendedTrack.explicit || false,
            file: track.file,
            video: extendedTrack.video || '',
        })
        setIsEditing(true)
    }

    const handleSave = async () => {
        try {
            const updatedTrack: any = {
                ...formData,
            }
            // Nếu không chọn album, gán album mặc định (ví dụ: albums[0]?.id)
            if (!formData.album && albums.length > 0) {
                updatedTrack.album = albums[0].id
            }
            // Không gửi file/video nếu không upload mới
            delete updatedTrack.file
            delete updatedTrack.video

            await updateTrack({
                id: track.id,
                data: updatedTrack,
            }).unwrap()
            toast.success('Track updated successfully')
            setIsEditing(false)
        } catch (error) {
            console.error('Update error:', error)
            toast.error('Failed to update track')
        }
    }

    const handleDelete = async () => {
        try {
            await deleteTrack(track.id).unwrap()
            toast.success('Track deleted successfully')
            router.push('/admin/tracks')
        } catch (error) {
            toast.error('Failed to delete track')
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
                    id: track.id,
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

    const extendedTrack = track as ExtendedTrack

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Thông tin bài hát</h1>
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
                        <CardTitle>Thông tin bài hát</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-center mb-6 relative group">
                                <div className="relative">
                                    <Image
                                        src={
                                            previewCover ||
                                            track.cover ||
                                            '/default-cover.png'
                                        }
                                        alt={track.title}
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
                                            Tên bài hát
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
                                        <Label htmlFor="artist">Nghệ sĩ</Label>
                                        <Select
                                            value={
                                                formData.artist
                                                    ? formData.artist.toString()
                                                    : ''
                                            }
                                            onValueChange={(value) =>
                                                setFormData({
                                                    ...formData,
                                                    artist: value
                                                        ? Number(value)
                                                        : 0,
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn nghệ sĩ" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {artists.map((artist) => (
                                                    <SelectItem
                                                        key={artist.id}
                                                        value={artist.id.toString()}
                                                    >
                                                        {artist.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="album">Album</Label>
                                        <Select
                                            value={
                                                formData.album?.toString() ||
                                                'none'
                                            }
                                            onValueChange={(value) =>
                                                setFormData({
                                                    ...formData,
                                                    album:
                                                        value === 'none'
                                                            ? null
                                                            : Number(value),
                                                })
                                            }
                                            disabled={!formData.artist}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn album" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">
                                                    Không có album
                                                </SelectItem>
                                                {albums.map((album) => (
                                                    <SelectItem
                                                        key={album.id}
                                                        value={album.id.toString()}
                                                    >
                                                        {album.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lyrics">
                                            Lời bài hát
                                        </Label>
                                        <Textarea
                                            id="lyrics"
                                            value={formData.lyrics}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    lyrics: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="duration">
                                            Thời lượng (giây)
                                        </Label>
                                        <Input
                                            id="duration"
                                            type="number"
                                            value={formData.duration}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    duration: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="file">
                                            File âm thanh
                                        </Label>
                                        <Input
                                            id="file"
                                            type="text"
                                            value={formData.file}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    file: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="video">Video</Label>
                                        <Input
                                            id="video"
                                            type="text"
                                            value={formData.video}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    video: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="explicit"
                                            checked={formData.explicit}
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    explicit: checked,
                                                })
                                            }
                                        />
                                        <Label htmlFor="explicit">
                                            Nội dung nhạy cảm
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
                                        <Label>Tên bài hát</Label>
                                        <p className="text-lg">{track.title}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nghệ sĩ</Label>
                                        <p className="text-gray-600">
                                            {track.artist_name}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Album</Label>
                                        <p className="text-gray-600">
                                            {track.album?.title ||
                                                'Không có album'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Lời bài hát</Label>
                                        <p className="text-gray-600">
                                            {track.lyrics ||
                                                'Không có lời bài hát'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Thời lượng</Label>
                                        <p className="text-gray-600">
                                            {Math.floor(track.duration / 60)}:
                                            {(track.duration % 60)
                                                .toString()
                                                .padStart(2, '0')}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>File âm thanh</Label>
                                        <p className="text-gray-600">
                                            {track.file}
                                        </p>
                                    </div>
                                    {extendedTrack.video && (
                                        <div className="space-y-2">
                                            <Label>Video</Label>
                                            <p className="text-gray-600">
                                                {extendedTrack.video}
                                            </p>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <Label>Nội dung nhạy cảm</Label>
                                        <p className="text-gray-600">
                                            {extendedTrack.explicit
                                                ? 'Có'
                                                : 'Không'}
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
                        <DialogTitle>Xóa bài hát</DialogTitle>
                        <DialogDescription>
                            Bạn có chắc chắn muốn xóa bài hát này? Hành động này
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
