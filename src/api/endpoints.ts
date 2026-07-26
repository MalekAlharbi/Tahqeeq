import api from "./axios";
import type { LoginData, AuthResponse, RegisterData, ProjectResponse, ProjectData, CategoryResponse } from "../types/api";

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

export const getProjects = async (): Promise<ProjectResponse> => {
    try{
        const response = await api.get('/projects')
        return response.data
    }catch(error){
        throw error
    }
};

export const addProject = async (data: ProjectData) => {
    try{
        const response = await api.post('/projects',data)
        return response.data
    }catch(error){
        throw error
    }
}

export const deleteProject = async (id: Number) => {
    try {
        const response = await api.delete(`/projects/${id}`)
        return response.data
    }catch(error){
        throw error
    }
}

export const updateProject = async (id: Number, data: ProjectData) => {
    try {
        const response = await api.put(`/projects/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getProjectCategories = async (id: number) : Promise<CategoryResponse> => {
    try {
        const response = await api.get(`/project/${id}`)
        return response.data
    }catch(error){
        throw error
    }
}

export const addProjectCategory = async(projectId: number, data: {title: string}) => {
    try{
        const response = await api.post(`/category/${projectId}`, data)
        return response.data
    }catch(error){
        throw error
    }
}