import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '@/types'

export const UsersApi = createApi({
  reducerPath: 'UsersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({ query: () => 'users/' }),
    getUser: builder.query<User, number>({ query: (id) => `users/${id}/` }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({ url: 'users/', method: 'POST', body }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation<User, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({ url: `users/${id}/`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({ url: `users/${id}/`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UsersApi