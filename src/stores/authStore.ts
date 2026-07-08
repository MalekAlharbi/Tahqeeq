import { create } from "zustand";
import { persist } from 'zustand/middleware';
import type { AuthState } from "../types/api";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,

      setUser: (user) => {
        set(() => ({
          user,
          isAuth: !!user,
        }));
      },

      zLogout: () => {
        set(() => ({
          user: null,
          isAuth: false,
        }));
      },
    }), 
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;