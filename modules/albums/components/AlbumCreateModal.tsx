'use client'

import { useState } from 'react'
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
import { useCreateAlbumMutation } from '../api'
import { toast } from 'sonner'
import { PlusCircle } from 'lucide-react'

export function AlbumCreateModal() {
    const [open, setOpen] = useState(false)
    const [createAlbum] = useCreateAlbumMutation()
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        release_date: '',
        description: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createAlbum({
                ...formData,
                release_date: new Date(formData.release_date).toISOString(),
            }).unwrap()
            toast.success('Thêm album thành công')
            setOpen(false)
            setFormData({
                title: '',
                artist: '',
                release_date: '',
                description: '',
            })
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thêm album')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm album
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm album mới</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="artist">Nghệ sĩ</Label>
                        <Input
                            id="artist"
                            value={formData.artist}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    artist: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="release_date">Ngày phát hành</Label>
                        <Input
                            id="release_date"
                            type="date"
                            value={formData.release_date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    release_date: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Mô tả</Label>
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
                    <Button type="submit" className="w-full">
                        Thêm album
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
