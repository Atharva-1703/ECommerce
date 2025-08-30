import { create } from "zustand";
import { Product } from "@/types";
import { API_URL } from "@/utils/url";

interface Filters {
  category?: string;
  title?: string;
  sortBy?: string;
  order: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
}

interface SearchState {
  products: Product[];
  brands: string[];
  filters: Filters;
  offset: number;
  loading: boolean;
  // setBrands: (brands: string[]) => void;
  fetchProducts: () => Promise<void>;
  setfilters: (updates: Partial<Filters>) => void;
  incrementOffset: () => void;
  resetFilters: () => void;
  fetchBrands: () => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  products: [],
  brands: [],
  offset: 0,
  filters: {
    order: "asc",
  },
  loading: false,
  incrementOffset: () => {
    set({ offset: get().offset + 10 });
  },
  setfilters: (updates: Partial<Filters>) => {
    set({ filters: { ...get().filters, ...updates } });
  },
  resetFilters: () => {
    set({ filters: {  order: "asc" } });
  },
  fetchProducts: async () => {
    set({ loading: true });
    const { products, filters,offset ,incrementOffset} = get();

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      }
    });

    const response = await fetch(
      `${API_URL}/api/products?${params.toString()}`
    );
    const data = await response.json();
    set({
      products:
        offset > 0 ? [...products, ...data.products] : data.products,
      loading: false,
    });
    incrementOffset();
    
  },
  fetchBrands: async () => {},
}));
