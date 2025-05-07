'use client'
import { useState } from 'react'
import { useCreateArtistMutation, useUpdateArtistMutation } from '../api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import type { Artist } from '@/types'
import { toast } from 'sonner'

export default function ArtistForm({
    artist,
    onSuccess,
}: {
    artist?: Artist
    onSuccess?: () => void
}) {
    const [form, setForm] = useState<Partial<Artist>>(artist || {})
    const [createArtist, createState] = useCreateArtistMutation()
    const [updateArtist, updateState] = useUpdateArtistMutation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            if (artist) {
                await updateArtist({ id: artist.id, data: form }).unwrap()
                toast.success('Artist updated!')
            } else {
                await createArtist(form).unwrap()
                toast.success('Artist created!')
                setForm({})
            }
            onSuccess?.()
        } catch (err) {
            toast.error('Có lỗi xảy ra!')
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{artist ? 'Edit Artist' : 'Add Artist'}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            name="name"
                            value={form.name || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                            name="bio"
                            value={form.bio || ''}
                            onChange={handleChange}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="cursor-pointer my-4"
                        type="submit"
                        disabled={
                            createState.isLoading || updateState.isLoading
                        }
                    >
                        Save
                    </Button>
                    {(createState.error || updateState.error) && (
                        <span className="text-red-500 ml-4">
                            {String(createState.error || updateState.error)}
                        </span>
                    )}
                </CardFooter>
            </form>
        </Card>
    )
}
