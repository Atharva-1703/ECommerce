import { create } from "zustand";
import { API_URL } from "@/utils/url";
import toast from "react-hot-toast";
import { Cart } from "@/types";

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
      const res = await fetch(`${API_URL}/api/user/cart`, {
        credentials: "include",
      });
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
      const res = await fetch(`${API_URL}/api/user/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

      set({ cart: data.cart });
      toast.success("Added to cart");
    } catch (err: any) {
      toast.error(err.message);
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      const res = await fetch(`${API_URL}/api/user/cart/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
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
    const {cart}=get();
    try {
      const res = await fetch(`${API_URL}/api/user/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ cartId }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to remove from cart");
      }
      set({
        cart:cart.filter(({_id})=>_id!==cartId)
      })
      toast.success("Item removed");
    } catch (err: any) {
      toast.error(err.message);
    }
  },

  clearCart: async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/cart/clear`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to clear cart");

      set({ cart: [] });
      toast.success("Cart cleared");
    } catch (err: any) {
      toast.error(err.message);
    }
  },
}));
