import { User, Product } from "@/types";
import { API_URL } from "@/utils/url";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStoreState {
  user: User | null;
  token: string | null;
  isLogin: boolean;
  favourites: Product[];
  favouritesIds: string[];
  isLoading: boolean;
  errorMessage: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  fetchFavourites: () => Promise<void>;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLogin: false,
      isLoading: false,
      errorMessage: "",
      favourites: [],
      favouritesIds: [],

      login: async (email, password) => {
        set({ isLoading: true, errorMessage: "" });

        const loginPromise = fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }).then(async (res) => {
          const data = await res.json();
          if (!res.ok || !data.success)
            throw new Error(data.message || "Login failed");
          return data;
        });

        try {
          const data = await toast.promise(loginPromise, {
            loading: "Logging in...",
            success: "Login successful",
            error: (err) => err.message,
          });

          set({
            user: data.user,
            token: data.token,
            isLogin: true,
            isLoading: false,
          });
          return true;
        } catch (err: any) {
          set({ errorMessage: err.message, isLoading: false });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });

        const logoutPromise = fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }).then(async (res) => {
          const data = await res.json();
          if (!res.ok || !data.success)
            throw new Error(data.message || "Logout failed");
          return data;
        });

        try {
          await toast.promise(logoutPromise, {
            loading: "Logging out...",
            success: "Logout successful",
            error: (err) => err.message,
          });

          set({
            user: null,
            token: null,
            isLogin: false,
            isLoading: false,
            favourites: [],
            favouritesIds: [],
          });
        } catch {
          set({ isLoading: false });
        }
      },

      register: async (username, email, password) => {
        set({ isLoading: true, errorMessage: "" });

        const registerPromise = fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
          credentials: "include",
        }).then(async (res) => {
          const data = await res.json();
          if (!res.ok || !data.success)
            throw new Error(data.message || "Registration failed");
          return data;
        });

        try {
          await toast.promise(registerPromise, {
            loading: "Registering...",
            success: "Registration successful! Please login.",
            error: (err) => err.message,
          });

          set({ isLoading: false });
          return true;
        } catch (err: any) {
          set({ errorMessage: err.message, isLoading: false });
          return false;
        }
      },

      fetchFavourites: async () => {
        set({ isLoading: true });
        const res = await fetch(`${API_URL}/api/user/favourites`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          toast.error("Failed to fetch favourites\nPlease try again later");
          set({ isLoading: false });
          return;
        }

        const data = await res.json();
        set({ favourites: data.favourites });
        set({ isLoading: false });
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
