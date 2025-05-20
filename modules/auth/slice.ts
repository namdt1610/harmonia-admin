import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserData {
    id: number
    username: string
    email: string
    is_superuser: boolean
}

interface AuthState {
    user: UserData | null
    accessToken: string | null
    isLoggedIn: boolean
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ accessToken: string; user: UserData }>
        ) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isLoggedIn = true
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        clearCredentials: (state) => {
            state.user = null
            state.accessToken = null
            state.isLoggedIn = false
        },
    },
})

export const { setCredentials, updateToken, clearCredentials } =
    authSlice.actions

export default authSlice.reducer
