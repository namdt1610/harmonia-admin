'use client'

import { useGetAlbumsQuery } from '@/modules/albums/api'
import { AlbumDataTable } from '@/modules/albums/components/AlbumDataTable'
import { AlbumCreateModal } from '@/modules/albums/components/AlbumCreateModal'

export default function AlbumsPage() {
    const { data: albums, isLoading } = useGetAlbumsQuery()

    if (isLoading) {
        return <div>Đang tải...</div>
    }

    if (!albums) {
        return <div>Không có dữ liệu</div>
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Quản lý album</h1>
                <AlbumCreateModal />
            </div>
            <AlbumDataTable data={albums} />
        </div>
    )
}
