import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AuthUser } from '@/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/' }),
  endpoints: (builder) => ({
    login: builder.mutation<{ user: AuthUser; access: string; refresh: string }, { username: string; password: string }>({
      query: (body) => ({ url: 'login/', method: 'POST', body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: 'logout/', method: 'POST' }),
    }),
    getMe: builder.query<AuthUser, void>({
      query: () => 'me/',
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi