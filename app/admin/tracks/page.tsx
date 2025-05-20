'use client'

import { useGetTracksQuery } from '@/modules/tracks/api'
import { TrackDataTable } from '@/modules/tracks/components/TrackDataTable'
import { TrackCreateModal } from '@/modules/tracks/components/TrackCreateModal'

export default function TracksPage() {
    const { data: tracks, isLoading } = useGetTracksQuery()

    if (isLoading) {
        return <div>Đang tải...</div>
    }

    if (!tracks) {
        return <div>Không có dữ liệu</div>
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Quản lý bài hát</h1>
                <TrackCreateModal />
            </div>
            <TrackDataTable data={tracks} />
        </div>
    )
}
