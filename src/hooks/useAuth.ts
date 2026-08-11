import useAuthStore from "../stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, register, updateUser } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const { setUser, zLogout } = useAuthStore();

    // Register
    const registerMutation = useMutation({
        mutationKey: ["user"],
        mutationFn: register,
        onSuccess: (data) => {
            setUser(data.user)
            navigate("/")
        },
        onError: (err) => {
            console.log(err)
        }
    })

    // Login
    const loginMutation = useMutation({
        mutationKey: ["user"],
        mutationFn: login,
        onSuccess: (data) => {
            setUser(data.user)
            navigate("/")
        },
        onError: (err) => {
            console.log(err)
        }
    })

    // Logout
    const logoutMutation = useMutation({
        mutationKey: ["user"],
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear()
            cookieStore.delete('token');
            zLogout()
            navigate("/")
        },
        onError: (err) => {
            console.log(err)
        }
    })

    // Update User
    const updateUserMutation = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: (data: { id: number; name: string; email: string }) =>
            updateUser(data.id, { name: data.name, email: data.email }),
        onSuccess: (data) => {
            if (data?.user) {
                setUser(data.user);
            } else if (data) {
                setUser(data);
            }
        },
        onError: (err) => {
            console.error("Error updating user", err);
        }
    })

    return {
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        register: registerMutation,
        updateUser: updateUserMutation,
        isLoggingIn: loginMutation.isPending,
    }
}