import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Playlist } from '@/types'

export const PlaylistsApi = createApi({
  reducerPath: 'PlaylistsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/' }),
  tagTypes: ['Playlist'],
  endpoints: (builder) => ({
    getPlaylists: builder.query<Playlist[], void>({ query: () => 'playlists/' }),
    getPlaylist: builder.query<Playlist, number>({ query: (id) => `playlists/${id}/` }),
    createPlaylist: builder.mutation<Playlist, Partial<Playlist>>({
      query: (body) => ({ url: 'playlists/', method: 'POST', body }),
      invalidatesTags: [{ type: 'Playlist', id: 'LIST' }],
    }),
    updatePlaylist: builder.mutation<Playlist, { id: number; data: Partial<Playlist> }>({
      query: ({ id, data }) => ({ url: `playlists/${id}/`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Playlist', id }],
    }),
    deletePlaylist: builder.mutation<void, number>({
      query: (id) => ({ url: `playlists/${id}/`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [{ type: 'Playlist', id }],
    }),
  }),
})

export const {
  useGetPlaylistsQuery,
  useGetPlaylistQuery,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
} = PlaylistsApi