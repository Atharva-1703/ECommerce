import { User, Product, address } from "@/types";
import { fetcher } from "@/utils/fetcher";
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
  isRehydrated: boolean;

  setRehydrated: () => void;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;

  fetchFavourites: () => Promise<void>;
  addFavourite: (id: string) => Promise<void>;
  removeFavourite: (id: string) => Promise<void>;

  addAddress: (address: address) => Promise<void>;
  removeAddress: (addressId: string) => Promise<void>;

  clearStore: () => void;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLogin: false,
      isLoading: false,
      errorMessage: "",
      favourites: [],
      favouritesIds: [],
      isRehydrated: false,

      setRehydrated: () => {
        set({ isRehydrated: true });
      },

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
            favouritesIds: data.favourites,
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
        const res = await fetcher(`${API_URL}/api/user/favourites`, "GET");
        if (!res.ok) {
          toast.error("Failed to fetch favourites\nPlease try again later");
          set({ isLoading: false });
          return;
        }

        const data = await res.json();
        set({ favourites: data.favourites });
        set({ isLoading: false });
      },

      addFavourite: async (id) => {
        set({ isLoading: true });
        const res = await fetcher(
          `${API_URL}/api/user/favourite/add/${id}`,
          "PUT"
        );
        const data = await res.json();
        if (!data.success) {
          toast.error("Failed to add favourite\nPlease try again later");
          set({ isLoading: false });
          return;
        }
        const favouritesIds = get().favouritesIds;
        set({ favouritesIds: [...favouritesIds, id] });
        set({ isLoading: false });
      },

      removeFavourite: async (id) => {
        const { favourites, favouritesIds } = get();
        set({ isLoading: true });
        const res = await fetcher(
          `${API_URL}/api/user/favourite/remove/${id}`,
          "DELETE"
        );
        const data = await res.json();
        if (!data.success) {
          toast.error("Failed to remove favourite\nPlease try again later");
          set({ isLoading: false });
          return;
        }
        set({ favouritesIds: favouritesIds.filter((fId) => fId !== id) });
        set({ isLoading: false });
        if (favourites.length) {
          set({ favourites: favourites.filter((f) => f._id !== id) });
        }
      },

      addAddress: async (address) => {
        const { user } = get();
        set({ isLoading: true });
        const res = await fetcher(`${API_URL}/api/user/address/add`, "PUT", {
          address,
        });
        const data = await res.json();
        if (!data.success) {
          toast.error(data.message);
          set({ isLoading: false });
          return;
        }
        set({
          user: {
            ...user!,
            address: data.address,
          },
        });

        toast.success("Address added successfully");

        set({ isLoading: false });
      },

      removeAddress: async (addressID) => {
        const { user } = get();

        set({ isLoading: true });
        const res = await fetcher(`${API_URL}/api/user/address/remove`, "PUT", {
          addressID,
        });
        const data = await res.json();
        if (!data.success) {
          toast.error(data.message);
          set({ isLoading: false });
          return;
        }
        set({
          user: {
            ...user!,
            address: user!.address?.filter((a) => a._id !== addressID),
          },
        });
        toast.success("Address removed successfully");
        set({ isLoading: false });
      },

      clearStore: () => {
        set({
          user: null,
          token: null,
          isLogin: false,
          favourites: [],
          favouritesIds: [],
          isLoading: false,
          errorMessage: "",
        });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLogin: state.isLogin,
        favouritesIds: state.favouritesIds,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setRehydrated();
      },
    }
  )
);
