import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Playlist } from '@/types'

export const playlistApi = createApi({
    reducerPath: 'playlistApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    tagTypes: ['Playlist'],
    endpoints: (builder) => ({
        getPlaylists: builder.query<Playlist[], void>({
            query: () => 'playlists/',
            providesTags: ['Playlist'],
        }),
        getPlaylist: builder.query<Playlist, number>({
            query: (id) => `playlists/${id}/`,
            providesTags: ['Playlist'],
        }),
        createPlaylist: builder.mutation<Playlist, Partial<Playlist>>({
            query: (body) => ({ url: 'playlists/', method: 'POST', body }),
            invalidatesTags: ['Playlist'],
        }),
        updatePlaylist: builder.mutation<
            Playlist,
            { id: number; data: Partial<Playlist> }
        >({
            query: ({ id, data }) => ({
                url: `playlists/${id}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Playlist'],
        }),
        uploadCover: builder.mutation<Playlist, { id: number; file: File }>({
            query: ({ id, file }) => {
                const formData = new FormData()
                formData.append('cover', file)
                return {
                    url: `playlists/${id}/upload-cover/`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylist: builder.mutation<void, number>({
            query: (id) => ({ url: `playlists/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Playlist'],
        }),
    }),
})

export const {
    useGetPlaylistsQuery,
    useGetPlaylistQuery,
    useCreatePlaylistMutation,
    useUpdatePlaylistMutation,
    useUploadCoverMutation,
    useDeletePlaylistMutation,
} = playlistApi
