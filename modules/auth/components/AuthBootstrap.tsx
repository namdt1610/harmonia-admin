'use client'
import { useSilentLogin } from '../hooks/useSilentLogin'
import { useGlobalAuth } from '../hooks/useGlobalAuth'

export function AuthBootstrap() {
    useGlobalAuth()
    useSilentLogin()
    return null
}
