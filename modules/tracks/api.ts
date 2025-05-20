import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Track } from '@/types'

export const trackApi = createApi({
    reducerPath: 'trackApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: 'include',
    }),
    tagTypes: ['Track'],
    endpoints: (builder) => ({
        getTracks: builder.query<Track[], void>({
            query: () => 'tracks/',
            providesTags: ['Track'],
        }),
        getTrack: builder.query<Track, number>({
            query: (id) => `tracks/${id}/`,
            providesTags: ['Track'],
        }),
        createTrack: builder.mutation<Track, Partial<Track>>({
            query: (body) => ({ url: 'tracks/', method: 'POST', body }),
            invalidatesTags: ['Track'],
        }),
        updateTrack: builder.mutation<
            Track,
            { id: number; data: Partial<Track> }
        >({
            query: ({ id, data }) => ({
                url: `tracks/${id}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Track'],
        }),
        uploadCover: builder.mutation<Track, { id: number; file: File }>({
            query: ({ id, file }) => {
                const formData = new FormData()
                formData.append('cover', file)
                return {
                    url: `tracks/${id}/upload-cover/`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Track'],
        }),
        deleteTrack: builder.mutation<void, number>({
            query: (id) => ({ url: `tracks/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Track'],
        }),
    }),
})

export const {
    useGetTracksQuery,
    useGetTrackQuery,
    useCreateTrackMutation,
    useUpdateTrackMutation,
    useUploadCoverMutation,
    useDeleteTrackMutation,
} = trackApi
