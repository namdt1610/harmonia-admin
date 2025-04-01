import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from './slices/tracksSlice';
import usersReducer from './slices/usersSlice';
import authReducer from './slices/authSlice';
import { spotifyApi } from './api/spotifyApi';

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    users: usersReducer,
    auth: authReducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;