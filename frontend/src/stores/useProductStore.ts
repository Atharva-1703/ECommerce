import { Product, ProductReview } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { API_URL } from "@/utils/url";
import toast from "react-hot-toast";
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

  addReview: (review: Partial<ProductReview>) => Promise<void>;
  updateReview: (
    reviewId: string,
    review: Partial<ProductReview>
  ) => Promise<void>;
  removeReview: (reviewId: string) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
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
  fetchProductData: async (id) => {
    set({ loading: true });
    const response = await fetch(`${API_URL}/api/products/${id}`);
    const data = await response.json();
    set({ productData: data.product, loading: false });
  },
  addReview: async (review) => {
    const product = get().productData;
    if (!product) {
      toast.error("Product not found");
      return;
    }
    if (!review.rating) {
      toast.error("Rating is required");
      return;
    }
    if (review.rating < 1 || review.rating > 5) {
      toast.error("Rating must be between 1 and 5");
    }
    // return;
    set({ loading: true });
    const res = await fetcher(`${API_URL}/api/reviews/add`, "POST", {
      ...review,
      productId: product._id,
    });
    const data = await res.json();
    if (!data.success) {
      toast.error(data.message);
      set({ loading: false });
      return;
    }
    toast.success("Review added successfully");
    set({ loading: false, productData: data.product });
  },
  updateReview: async (reviewId, review) => {
    set({ loading: true });
    const res = await fetcher(
      `${API_URL}/api/reviews/update/${reviewId}`,
      "PUT",
      review
    );
    const data = await res.json();
    if (!data.success) {
      toast.error(data.message);
      set({ loading: false });
      return;
    }
    toast.success("Review updated successfully");
    set({ loading: false, productData: data.product });
  },
  removeReview: async (reviewId) => {
    set({ loading: true });
    const toastId = toast.loading("Removing review...");
    const res = await fetcher(
      `${API_URL}/api/reviews/delete/${reviewId}`,
      "DELETE"
    );
    const data = await res.json();
    if (!data.success) {
      toast.error(data.message, { id: toastId });
      set({ loading: false });
      return;
    }
    toast.success("Review removed successfully", { id: toastId });
    set({ loading: false, productData: data.product });
  },
}));
