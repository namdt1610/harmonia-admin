import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '@/types'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: 'include',
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => 'users/',
            providesTags: ['User'],
        }),
        getUser: builder.query<User, number>({
            query: (id) => `users/${id}/`,
            providesTags: ['User'],
        }),
        createUser: builder.mutation<User, Partial<User>>({
            query: (body) => ({ url: 'users/', method: 'POST', body }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation<User, { id: number; data: Partial<User> }>(
            {
                query: ({ id, data }) => ({
                    url: `users/${id}/`,
                    method: 'PUT',
                    body: data,
                }),
                invalidatesTags: ['User'],
            }
        ),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({ url: `users/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi
