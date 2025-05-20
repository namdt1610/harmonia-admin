import { useGetUsersQuery, useDeleteUserMutation } from '../api'

export function useAdminUsers() {
    const { data: users = [], isLoading } = useGetUsersQuery()
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

    return {
        users,
        isLoading,
        deleteUser,
        isDeleting,
    }
}
