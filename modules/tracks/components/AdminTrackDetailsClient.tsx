import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Play, Pause, Heart, MoreHorizontal, Clock, User } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTrack } from '@/lib/api/tracks'
import { Skeleton } from '@/components/ui/skeleton'

interface AdminTrackDetailsClientProps {
    id: string
}

export default function AdminTrackDetailsClient({
    id,
}: AdminTrackDetailsClientProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const { data: track, isLoading } = useQuery({
        queryKey: ['track', id],
        queryFn: () => getTrack(id),
    })

    if (isLoading) {
        return (
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex items-start gap-6">
                    <Skeleton className="w-48 h-48 rounded-lg" />
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

    if (!track) {
        return <div>Track not found</div>
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            {/* Header Section */}
            <div className="flex items-start gap-6">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <h1 className="text-4xl font-bold">{track.title}</h1>
                        <p className="text-lg text-muted-foreground">
                            {track.artist}
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
                            <p className="text-muted-foreground">Album</p>
                            <p>{track.album}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">
                                Release Date
                            </p>
                            <p>{track.releaseDate}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Genre</p>
                            <p>{track.genre}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p>{track.duration}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Stats Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Track Statistics</h2>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Total Plays</span>
                            </div>
                            <p className="text-2xl font-bold">
                                {track.plays.toLocaleString()}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Heart className="h-4 w-4" />
                                <span>Likes</span>
                            </div>
                            <p className="text-2xl font-bold">
                                {track.likes.toLocaleString()}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>Unique Listeners</span>
                            </div>
                            <p className="text-2xl font-bold">
                                {(track.plays * 0.7).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
