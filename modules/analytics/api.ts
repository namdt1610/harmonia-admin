import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AnalyticsOverview } from '@/types'

export const adminAnalyticsApi = createApi({
  reducerPath: 'adminAnalyticsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/' }),
  endpoints: (builder) => ({
    getOverview: builder.query<AnalyticsOverview, void>({ query: () => 'analytics/overview/' }),
    // ...other analytics endpoints
  }),
})

export const {
  useGetOverviewQuery,
} = adminAnalyticsApi