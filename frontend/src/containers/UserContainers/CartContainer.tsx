"use client";
import CartBudget from "@/components/Cart/CartBudget";
import EmptyState from "@/components/Common/EmptyState";
import ProductCardResponsive from "@/components/Common/ProductCard/ProductCardHorizontal";
import { ProductCardSkeletonHorizontal } from "@/components/skeletons/ProductCards/horizontal";
import { useCartStore } from "@/stores/useCartStore";
import React, { useEffect, useState } from "react";

const CartContainer = () => {
  const { cart, isLoading, fetchCart, removeFromCart } = useCartStore();
  const [cartTotal, setCartTotal]=useState<number>(0);
  const [totalItems, setTotalItems]=useState<number>(0);
  useEffect(() => {
    fetchCart();
  }, []);
  useEffect(()=>{
    let total=0;
    let items=0;
    cart.forEach((item)=>{
      total+=item.product.price*item.quantity;
      items+=item.quantity
    })
    setTotalItems(items);
    setCartTotal(total);
  })
  return (
    <div className="px-4 flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col gap-4 w-full">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx: number) => {
            return <ProductCardSkeletonHorizontal key={idx} />;
          })
        ) : cart.length > 0 ? (
          cart.map(({ product, _id }) => {
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
          <EmptyState
            icon="mdi:cart-outline"
            title="Your cart is empty 🛒"
            subtitle="Browse products and add them to your cart to see them here!"
          />
        )}
      </div>
      <CartBudget items={totalItems} subtotal={cartTotal}/>
    </div>
  );
};

export default CartContainer;
