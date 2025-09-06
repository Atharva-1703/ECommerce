import { User } from "@/types";
import { API_URL } from "@/utils/url";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStoreState {
  user: User | null;
  token: string | null;
  isLogin: boolean;
  isLoading: boolean;
  errorMessage: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLogin: false,
      isLoading: false,
      errorMessage: "",

      login: async (email, password) => {
        set({ isLoading: true, errorMessage: "" });
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
          set({
            user: data.user,
            token: data.token,
            isLogin: true,
            isLoading: false,
          });
          toast.success("Login successful");
        } else {
          set({
            errorMessage: data.message || "Login failed",
            isLoading: false,
          });
          toast.error(data.message || "Login failed");
        }
      },

      logout: () => {
        set({ user: null, token: null, isLogin: false });
      },

      register: async (username, email, password) => {
        set({ isLoading: true, errorMessage: "" });
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();

        if (res.ok) {
          set({
            user: data.user,
            token: data.token,
            isLogin: true,
            isLoading: false,
          });
          toast.success("Register successful");
        } else {
          set({
            errorMessage: data.message || "Register failed",
            isLoading: false,
          });
          toast.error(data.message || "Register failed");
        }
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLogin: state.isLogin,
      }),
    }
  )
);
