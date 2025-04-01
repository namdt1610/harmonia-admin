'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { StatCards } from '@/components/dashboard/StatCards'
import { TopTracks } from '@/components/dashboard/TopTracks'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { PopularPlaylists } from '@/components/dashboard/PopularPlaylists'
import { AnalyticsPlaceholder } from '@/components/dashboard/AnalyticsPlaceholder'
import { ReportsPlaceholder } from '@/components/dashboard/ReportsPlaceholder'

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <Button className="bg-spotifyGreen hover:bg-spotifyGreen/90 text-black">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="bg-gray-800">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <StatCards />

                    <div className="grid gap-4 md:grid-cols-3">
                        <TopTracks />
                        <RecentActivity />
                    </div>

                    <PopularPlaylists />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <AnalyticsPlaceholder />
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                    <ReportsPlaceholder />
                </TabsContent>
            </Tabs>
        </div>
    )
}
