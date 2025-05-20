'use client'

import { useEffect } from 'react'
import { useRefreshMutation } from '@/modules/auth/api'
import { updateToken } from '@/modules/auth/slice'
import { useDispatch } from 'react-redux'

let isRefreshing = false
let refreshPromise: Promise<any> | null = null

export function AuthRefresh() {
    const [refresh] = useRefreshMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        // Add a response interceptor to detect 401 errors
        const originalFetch = window.fetch
        window.fetch = async function (...args) {
            try {
                const response = await originalFetch.apply(this, args)

                // If response is 401 Unauthorized, try to refresh the token
                if (response.status === 401) {
                    // Make sure we only refresh once even if multiple requests fail
                    if (!isRefreshing) {
                        isRefreshing = true
                        refreshPromise = refresh()
                            .unwrap()
                            .then((data) => {
                                // Update the token in Redux store
                                dispatch(updateToken(data.access))
                                return data.access
                            })
                            .catch((err) => {
                                console.error('Token refresh failed:', err)
                                // Redirect to login if refresh fails
                                window.location.href = 'http://localhost:3000/login'
                                return null
                            })
                            .finally(() => {
                                isRefreshing = false
                                refreshPromise = null
                            })
                    }

                    // Wait for the refresh to complete
                    const newToken = await refreshPromise
                    if (newToken) {
                        // Clone the original request with the new token
                        const url = args[0]
                        const config = args[1] || {}

                        // Add the new token to the headers
                        const newConfig = {
                            ...config,
                            headers: {
                                ...config.headers,
                                Authorization: `Bearer ${newToken}`,
                            },
                        }

                        // Retry the original request with the new token
                        return originalFetch(url, newConfig)
                    }
                }

                return response
            } catch (error) {
                console.error('Fetch error:', error)
                throw error
            }
        }

        return () => {
            // Restore original fetch when the component unmounts
            window.fetch = originalFetch
        }
    }, [refresh, dispatch])

    return null
}
