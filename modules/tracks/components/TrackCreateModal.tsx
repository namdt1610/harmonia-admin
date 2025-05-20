'use client'

import { useState } from 'react'
import { parseBlob } from 'music-metadata-browser'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCreateTrackMutation } from '../api'
import { useGetAlbumsQuery } from '@/modules/albums/api'
import { useGetArtistsQuery } from '@/modules/artists/api'

import { toast } from 'sonner'
import { PlusCircle } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export function TrackCreateModal() {
    const [open, setOpen] = useState(false)
    const [createTrack] = useCreateTrackMutation()
    const { data: albums } = useGetAlbumsQuery()
    const { data: artists } = useGetArtistsQuery()

    const [formData, setFormData] = useState<{
        title: string
        artist: string
        album: string
        duration: string
        lyrics: string
        file: File | null
        music_video: string
        is_downloadable: boolean
    }>({
        title: '',
        artist: '',
        album: '',
        duration: '',
        lyrics: '',
        file: null,
        music_video: '',
        is_downloadable: true,
    })

    const handleAudioFileChange = async (file: File) => {
        // Set the file in state
        setFormData((prev) => ({
            ...prev,
            file,
        }))

        try {
            // Extract metadata using music-metadata-browser
            const metadata = await parseBlob(file)

            // Get title from metadata or fallback to filename without extension
            const title =
                metadata.common.title || file.name.replace(/\.[^/.]+$/, '')

            // Get duration in seconds from metadata or calculate it
            let duration = ''
            if (metadata.format && metadata.format.duration) {
                duration = Math.round(metadata.format.duration).toString()
            } else {
                // Fallback to Audio API if metadata doesn't have duration
                const url = URL.createObjectURL(file)
                const audio = new Audio(url)

                await new Promise((resolve) => {
                    audio.onloadedmetadata = () => {
                        duration = Math.round(audio.duration).toString()
                        resolve(null)
                    }

                    // Handle case where metadata might not load
                    audio.onerror = () => {
                        console.warn(
                            'Could not load audio metadata via Audio API'
                        )
                        resolve(null)
                    }
                })

                // Clean up the object URL
                URL.revokeObjectURL(url)
            }

            // Update form data with extracted information
            setFormData((prev) => ({
                ...prev,
                title,
                duration,
            }))

            // Try to extract artist name if available
            if (metadata.common.artist) {
                // Find matching artist in the list
                const matchingArtist = artists?.find(
                    (artist) =>
                        artist.name.toLowerCase() ===
                        metadata.common.artist?.toLowerCase()
                )

                if (matchingArtist) {
                    setFormData((prev) => ({
                        ...prev,
                        artist: matchingArtist.id.toString(),
                    }))
                }
            }
        } catch (err) {
            console.error('Error reading audio metadata:', err)
            toast.error('Không thể đọc thông tin từ file nhạc')

            // Still set the filename as title as fallback
            setFormData((prev) => ({
                ...prev,
                title: file.name.replace(/\.[^/.]+$/, ''),
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.file) return

        const uploadData = new FormData()
        uploadData.append('title', formData.title)
        uploadData.append('artist', formData.artist)
        uploadData.append('album', formData.album || '')
        uploadData.append('duration', formData.duration)
        uploadData.append('lyrics', formData.lyrics)
        uploadData.append('file', formData.file)

        try {
            await createTrack(uploadData as any).unwrap()
            toast.success('Thêm bài hát thành công')
            setOpen(false)
            setFormData({
                title: '',
                artist: '',
                album: '',
                duration: '',
                lyrics: '',
                file: null,
                music_video: '',
                is_downloadable: true,
            })
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thêm bài hát')
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen)
                if (!isOpen) {
                    // Reset form data when dialog is closed
                    setFormData({
                        title: '',
                        artist: '',
                        album: '',
                        duration: '',
                        lyrics: '',
                        file: null,
                        music_video: '',
                        is_downloadable: true,
                    })
                }
            }}
        >
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm bài hát
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm bài hát mới</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="file">AudioFile</Label>
                        <Input
                            id="file"
                            type="file"
                            accept="audio/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    handleAudioFileChange(file)
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Tên bài hát</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="artist">Nghệ sĩ</Label>
                        <Select
                            value={formData.artist}
                            onValueChange={(value) =>
                                setFormData({
                                    ...formData,
                                    artist: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                {formData.artist
                                    ? artists?.find(
                                          (a) =>
                                              a.id.toString() ===
                                              formData.artist
                                      )?.name
                                    : 'Chọn nghệ sĩ'}
                            </SelectTrigger>
                            <SelectContent>
                                {artists?.map((artist) => (
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
                            value={formData.album}
                            onValueChange={(value) =>
                                setFormData({
                                    ...formData,
                                    album: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                {formData.artist
                                    ? artists?.find(
                                          (a) =>
                                              a.id.toString() ===
                                              formData.artist
                                      )?.name
                                    : 'Chọn album'}
                            </SelectTrigger>
                            <SelectContent>
                                {albums?.map((album) => (
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
                        <Label htmlFor="duration">Thời lượng (giây)</Label>
                        <Input
                            id="duration"
                            type="number"
                            value={formData.duration}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    duration: e.target.value,
                                })
                            }}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lyrics">Lời bài hát</Label>
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
                    {/* Is Downloadable */}
                    <div className="space-y-2">
                        <Label htmlFor="is_downloadable">
                            Có thể tải xuống
                        </Label>
                        <Switch
                            id="is_downloadable"
                            checked={formData.is_downloadable}
                            onCheckedChange={(checked) =>
                                setFormData({
                                    ...formData,
                                    is_downloadable: checked,
                                })
                            }
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Thêm bài hát
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
