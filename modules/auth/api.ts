import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AuthUser } from '@/types'
import { RootState } from '@/store'

interface LoginRequest {
    username_or_email: string
    password: string
}

interface UserData {
    id: number
    username: string
    email: string
    is_superuser: boolean
}

interface LoginResponse {
    user: UserData
    access: string
}

interface RefreshTokenResponse {
    access: string
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/auth/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth?.accessToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
        credentials: 'include', // This is important to include cookies
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login/',
                method: 'POST',
                body: credentials,
            }),
        }),
        refresh: builder.mutation<RefreshTokenResponse, void>({
            query: () => ({
                url: 'token/refresh/',
                method: 'POST',
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'logout/',
                method: 'POST',
            }),
        }),
        getMe: builder.query<AuthUser, void>({
            query: () => 'me/',
        }),
    }),
})

export const {
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation,
    useGetMeQuery,
} = authApi
