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

export interface ProjectResponse{
    projects: {
        id: number,
        title: string,
        description: string,
    }[]
}

export interface ProjectData{
    title: string,
    description: string,
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    category_id?: number;
    position?: number;
    assigned_to?: {
        id: number;
        name: string;
        email: string;
    } | string;
}

export interface Category {
    id: number;
    title: string;
    position: number;
    tasks?: Task[];
}

export interface CategoryResponse {
    categories: Category[];
}