'use client'
import { useGetTracksQuery, useDeleteTrackMutation } from '../api'

export function useAdminTracks() {
    const { data = [], isLoading, refetch } = useGetTracksQuery()
    const [deleteTrack, { isLoading: isDeleting }] = useDeleteTrackMutation()
    return { tracks: data, isLoading, deleteTrack, isDeleting, refetch }
}
