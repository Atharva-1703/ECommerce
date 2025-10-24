import { Product } from "@/types";
import { create } from "zustand";

interface CheckoutState {
    CheckoutItems: { product: Product, quantity: number }[],
    addressId:string,
    totalCost: number
    
    setCheckoutItems: (items: { product: Product, quantity: number }[]) => void

    setTotalCost: (cost: number) => void

    setAddressId: (id: string) => void

}


const useCheckoutStore=create<CheckoutState>((set, get) => ({
    CheckoutItems: [],
    totalCost: 0,
    addressId: "",
    setCheckoutItems: (items) => set({ CheckoutItems: items }),
    setTotalCost: (cost) => set({ totalCost: cost }),
    setAddressId: (id) => set({ addressId: id }),
}))

export default useCheckoutStore