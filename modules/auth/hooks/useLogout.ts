'use client'

import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { clearCredentials } from '@/modules/auth/slice'
import { useLogoutMutation } from '@/modules/auth/api'
import Cookies from 'js-cookie'

export const useLogout = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [logout, { isLoading }] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            // Clear Redux store trước
            dispatch(clearCredentials())
            // Gọi API logout
            await logout().unwrap()

            // Client-side cookie cleanup as fallback
            Cookies.remove('access_token', { path: '/' })
            Cookies.remove('refresh_token', { path: '/' })

            // Chuyển hướng về trang login
            router.push('/login')

            // Reload trang để đảm bảo xóa hết cache và state
            window.location.href = '/login'
        } catch (error) {
            console.error('Logout failed:', error)
            // Ngay cả khi server logout thất bại, vẫn xóa hết dữ liệu ở frontend
            dispatch(clearCredentials())

            // Force client-side cookie cleanup even if server logout fails
            Cookies.remove('access_token', { path: '/' })
            Cookies.remove('refresh_token', { path: '/' })

            // Also try removing with different domain options
            Cookies.remove('access_token', { path: '/', domain: 'localhost' })
            Cookies.remove('refresh_token', { path: '/', domain: 'localhost' })
            Cookies.remove('access_token', { path: '/', domain: '' })
            Cookies.remove('refresh_token', { path: '/', domain: '' })

            // Force redirect to login page
            window.location.href = '/login'
        }
    }

    return {
        logout: handleLogout,
        isLoggingOut: isLoading,
    }
}
