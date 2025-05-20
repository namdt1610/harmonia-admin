'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation, useLogoutMutation } from '@/modules/auth/api'
import { setCredentials, clearCredentials } from '@/modules/auth/slice'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store'

export const useAuth = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { user, isLoggedIn, accessToken } = useSelector(
        (state: RootState) => state.auth
    )

    const [login, { isLoading: isLoginLoading }] = useLoginMutation()
    const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation()

    const handleLogin = async (username_or_email: string, password: string) => {
        try {
            const result = await login({ username_or_email, password }).unwrap()

            dispatch(
                setCredentials({
                    user: result.user,
                    accessToken: result.access,
                })
            )

            router.push('/admin/dashboard')
            return result
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    }

    const handleLogout = async () => {
        try {
            await logout().unwrap()
            dispatch(clearCredentials())
            router.push('/login')
        } catch (error) {
            console.error('Logout failed:', error)
            // Even if server logout fails, clear credentials from frontend
            dispatch(clearCredentials())
            router.push('/login')
        }
    }

    return {
        user,
        isLoggedIn,
        accessToken,
        login: handleLogin,
        logout: handleLogout,
        isLoginLoading,
        isLogoutLoading,
    }
}
