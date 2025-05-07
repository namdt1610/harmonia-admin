import ArtistForm from '@/modules/artists/components/ArtistForm'
import ArtistTable from '@/modules/artists/components/ArtistTable'

export default function ArtistsPage() {
  return (
    <div className="space-y-8">
      <ArtistForm />
      <ArtistTable />
    </div>
  )
}