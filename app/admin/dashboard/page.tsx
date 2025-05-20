'use client'

import { useGetDashboardStatsQuery } from '@/modules/analytics/api'
import { useAnalyticsOverview } from '@/modules/analytics/hooks/useAnalyticsOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Music, Disc, ListMusic, Play, UserPlus } from 'lucide-react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    useGetPlayStatsQuery,
    useGetUserStatsQuery,
} from '@/modules/analytics/api'
import { format } from 'date-fns'

export default function DashboardPage() {
    const { data: stats, isLoading } = useGetDashboardStatsQuery()
    const { overview, isLoading: isLoadingOverview } = useAnalyticsOverview()
    const [timeRange, setTimeRange] = useState<
        'day' | 'week' | 'month' | 'year'
    >('week')
    const { data: playStats } = useGetPlayStatsQuery({ period: timeRange })
    const { data: userStats } = useGetUserStatsQuery({ period: timeRange })
    
    // Filter out invalid data points
    const validPlayStats =
        playStats?.filter((item) => {
            const date = new Date(item.date)
            return !isNaN(date.getTime())
        }) || []

    const validUserStats =
        userStats?.filter((item) => {
            const date = new Date(item.date)
            return !isNaN(date.getTime())
        }) || []

    if (isLoading) {
        return <div>Đang tải...</div>
    }

    if (!stats) {
        return <div>Không có dữ liệu</div>
    }

    if (!overview) {
        return <div>Không có dữ liệu</div>
    }

    const formatDate = (date: string) => {
        try {
            const parsedDate = new Date(date)

            // Check if the date is valid
            if (isNaN(parsedDate.getTime())) {
                console.warn('Invalid date value:', date)
                return 'Invalid date'
            }

            switch (timeRange) {
                case 'day':
                    return format(parsedDate, 'HH:mm')
                case 'week':
                    return format(parsedDate, 'EEE')
                case 'month':
                    return format(parsedDate, 'dd/MM')
                case 'year':
                    return format(parsedDate, 'MM/yyyy')
                default:
                    return date
            }
        } catch (error) {
            console.error('Error formatting date:', error)
            return 'Error'
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Bảng điều khiển</h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số nghệ sĩ
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {overview.totalArtists}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số album
                        </CardTitle>
                        <Disc className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {overview.totalAlbums}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số bài hát
                        </CardTitle>
                        <Music className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {overview.totalTracks}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số playlist
                        </CardTitle>
                        <ListMusic className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {overview.totalPlaylists}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số người dùng
                        </CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {overview.totalUsers}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số lượt phát
                        </CardTitle>
                        <Play className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {overview.totalPlays}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Time Range Selector */}
            <div className="flex justify-end mb-6">
                <div className="flex space-x-2">
                    <Button
                        variant={timeRange === 'day' ? 'default' : 'outline'}
                        onClick={() => setTimeRange('day')}
                    >
                        Ngày
                    </Button>
                    <Button
                        variant={timeRange === 'week' ? 'default' : 'outline'}
                        onClick={() => setTimeRange('week')}
                    >
                        Tuần
                    </Button>
                    <Button
                        variant={timeRange === 'month' ? 'default' : 'outline'}
                        onClick={() => setTimeRange('month')}
                    >
                        Tháng
                    </Button>
                    <Button
                        variant={timeRange === 'year' ? 'default' : 'outline'}
                        onClick={() => setTimeRange('year')}
                    >
                        Năm
                    </Button>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Thống kê lượt phát</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={validPlayStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formatDate}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        labelFormatter={(value) => {
                                            try {
                                                return formatDate(value)
                                            } catch (error) {
                                                console.error(
                                                    'Error formatting tooltip label:',
                                                    error
                                                )
                                                return 'Invalid date'
                                            }
                                        }}
                                        formatter={(value: number) => [
                                            value,
                                            'Lượt phát',
                                        ]}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="plays"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Thống kê người dùng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={validUserStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formatDate}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        labelFormatter={(value) => {
                                            try {
                                                return formatDate(value)
                                            } catch (error) {
                                                console.error(
                                                    'Error formatting tooltip label:',
                                                    error
                                                )
                                                return 'Invalid date'
                                            }
                                        }}
                                        formatter={(value: number) => [
                                            value,
                                            'Người dùng',
                                        ]}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="newUsers"
                                        stroke="#82ca9d"
                                        strokeWidth={2}
                                        name="Người dùng mới"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="activeUsers"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                        name="Người dùng hoạt động"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Nghệ sĩ nổi bật</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.topArtists.map((artist) => (
                                <div
                                    key={artist.id}
                                    className="flex items-center justify-between"
                                >
                                    <span className="font-medium">
                                        {artist.name}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {artist.plays} lượt phát
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Album nổi bật</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.topAlbums.map((album) => (
                                <div
                                    key={album.id}
                                    className="flex items-center justify-between"
                                >
                                    <span className="font-medium">
                                        {album.title}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {album.plays} lượt phát
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Playlist nổi bật</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.topPlaylists.map((playlist) => (
                                <div
                                    key={playlist.id}
                                    className="flex items-center justify-between"
                                >
                                    <span className="font-medium">
                                        {playlist.title}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {playlist.followers} người theo dõi
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
