import { configureStore } from '@reduxjs/toolkit'
import { trackApi } from '@/modules/tracks/api'
import { artistApi } from '@/modules/artists/api'
import { albumApi } from '@/modules/albums/api'

export const store = configureStore({
    reducer: {
        [trackApi.reducerPath]: trackApi.reducer,
        [artistApi.reducerPath]: artistApi.reducer,
        [albumApi.reducerPath]: albumApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            trackApi.middleware,
            artistApi.middleware,
            albumApi.middleware
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
