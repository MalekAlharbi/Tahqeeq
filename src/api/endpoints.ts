import api from "./axios";
import type { LoginData, AuthResponse, RegisterData } from "../types/api";

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    try{
        const response = await api.post('/register', data)
        return response.data
    }catch(error){
        throw error
    }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
    try{
        const response = await api.post('/login', data)
        return response.data
    }catch(error){
        throw error
    }
};

export const logout = async () => {
    try{
        const response = await api.post('/logout')
        return response.data
    }catch(error){
        throw error
    }
}

export const getUser = async (): Promise<AuthResponse> => {
    try{
        const response = await api.get('/user')
        return response.data
    }catch(error){
        throw error
    }
};
