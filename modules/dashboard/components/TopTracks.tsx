import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Music, Clock } from 'lucide-react'

export function TopTracks() {
    const tracks = [1, 2, 3, 4, 5].map((i) => ({
        id: i,
        name: `Track Name ${i}`,
        artist: 'Artist Name',
        album: 'Album Name',
        duration: '3:45',
        streams: Math.floor(Math.random() * 900000) + 100000,
    }))

    return (
        <Card className="md:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Top Tracks This Week
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Most streamed songs on the platform
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {tracks.map((track) => (
                        <div
                            key={track.id}
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-800"
                        >
                            <div className="flex-shrink-0 font-bold text-gray-500 w-5">
                                {track.id}
                            </div>
                            <div className="h-10 w-10 rounded bg-gray-800 flex items-center justify-center">
                                <Music className="h-5 w-5 text-spotifyGreen" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-medium">
                                    {track.name}
                                </h4>
                                <p className="text-xs text-gray-400">
                                    {track.artist} • {track.album}
                                </p>
                            </div>
                            <div className="text-xs text-gray-400 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />{' '}
                                {track.duration}
                            </div>
                            <div className="text-xs text-gray-400">
                                {track.streams.toLocaleString()} streams
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
