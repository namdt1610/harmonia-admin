'use client'
import { useGetArtistsQuery, useDeleteArtistMutation } from '../api'

export function useAdminArtists() {
    const { data = [], isLoading, refetch } = useGetArtistsQuery()
    const [deleteArtist, { isLoading: isDeleting }] = useDeleteArtistMutation()
    return { artists: data, isLoading, deleteArtist, isDeleting, refetch }
}
