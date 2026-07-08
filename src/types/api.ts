export interface User {
    id: number,
    name: string,
    email: string,
    image: string,
    created_at: string,
    updated_at: string
}

export interface AuthResponse {
    message: string,
    user: User
}

export interface LoginData {
    email: string,
    password: string
}

export interface RegisterData {
    name: string,
    email: string,
    password: string
}

export interface AuthState {
    user: User | null,
    isAuth: boolean,

    setUser: (user: User | null) => void,
    zLogout: () => void    
}