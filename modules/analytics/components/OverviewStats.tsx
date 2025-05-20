'use client'
import { useAnalyticsOverview } from '../hooks/useAnalyticsOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function OverviewStats() {
    const { overview, isLoading } = useAnalyticsOverview()
    if (isLoading)
        return (
            <Card>
                <CardContent>Loading...</CardContent>
            </Card>
        )
    if (!overview) return null
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent>{overview.totalUsers}</CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Tracks</CardTitle>
                </CardHeader>
                <CardContent>{overview.totalTracks}</CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Albums</CardTitle>
                </CardHeader>
                <CardContent>{overview.totalAlbums}</CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Playlists</CardTitle>
                </CardHeader>
                <CardContent>{overview.totalPlaylists}</CardContent>
            </Card>
        </div>
    )
}
