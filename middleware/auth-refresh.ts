'use client'

import { useEffect } from 'react'
import { useRefreshMutation } from '@/modules/auth/api'
import { updateToken } from '@/modules/auth/slice'
import { useDispatch } from 'react-redux'

let isRefreshing = false
let refreshPromise: Promise<any> | null = null
let isLoggedOut = false
let refreshTimeout: NodeJS.Timeout | null = null

// Reset logout state when component mounts
export function resetLogoutState() {
    isLoggedOut = false
    if (refreshTimeout) {
        clearTimeout(refreshTimeout)
        refreshTimeout = null
    }
}

export function AuthRefresh() {
    const [refresh] = useRefreshMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        // Reset logout state when component mounts
        resetLogoutState()

        // Add a response interceptor to detect 401 errors
        const originalFetch = window.fetch
        window.fetch = async function (...args) {
            try {
                // Skip refresh for logout requests
                if (args[0]?.toString().includes('/logout')) {
                    console.log('Logout request detected, skipping refresh')
                    return originalFetch.apply(this, args)
                }

                const response = await originalFetch.apply(this, args)

                // If response is 401 Unauthorized, try to refresh the token
                if (response.status === 401 && !isLoggedOut) {
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
                                isLoggedOut = true
                                // Clear any existing refresh timeout
                                if (refreshTimeout) {
                                    clearTimeout(refreshTimeout)
                                    refreshTimeout = null
                                }
                                // Redirect to login if refresh fails
                                window.location.href =
                                    'http://localhost:3000/login'
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
            // Clear any existing refresh timeout
            if (refreshTimeout) {
                clearTimeout(refreshTimeout)
                refreshTimeout = null
            }
        }
    }, [refresh, dispatch])

    return null
}
