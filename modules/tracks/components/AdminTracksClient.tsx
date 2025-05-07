import {
    TrackForm,
    TrackTable,
    UploadTrackForm,
} from '@/modules/tracks/components'

export default function AdminTracksClient() {
    return (
        <div className="space-y-8">
            <UploadTrackForm />
            <TrackTable />
        </div>
    )
}
