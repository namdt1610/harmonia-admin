import { useGetAlbumsQuery, useDeleteAlbumMutation } from '../api'

export function useAdminAlbums() {
  const { data = [], isLoading, refetch } = useGetAlbumsQuery()
  const [deleteAlbum, { isLoading: isDeleting }] = useDeleteAlbumMutation()
  return { albums: data, isLoading, deleteAlbum, isDeleting, refetch }
}