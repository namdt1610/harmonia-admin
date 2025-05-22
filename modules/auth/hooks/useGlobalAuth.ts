import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials, clearCredentials } from '@/modules/auth/slice'
import { useGetMeQuery } from '@/modules/auth/api'

// This hook is used to set the user and access token in the Redux store
export function useGlobalAuth() {
    const dispatch = useDispatch()
    const { data: user, error } = useGetMeQuery()

    useEffect(() => {
        if (user) {
            dispatch(setCredentials({ user, accessToken: '' }))
        } else if (error) {
            dispatch(clearCredentials())
        }
    }, [user, error, dispatch])
}
