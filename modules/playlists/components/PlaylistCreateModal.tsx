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
import { useCreatePlaylistMutation } from '../api'
import { toast } from 'sonner'
import { PlusCircle } from 'lucide-react'

export function PlaylistCreateModal() {
    const [open, setOpen] = useState(false)
    const [createPlaylist] = useCreatePlaylistMutation()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createPlaylist(formData).unwrap()
            toast.success('Thêm playlist thành công')
            setOpen(false)
            setFormData({
                title: '',
                description: '',
            })
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thêm playlist')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm playlist
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm playlist mới</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Tên playlist</Label>
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
                        Thêm playlist
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
