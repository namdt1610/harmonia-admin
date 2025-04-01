'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
    Download,
    Calendar,
    Filter,
    BarChart,
    PieChart,
    LineChart,
    Globe,
    Users,
    Music,
} from 'lucide-react'
import { DateRangePicker } from '@/components/analytics/DateRangePicker'
import { PlatformOverview } from '@/components/analytics/PlatformOverview'
import { AudienceGrowth } from '@/components/analytics/AudienceGrowth'
import { GeographicDistribution } from '@/components/analytics/GeographicDistribution'
import { ContentPerformance } from '@/components/analytics/ContentPerformance'
import { DeviceUsage } from '@/components/analytics/DeviceUsage'
import { ListeningTrends } from '@/components/analytics/ListeningTrends'

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Analytics
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Detailed insights and performance metrics
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <DateRangePicker />
                    <Button
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="bg-gray-800">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="audience">Audience</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    {/* Platform Overview Section */}
                    <PlatformOverview />

                    {/* Charts Grid Section */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <AudienceGrowth />
                        <GeographicDistribution />
                    </div>

                    {/* Content Performance */}
                    <ContentPerformance />
                </TabsContent>

                <TabsContent value="audience" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Demographics Card */}
                        <Card className="md:col-span-2 bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-lg font-medium">
                                    Demographics
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Age and gender distribution
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                                    <div className="flex flex-col items-center text-center">
                                        <PieChart className="h-8 w-8 text-spotifyGreen mb-2" />
                                        <p className="text-gray-400">
                                            Demographics chart will be displayed
                                            here
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Segments Card */}
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-lg font-medium">
                                    User Segments
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    User types and subscriptions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                                    <div className="flex flex-col items-center text-center">
                                        <Users className="h-8 w-8 text-spotifyGreen mb-2" />
                                        <p className="text-gray-400">
                                            User segments chart will be
                                            displayed here
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Retention Analysis */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">
                                Retention Analysis
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                User retention over time by cohort
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                                <div className="flex flex-col items-center text-center">
                                    <LineChart className="h-8 w-8 text-spotifyGreen mb-2" />
                                    <p className="text-gray-400">
                                        Retention chart will be displayed here
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                    {/* Top Performing Genres */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">
                                Top Performing Genres
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Most streamed music genres
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                                <div className="flex flex-col items-center text-center">
                                    <BarChart className="h-8 w-8 text-spotifyGreen mb-2" />
                                    <p className="text-gray-400">
                                        Genre performance chart will be
                                        displayed here
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content Breakdown */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <DeviceUsage />
                        <ListeningTrends />
                    </div>
                </TabsContent>

                <TabsContent value="engagement" className="space-y-4">
                    {/* Engagement Metrics */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">
                                Engagement Metrics
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Session duration, plays per user, playlist adds
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                                <div className="flex flex-col items-center text-center">
                                    <LineChart className="h-8 w-8 text-spotifyGreen mb-2" />
                                    <p className="text-gray-400">
                                        Engagement trends chart will be
                                        displayed here
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Journey */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">
                                User Journey
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                How users navigate through the platform
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                                <div className="flex flex-col items-center text-center">
                                    <Globe className="h-8 w-8 text-spotifyGreen mb-2" />
                                    <p className="text-gray-400">
                                        User journey flow will be displayed here
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
