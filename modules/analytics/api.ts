import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AnalyticsOverview } from '@/types'

interface DashboardStats {
    totalArtists: number
    totalAlbums: number
    totalTracks: number
    totalPlaylists: number
    totalUsers: number
    totalPlays: number
    recentTracks: {
        id: number
        title: string
        artist: string
        plays: number
    }[]
    topArtists: {
        id: number
        name: string
        plays: number
    }[]
    topAlbums: {
        id: number
        title: string
        artist: string
        plays: number
    }[]
    topPlaylists: {
        id: number
        title: string
        followers: number
    }[]
}

interface PlayStats {
    date: string
    plays: number
}

interface UserStats {
    date: string
    newUsers: number
    activeUsers: number
}

export const analyticsApi = createApi({
    reducerPath: 'analyticsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getOverview: builder.query<AnalyticsOverview, void>({
            query: () => 'overview/',
        }),
        getDashboardStats: builder.query<DashboardStats, void>({
            query: () => 'dashboard/',
        }),
        getPlayStats: builder.query<
            PlayStats[],
            { period: 'day' | 'week' | 'month' | 'year' }
        >({
            query: ({ period }) => `plays/?period=${period}`,
        }),
        getUserStats: builder.query<
            UserStats[],
            { period: 'day' | 'week' | 'month' | 'year' }
        >({
            query: ({ period }) => `users/?period=${period}`,
        }),
    }),
})

export const {
    useGetOverviewQuery,
    useGetDashboardStatsQuery,
    useGetPlayStatsQuery,
    useGetUserStatsQuery,
} = analyticsApi
