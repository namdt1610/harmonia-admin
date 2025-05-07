'use client'
import { useCreateTrackMutation, useUpdateTrackMutation } from '../api'
import type { Track } from '@/types'

export function useTrackForm(track?: Track) {
  const [createTrack, createState] = useCreateTrackMutation()
  const [updateTrack, updateState] = useUpdateTrackMutation()

  const submit = async (data: Partial<Track>) => {
    if (track) {
      return updateTrack({ id: track.id, data })
    }
    return createTrack(data)
  }

  return {
    submit,
    isLoading: createState.isLoading || updateState.isLoading,
    error: createState.error || updateState.error,
  }
}