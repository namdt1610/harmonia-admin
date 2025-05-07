import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Artist } from '@/types'

export const artistApi = createApi({
    reducerPath: 'artistApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    tagTypes: ['Artist'],
    endpoints: (builder) => ({
        getArtists: builder.query<Artist[], void>({
            query: () => 'artists/',
            providesTags: ['Artist'],
        }),
        getArtist: builder.query<Artist, number>({
            query: (id) => `artists/${id}/`,
        }),
        createArtist: builder.mutation<Artist, Partial<Artist>>({
            query: (body) => ({ url: 'artists/', method: 'POST', body }),
            invalidatesTags: [{ type: 'Artist', id: 'LIST' }],
        }),
        updateArtist: builder.mutation<
            Artist,
            { id: number; data: Partial<Artist> }
        >({
            query: ({ id, data }) => ({
                url: `artists/${id}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Artist', id },
            ],
        }),
        deleteArtist: builder.mutation<void, number>({
            query: (id) => ({ url: `artists/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Artist'],
        }),
    }),
})

export const {
    useGetArtistsQuery,
    useGetArtistQuery,
    useCreateArtistMutation,
    useUpdateArtistMutation,
    useDeleteArtistMutation,
} = artistApi
