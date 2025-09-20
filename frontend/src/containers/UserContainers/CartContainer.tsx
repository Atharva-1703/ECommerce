"use client";
import CartBudget from "@/components/Cart/CartBudget";
import ProductCardResponsive from "@/components/Common/ProductCard/ProductCardHorizontal";
import { ProductCardSkeletonHorizontal } from "@/components/skeletons/ProductCards/horizontal";
import { useCartStore } from "@/stores/useCartStore";
import React, { useEffect } from "react";

const CartContainer = () => {
  const { cart, isLoading ,fetchCart,removeFromCart} = useCartStore();
  useEffect(() => {
    fetchCart();
  },[])
  return (
    <div className="px-4 flex flex-col lg:flex-row gap-6">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, idx: number) => {
          return <ProductCardSkeletonHorizontal key={idx} />;
        })
      ) : cart.length > 0 ? (
        cart.map(({ product,_id }) => {
          return (
            <ProductCardResponsive
              key={_id}
              product={product}
              mode="cart"
              onRemove={() => removeFromCart(_id)}
            />
          );
        })
      ) : (
        <h1 className="text-2xl font-bold text-gray-800">
          No favourites found
        </h1>
      )}
      <CartBudget subtotal={100} />
    </div>
  );
};

export default CartContainer;
