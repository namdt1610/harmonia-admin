'use client'

import { useGetPlaylistsQuery } from '@/modules/playlists/api'
import { PlaylistDataTable } from '@/modules/playlists/components/PlaylistDataTable'
import { PlaylistCreateModal } from '@/modules/playlists/components/PlaylistCreateModal'

export default function PlaylistsPage() {
    const { data: playlists, isLoading } = useGetPlaylistsQuery()

    if (isLoading) {
        return <div>Đang tải...</div>
    }

    if (!playlists) {
        return <div>Không có dữ liệu</div>
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Quản lý playlist</h1>
                <PlaylistCreateModal />
            </div>
            <PlaylistDataTable data={playlists} />
        </div>
    )
}
