import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ListMusic, PlusCircle } from 'lucide-react'

export function PopularPlaylists() {
    const playlists = [1, 2, 3, 4].map((i) => ({
        id: i,
        name: `Playlist Name ${i}`,
        tracks: Math.floor(Math.random() * 90) + 10,
        followers: Math.floor(Math.random() * 500) + 100,
    }))

    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Popular Playlists
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Most followed playlists this month
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="bg-gray-800 rounded-lg overflow-hidden group hover:bg-gray-700 transition-colors"
                        >
                            <div className="relative aspect-square bg-gray-800 flex items-center justify-center">
                                <ListMusic className="h-10 w-10 text-spotifyGreen" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Button
                                        size="sm"
                                        variant="default"
                                        className="bg-spotifyGreen hover:bg-spotifyGreen/90 rounded-full h-10 w-10 p-0"
                                    >
                                        <PlusCircle className="h-5 w-5 text-black" />
                                    </Button>
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="font-medium">{playlist.name}</h4>
                                <p className="text-xs text-gray-400 mt-1">
                                    {playlist.tracks} tracks •{' '}
                                    {playlist.followers}k followers
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
