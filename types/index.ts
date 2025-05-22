export interface Artist {
    id: number
    name: string
    bio?: string
    avatar?: string 
    created_at: string 
    updated_at: string 
}

export interface Album {
    id: number
    title: string
    artist: Artist 
    release_date: string 
    cover?: string 
    created_at: string 
    updated_at: string 
}

export interface Track {
    id: number
    title: string
    album?: Album | null
    artist: Artist
    artist_name: string
    file: string
    cover?: string
    lyrics?: string
    duration: number
    created_at: string
    updated_at: string
}

export interface Playlist {
    id: number
    user: User
    title: string
    description?: string
    cover?: string
    tracks: Track[]
    followers: number
    created_at: string
    updated_at: string
}

export interface User {
    id: number
    username: string
    name: string
    status: string
    email: string
    password: string
    avatar?: string
    playlists: Playlist[]
    liked_tracks: Track[]
    created_at: string
    updated_at: string
    type: string
    country: string
}

export interface AuthUser {
    id: number
    username: string
    email: string
    is_superuser: boolean
}

// Analytics Types
export interface DashboardStats {
    totalArtists: number
    totalAlbums: number
    totalTracks: number
    totalPlaylists: number
    totalUsers: number
    totalPlays: number
    recentTracks: {
        id: number
        title: string
        artist: string
        plays: number
    }[]
    topArtists: {
        id: number
        name: string
        plays: number
    }[]
    topAlbums: {
        id: number
        title: string
        artist: string
        plays: number
    }[]
    topPlaylists: {
        id: number
        title: string
        followers: number
    }[]
}

export interface PlayStats {
    date: string
    plays: number
}

export interface UserStats {
    date: string
    newUsers: number
    activeUsers: number
}

export interface AnalyticsOverview {
    totalUsers: number
    totalTracks: number
    totalAlbums: number
    totalPlaylists: number
    totalArtists: number
    totalPlays: number
    recentActivity: {
        type: 'track' | 'album' | 'playlist' | 'user'
        id: number
        title: string
        timestamp: string
    }[]
}
