import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    Play,
    Pause,
    Heart,
    MoreHorizontal,
    Clock,
    Users,
    User,
} from 'lucide-react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPlaylist } from '@/lib/api/playlists'
import { Skeleton } from '@/components/ui/skeleton'

interface AdminPlaylistDetailsClientProps {
    id: string
}

export default function AdminPlaylistDetailsClient({
    id,
}: AdminPlaylistDetailsClientProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const { data: playlist, isLoading } = useQuery({
        queryKey: ['playlist', id],
        queryFn: () => getPlaylist(id),
    })

    if (isLoading) {
        return (
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex items-start gap-6">
                    <Skeleton className="w-64 h-64 rounded-lg" />
                    <div className="flex-1 space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!playlist) {
        return <div>Playlist not found</div>
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            {/* Header Section */}
            <div className="flex items-start gap-6">
                <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={playlist.coverUrl}
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <h1 className="text-4xl font-bold">{playlist.title}</h1>
                        <p className="text-lg text-muted-foreground">
                            By {playlist.creator}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            size="lg"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="rounded-full"
                        >
                            {isPlaying ? (
                                <Pause className="h-6 w-6" />
                            ) : (
                                <Play className="h-6 w-6" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsLiked(!isLiked)}
                            className={isLiked ? 'text-red-500' : ''}
                        >
                            <Heart className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-6 w-6" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Created</p>
                            <p>{playlist.createdAt}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">
                                Last Updated
                            </p>
                            <p>{playlist.updatedAt}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">
                                Total Tracks
                            </p>
                            <p>{playlist.totalTracks}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p>{playlist.duration}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Stats Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">
                        Playlist Statistics
                    </h2>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Total Plays</span>
                            </div>
                            <p className="text-2xl font-bold">
                                {playlist.plays.toLocaleString()}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Heart className="h-4 w-4" />
                                <span>Likes</span>
                            </div>
                            <p className="text-2xl font-bold">
                                {playlist.likes.toLocaleString()}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>Followers</span>
                            </div>
                            <p className="text-2xl font-bold">
                                {playlist.followers.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tracks Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Tracks</h2>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {playlist.tracks.map((track, index) => (
                            <div
                                key={track.id}
                                className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-muted-foreground w-8">
                                        {index + 1}
                                    </span>
                                    <div className="w-12 h-12 rounded overflow-hidden">
                                        <img
                                            src={track.coverUrl}
                                            alt={track.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {track.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {track.artist}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-muted-foreground">
                                        {track.duration}
                                    </span>
                                    <Button variant="ghost" size="icon">
                                        <Play className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
