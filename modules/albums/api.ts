import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Album } from '@/types'

export const albumApi = createApi({
    reducerPath: 'albumApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/' }),
    tagTypes: ['Album'],
    endpoints: (builder) => ({
        getAlbums: builder.query<Album[], void>({ query: () => 'albums/' }),
        getAlbum: builder.query<Album, number>({
            query: (id) => `albums/${id}/`,
        }),
        getAlbumsByArtist: builder.query<Album[], number>({
            query: (artistId) => `albums/?artist=${artistId}`,
        }),
        createAlbum: builder.mutation<Album, Partial<Album>>({
            query: (body) => ({ url: 'albums/', method: 'POST', body }),
            invalidatesTags: [{ type: 'Album', id: 'LIST' }],
        }),
        updateAlbum: builder.mutation<
            Album,
            { id: number; data: Partial<Album> }
        >({
            query: ({ id, data }) => ({
                url: `albums/${id}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Album', id }],
        }),
        deleteAlbum: builder.mutation<void, number>({
            query: (id) => ({ url: `albums/${id}/`, method: 'DELETE' }),
            invalidatesTags: (result, error, id) => [{ type: 'Album', id }],
        }),
    }),
})

export const {
    useGetAlbumsQuery,
    useGetAlbumQuery,
    useGetAlbumsByArtistQuery,
    useCreateAlbumMutation,
    useUpdateAlbumMutation,
    useDeleteAlbumMutation,
} = albumApi
