'use client'
import { useState } from 'react'
import { useTrackForm } from '../hooks/useTrackForm'
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
import type { Track } from '@/types'

export default function TrackForm({
    track,
    onSuccess,
}: {
    track?: Track
    onSuccess?: () => void
}) {
    const [form, setForm] = useState<Partial<Track>>(track || {})
    const { submit, isLoading, error } = useTrackForm(track)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await submit(form)
        onSuccess?.()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{track ? 'Edit Track' : 'Add Track'}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            name="title"
                            value={form.title || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                            name="duration"
                            value={form.duration || ''}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Add more fields as needed */}
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                        Save
                    </Button>
                    {error && (
                        <span className="text-red-500 ml-4">
                            {String(error)}
                        </span>
                    )}
                </CardFooter>
            </form>
        </Card>
    )
}
