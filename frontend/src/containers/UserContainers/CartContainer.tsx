"use client";
import CartBudget from "@/components/Cart/CartBudget";
import EmptyState from "@/components/Common/EmptyState";
import ProductCardResponsive from "@/components/Common/ProductCard/ProductCardHorizontal";
import { ProductCardSkeletonHorizontal } from "@/components/skeletons/ProductCards/horizontal";
import getDiscountedPrice from "@/utils/getDiscountedPrice";
import { useCartStore } from "@/stores/useCartStore";
import useCheckoutStore from "@/stores/useCheckoutStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartContainer = () => {
  const { cart, isLoading, fetchCart, removeFromCart, clearCart } =
    useCartStore();

  const { setCheckoutItems, setTotalCost } = useCheckoutStore();

  const router = useRouter();
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const handleCheckout = () => {
    const checkoutItems = cart.filter((item) => item.quantity > 0);
    setCheckoutItems(checkoutItems);
    setTotalCost(cartTotal);
    router.push("/checkout");
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    let total = 0;
    let items = 0;
    cart.forEach((item) => {
      total +=
        getDiscountedPrice(
          item.product.price,
          item.product.discountPercentage
        ) * item.quantity;
      items += item.quantity;
    });
    setTotalItems(items);
    setCartTotal(total);
  });

  return (
    <div className="px-4 flex flex-col lg:flex-row gap-6">
      {cart.length > 0 && (
        <button
          onClick={clearCart}
          className="text-red-600 text-sm font-semibold"
        >
          Clear Cart
        </button>
      )}
      <div className="flex flex-col gap-4 w-full">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx: number) => {
            return <ProductCardSkeletonHorizontal key={idx} />;
          })
        ) : cart.length > 0 ? (
          cart.map(({ product, _id, quantity }) => {
            return (
              <ProductCardResponsive
                key={_id}
                product={product}
                mode="cart"
                cartId={_id}
                cartQuantity={quantity}
                onRemove={() => removeFromCart(_id)}
              />
            );
          })
        ) : (
          <EmptyState
            icon="mdi:cart-outline"
            title="Your cart is empty 🛒"
            subtitle="Browse products and add them to your cart to see them here!"
          />
        )}
      </div>
      {cart.length > 0 && (
        <CartBudget
          items={totalItems}
          subtotal={cartTotal}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default CartContainer;
