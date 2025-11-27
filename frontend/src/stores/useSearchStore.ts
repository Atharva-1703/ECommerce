import { create } from "zustand";
import { Product } from "@/types";
import { API_URL } from "@/utils/url";
import { fetcher } from "@/utils/fetcher";

export interface Filters {
  category?: string;
  title?: string;
  sortBy?: string;
  brands?: string[];
  order: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
}

interface ProductFilter {
  brands: string[];
  categories?: string[];
}

interface SearchState {
  products: Product[];
  filters: Filters;
  offset: number;
  productFilter: ProductFilter;
  loading: boolean;
  totalProducts: number;
  suggestions: Partial<Product>[];
  // setBrands: (brands: string[]) => void;
  fetchProducts: (passedfilters?: Filters) => Promise<void>;
  setfilters: (updates: Partial<Filters>) => void;
  incrementOffset: () => void;
  resetFilters: () => void;
  resetProducts: () => void;
  resetProductFilter: () => void;
  resetOffset: () => void;
  fetchProductFilters: (title?: string, category?: string) => Promise<void>;
  fetchSuggestions: (query: string) => Promise<void>;
  clearSuggestions: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  products: [],
  offset: 0,
  totalProducts: 0,
  filters: {
    order: "asc",
  },
  productFilter: {
    brands: [],
    categories: [],
  },
  loading: false,
  suggestions: [],
  incrementOffset: () => {
    set({ offset: get().offset + 10 });
  },
  resetOffset: () => {
    set({ offset: 0 });
  },
  setfilters: (updates: Partial<Filters>) => {
    set({ filters: { ...get().filters, ...updates } });
    const passedFilters = { ...get().filters, ...updates };

    get().fetchProducts(passedFilters);
  },
  resetFilters: () => {
    set({ filters: { order: "asc" } });
  },
  resetProductFilter: () => {
    set({ productFilter: { brands: [], categories: [] } });
  },
  resetProducts: () => {
    set({ products: [] });
  },
  fetchProducts: async (passedfilters) => {
    set({ loading: true });
    const { products, offset, incrementOffset } = get();

    const params = new URLSearchParams();

    Object.entries(passedfilters || get().filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => params.append(key, val));
      } else if (value) {
        params.set(key, value.toString());
      }
    });

    const response = await fetch(
      `${API_URL}/api/products?${params.toString()}&offset=${offset}`
    );
    const data = await response.json();
    set({
      products: offset > 0 ? [...products, ...data.products] : data.products,
      loading: false,
    });
    incrementOffset();
  },
  fetchProductFilters: async (title, category) => {
    const { filters } = get();
    const response = await fetch(
      `${API_URL}/api/products/filters?category=${
        category || filters.category
      }&title=${title || filters.title}`
    );
    const data = await response.json();
    if (data.filters.categories.length == 0) {
      data.filters.categories = [category];
    }
    set({ productFilter: data.filters });
    // set({productFilter})
    set({ totalProducts: data.totalProducts });
  },

  fetchSuggestions: async (query) => {
    const response = await fetcher(
      `${API_URL}/api/products/suggestions?q=${query}`,
      "GET"
    );
    const data = await response.json();
    set({ suggestions: data.results });
  },
  clearSuggestions: () => {
    set({ suggestions: [] });
  },
}));
