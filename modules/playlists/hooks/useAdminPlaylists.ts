import { useGetPlaylistsQuery, useDeletePlaylistMutation } from '../api'

export function useAdminPlaylists() {
  const { data = [], isLoading, refetch } = useGetPlaylistsQuery()
  const [deletePlaylist, { isLoading: isDeleting }] = useDeletePlaylistMutation()
  return { playlists: data, isLoading, deletePlaylist, isDeleting, refetch }
}