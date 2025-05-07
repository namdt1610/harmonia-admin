import { useGetUsersQuery, useDeleteUserMutation } from '../api'

export function useAdminUsers() {
  const { data = [], isLoading, refetch } = useGetUsersQuery()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  return { users: data, isLoading, deleteUser, isDeleting, refetch }
}