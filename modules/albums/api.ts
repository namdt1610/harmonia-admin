import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Album } from '@/types'

interface UpdateAlbumData {
    title: string
    release_date: string
    artist: number
}

export const albumApi = createApi({
    reducerPath: 'albumApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    tagTypes: ['Album'],
    endpoints: (builder) => ({
        getAlbums: builder.query<Album[], void>({
            query: () => 'albums/',
            providesTags: ['Album'],
        }),
        getAlbum: builder.query<Album, number>({
            query: (id) => `albums/${id}/`,
            providesTags: ['Album'],
        }),
        getAlbumsByArtist: builder.query<Album[], number>({
            query: (artistId) => `albums/?artist=${artistId}`,
        }),
        createAlbum: builder.mutation<Album, Partial<Album>>({
            query: (body) => ({ url: 'albums/', method: 'POST', body }),
            invalidatesTags: ['Album'],
        }),
        updateAlbum: builder.mutation<
            Album,
            { id: number; data: UpdateAlbumData }
        >({
            query: ({ id, data }) => ({
                url: `albums/${id}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Album'],
        }),
        uploadCover: builder.mutation<Album, { id: number; file: File }>({
            query: ({ id, file }) => {
                const formData = new FormData()
                formData.append('cover', file)
                return {
                    url: `albums/${id}/upload-cover/`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Album'],
        }),
        deleteAlbum: builder.mutation<void, number>({
            query: (id) => ({ url: `albums/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Album'],
        }),
    }),
})

export const {
    useGetAlbumsQuery,
    useGetAlbumQuery,
    useGetAlbumsByArtistQuery,
    useCreateAlbumMutation,
    useUpdateAlbumMutation,
    useUploadCoverMutation,
    useDeleteAlbumMutation,
} = albumApi
