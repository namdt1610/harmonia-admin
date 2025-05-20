import { configureStore } from '@reduxjs/toolkit'
import { trackApi } from '@/modules/tracks/api'
import { artistApi } from '@/modules/artists/api'
import { albumApi } from '@/modules/albums/api'
import { analyticsApi } from '@/modules/analytics/api'
import { userApi } from '@/modules/users/api'
import { authApi } from '@/modules/auth/api'
import authReducer from '@/modules/auth/slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [trackApi.reducerPath]: trackApi.reducer,
        [artistApi.reducerPath]: artistApi.reducer,
        [albumApi.reducerPath]: albumApi.reducer,
        [analyticsApi.reducerPath]: analyticsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            trackApi.middleware,
            artistApi.middleware,
            albumApi.middleware,
            analyticsApi.middleware,
            userApi.middleware,
            authApi.middleware
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
