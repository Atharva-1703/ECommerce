import { create } from "zustand";
import { Product } from "@/types";

interface SearchState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}
