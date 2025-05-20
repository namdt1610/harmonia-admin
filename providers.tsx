'use client'

import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthRefresh } from '@/middleware/auth-refresh'
import { ThemeProvider } from '@/components/ui/theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <AuthRefresh />
                {children}
            </ThemeProvider>
        </Provider>
    )
}
