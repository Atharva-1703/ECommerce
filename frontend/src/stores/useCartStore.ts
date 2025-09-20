import { create } from "zustand";
import { API_URL } from "@/utils/url";
import toast from "react-hot-toast";
import { Cart } from "@/types";
import { fetcher } from "@/utils/fetcher";

interface CartState {
  cart: Cart[];
  isLoading: boolean;

  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await fetcher(`${API_URL}/api/user/cart`, "GET");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
      set({ cart: data.cart, isLoading: false });
    } catch (err: any) {
      toast.error(err.message);
      set({ isLoading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const res = await fetcher(`${API_URL}/api/user/cart/add`, "POST", {
        productId,
        quantity,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

      set({ cart: data.cart });
      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.message);
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      const res = await fetcher(`${API_URL}/api/user/cart/edit`, "PUT", {
        productId,
        quantity,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update quantity");

      // ✅ Update locally instead of full replace
      // set((state) => ({
      //   cart: state.cart.map((item) =>
      //     item.product === productId ? { ...item, quantity } : item
      //   ),
      // }));
    } catch (err: any) {
      toast.error(err.message);
    }
  },

  removeFromCart: async (cartId) => {
    const { cart } = get();
    try {
      const res = await fetcher(`${API_URL}/api/user/cart/remove`, "DELETE", {
        cartId,
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to remove from cart");
      }
      set({
        cart: cart.filter(({ _id }) => _id !== cartId),
      });
      toast.success("Item removed");
    } catch (err: any) {
      toast.error(err.message);
    }
  },

  clearCart: async () => {
    try {
      const res = await fetcher(`${API_URL}/api/user/cart/clear`, "DELETE");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to clear cart");

      set({ cart: [] });
      toast.success("Cart cleared");
    } catch (err: any) {
      toast.error(err.message);
    }
  },
}));
