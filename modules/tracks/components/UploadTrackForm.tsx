'use client'

import { useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadTrackSchema } from '@/libs/validation'
import { useUploadTrackMutation } from '@/modules/upload/api'
import { useGetArtistsQuery } from '@/modules/artists/api'
import { useGetAlbumsByArtistQuery } from '@/modules/albums/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { z } from 'zod'
import { convertSecondsToMinutes } from '@/libs/time'
import Link from 'next/link'

type UploadTrackFormData = z.infer<typeof uploadTrackSchema>

export default function UploadTrackForm() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm<UploadTrackFormData>({
        resolver: zodResolver(uploadTrackSchema),
    })

    const [uploadTrack] = useUploadTrackMutation()
    const { data: artists } = useGetArtistsQuery()
    const artistId = watch('artistId')
    const artistIdNumber = Number(artistId)
    const { data: albums } = useGetAlbumsByArtistQuery(artistIdNumber, {
        skip: !artistId,
    })
    const [duration, setDuration] = useState<number | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const fileName = file.name.replace(/\.[^/.]+$/, '')
        setValue('title', fileName)

        const audio = new Audio(URL.createObjectURL(file))
        audio.onloadedmetadata = () => {
            setDuration(Math.round(audio.duration))
        }
    }

    const onSubmit = async (data: UploadTrackFormData) => {
        try {
            const formData = new FormData()
            const file = data.file?.[0]
            if (!file) {
                toast.error('❌ Vui lòng chọn file nhạc!')
                return
            }

            formData.append('file', file)
            formData.append('title', data.title)
            formData.append('artist', data.artistId)
            if (data.albumId) formData.append('album', data.albumId)
            if (duration) formData.append('duration', String(duration))

            await uploadTrack(formData).unwrap()

            toast.success('🎉 Upload thành công!', {
                description: 'Bài hát đã được tải lên thành công.',
            })

            reset()
            setDuration(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch (error: any) {
            toast.error('❌ Lỗi upload!', {
                description: error.data?.error || 'Đã có lỗi xảy ra.',
            })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-white p-4 rounded-md shadow-md text-black"
        >
            {/* File Upload */}
            <div>
                <Label htmlFor="file">Chọn file nhạc</Label>
                <Input
                    type="file"
                    accept="audio/*"
                    {...register('file')}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
                {errors.file && (
                    <p className="text-red-500 text-sm">
                        {errors.file.message as string}
                    </p>
                )}
                {duration !== null && (
                    <p className="text-green-500 text-sm">
                        Thời lượng: {convertSecondsToMinutes(duration)}
                    </p>
                )}
            </div>

            {/* Title */}
            <div>
                <Label htmlFor="title">Tiêu đề bài hát</Label>
                <Input
                    type="text"
                    {...register('title')}
                    placeholder="Nhập tiêu đề"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">
                        {errors.title.message}
                    </p>
                )}
            </div>

            {/* Artist Select */}
            <div>
                <Controller
                    control={control}
                    name="artistId"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn nghệ sĩ" />
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
                    )}
                />
            </div>

            {/* Album Select */}
            <div>
                <Label htmlFor="album">Chọn album</Label>
                <Select
                    onValueChange={(value) => setValue('albumId', value)}
                    disabled={!albums}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                albums ? 'Chọn album' : 'Chọn nghệ sĩ trước'
                            }
                        />
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

            {/* Submit */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Đang tải lên...' : 'Tải lên'}
            </Button>
            <Button asChild className="w-full" variant="outline">
                <Link href="/tracks">Xem tất cả nhạc bạn đã tải lên</Link>
            </Button>
        </form>
    )
}
