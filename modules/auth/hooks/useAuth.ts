import { useLoginMutation, useLogoutMutation, useGetMeQuery } from '../api'

export function useAuth() {
  const [login, loginState] = useLoginMutation()
  const [logout, logoutState] = useLogoutMutation()
  const { data: me, isLoading } = useGetMeQuery()
  return { login, loginState, logout, logoutState, me, isLoading }
}