import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define Track interface
export interface Track {
      id: string;
      name: string;
      artist: string;
      album: string;
      duration_ms: number;
      popularity: number;
      preview_url?: string;
      explicit: boolean;
      uri: string;
      // Add other properties as needed
}

// Define response interface for pagination
export interface TracksResponse {
      items: Track[];
      total: number;
      offset: number;
      limit: number;
}

// Query params interface
export interface TrackQueryParams {
      limit?: number;
      offset?: number;
      search?: string;
      sort_by?: string;
      sort_order?: 'asc' | 'desc';
}

// Create the API service using RTK Query
export const trackApi = createApi({
      reducerPath: 'trackApi',
      baseQuery: fetchBaseQuery({ 
            baseUrl: '/api/',
            credentials: 'include'
      }),
      tagTypes: ['Track'],
      endpoints: (builder) => ({
            getTracks: builder.query<TracksResponse, TrackQueryParams>({
                  query: (params) => ({
                        url: 'tracks/',
                        params,
                  }),
                  providesTags: (result) => 
                        result
                              ? [
                                          ...result.items.map(({ id }) => ({ type: 'Track' as const, id })),
                                          { type: 'Track', id: 'LIST' },
                                    ]
                              : [{ type: 'Track', id: 'LIST' }],
            }),
            
            getTrackById: builder.query<Track, string>({
                  query: (id) => `tracks/${id}/`,
                  providesTags: (result, error, id) => [{ type: 'Track', id }],
            }),
            
            createTrack: builder.mutation<Track, Partial<Track>>({
                  query: (body) => ({
                        url: 'tracks/',
                        method: 'POST',
                        body,
                  }),
                  invalidatesTags: [{ type: 'Track', id: 'LIST' }],
            }),
            
            updateTrack: builder.mutation<Track, { id: string; body: Partial<Track> }>({
                  query: ({ id, body }) => ({
                        url: `tracks/${id}/`,
                        method: 'PATCH',
                        body,
                  }),
                  invalidatesTags: (result, error, { id }) => [
                        { type: 'Track', id },
                        { type: 'Track', id: 'LIST' },
                  ],
            }),
            
            deleteTrack: builder.mutation<void, string>({
                  query: (id) => ({
                        url: `tracks/${id}/`,
                        method: 'DELETE',
                  }),
                  invalidatesTags: [{ type: 'Track', id: 'LIST' }],
            }),
      }),
});

// Export hooks for usage in components
export const {
      useGetTracksQuery,
      useGetTrackByIdQuery,
      useCreateTrackMutation,
      useUpdateTrackMutation,
      useDeleteTrackMutation,
} = trackApi;