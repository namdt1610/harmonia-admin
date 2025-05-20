'use client'
import ArtistCreateModal from '@/modules/artists/components/ArtistCreateModal'
import ArtistDataTable from '@/modules/artists/components/ArtistDataTable'

export default function ArtistsPage() {
    return (
        <div className="space-y-8">
            <ArtistCreateModal />
            <ArtistDataTable />
        </div>
    )
}
