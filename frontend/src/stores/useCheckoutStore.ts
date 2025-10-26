import { Product } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { API_URL } from "@/utils/url";
import toast from "react-hot-toast";
import { create } from "zustand";

interface CheckoutState {
  CheckoutItems: { product: Product; quantity: number }[];
  addressId: string;
  totalCost: number;

  setCheckoutItems: (items: { product: Product; quantity: number }[]) => void;

  setTotalCost: (cost: number) => void;

  setAddressId: (id: string) => void;

  placeOrder: (paymentMethod:"cod"|"upi"|"card") => Promise<void>;
}

const useCheckoutStore = create<CheckoutState>((set, get) => ({
  CheckoutItems: [],
  totalCost: 0,
  addressId: "",

  setCheckoutItems: (items) => set({ CheckoutItems: items }),
  setTotalCost: (cost) => set({ totalCost: cost }),
  setAddressId: (id) => set({ addressId: id }),
  placeOrder: async (paymentMethod) => {
    const { CheckoutItems, addressId} = get();
    const items = CheckoutItems.map(({ product, quantity }) => ({
      productId: product._id,
      quantity,
    }));
    const toastId = toast.loading("Placing order...");
    const res = await fetcher(`${API_URL}/api/orders/add`, "POST", {
      items,
      addressId,
      paymentMethod
    });
    const data = await res.json();
    if (!data.success) {
      toast.error(data.message, { id: toastId });
      return;
    }
    toast.success("Order placed successfully", { id: toastId });
  },

}));

export default useCheckoutStore;
