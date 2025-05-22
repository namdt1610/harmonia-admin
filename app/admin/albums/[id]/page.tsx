import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { Camera } from 'lucide-react'
import AlbumForm from '../../../../modules/albums/components/AlbumForm'

async function getAlbum(id: string) {
    const res = await fetch(`http://localhost:8000/api/albums/${id}`)
    if (!res.ok) {
        throw new Error('Failed to fetch album')
    }
    return res.json()
}

export default async function AlbumPage({
    params,
}: {
    params: { id: string }
}) {
    const album = await getAlbum(params.id)

    if (!album) {
        return <div>Album not found</div>
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Thông tin album</h1>
            </div>

            <AlbumForm album={album} />
        </div>
    )
}
