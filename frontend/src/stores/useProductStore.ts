import { Product } from "@/types";
import { API_URL } from "@/utils/url";
import { create } from "zustand";

interface ProductsState {
  latest: Product[];
  highDiscount: Product[];
  TopRated: Product[];
  productData: Product | null;
  loading: boolean;
  fetchLatest: () => Promise<void>;
  fetchHighDiscount: () => Promise<void>;
  fetchTopRated: () => Promise<void>;
  fetchProductData: (id: string) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  latest: [],
  highDiscount: [],
  TopRated: [],
  productData: null,
  loading: false,
  fetchLatest: async () => {
    set({ loading: true });
    const response = await fetch(
      `${API_URL}/api/products?sortBy=createdAt&order=desc`
    );
    const data = await response.json();
    set({ latest: data.products, loading: false });
  },
  fetchHighDiscount: async () => {
    set({ loading: true });
    const response = await fetch(
      `${API_URL}/api/products?sortBy=discountPercentage&order=desc`
    );
    const data = await response.json();
    set({ highDiscount: data.products, loading: false });
  },
  fetchTopRated: async () => {
    set({ loading: true });
    const response = await fetch(
      `${API_URL}/api/products?sortBy=rating&order=desc`
    );
    const data = await response.json();
    set({ TopRated: data.products, loading: false });
  },
  fetchProductData: async (id: string) => {
    set({ loading: true });
    const response = await fetch(`${API_URL}/api/products/${id}`);
    const data = await response.json();
    set({ productData: data.product, loading: false });
  },
}));
