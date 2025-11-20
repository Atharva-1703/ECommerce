"use client";
import OrderCard from "@/components/Orders/OrderCard";
import useCheckoutStore from "@/stores/useCheckoutStore";
import React, { useEffect } from "react";

const OrdersContainer = () => {
  const { fetchOrders, orders } = useCheckoutStore();
  useEffect(() => {
    fetchOrders();
  }, []);
  // console.log(orders);

  return (
    <div className="px-4 flex flex-col gap-6">
      {orders.map((order) => {
        return <OrderCard key={order._id} order={order} />;
      })}
    </div>
  );
};

export default OrdersContainer;
