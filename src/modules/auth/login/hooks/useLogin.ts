import { useLoginMutation } from '@/modules/auth/api'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/modules/auth/slice'

export const useLogin = () => {
    const [login, { isLoading, isError, isSuccess }] = useLoginMutation()
    const dispatch = useDispatch()

    const handleLogin = async (username_or_email: string, password: string) => {
        try {
            const result = await login({ username_or_email, password }).unwrap()
            dispatch(
                setCredentials({
                    accessToken: result.access,
                    user: result.user,
                })
            )
            sessionStorage.setItem('access_token', result.access)
            return result
        } catch (error: any) {
            throw error
        }
    }

    return {
        handleLogin,
        isLoading,
        isError,
        isSuccess,
    }
}
