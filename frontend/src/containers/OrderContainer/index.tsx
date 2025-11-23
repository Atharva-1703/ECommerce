"use client";
import OrderItem from "@/components/Orders/OrderItem";
import useCheckoutStore from "@/stores/useCheckoutStore";
import { getFormattedDate } from "@/utils/Dates";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function OrderContainer() {
  const id = useParams().id as string;
  const { orderData, fetchOrderData } = useCheckoutStore();

  useEffect(() => {
    fetchOrderData(id);
    return () => {};
  }, [id]);

  // console.log(orderData);

  return (
    <div className="w-full max-w-4xl mx-auto gap-4 space-y-3">
      <h1 className="text-2xl font-bold w-full pl-3">Order Details</h1>
      <div className="px-6 space-y-2">
        {orderData?.items.map((item, idx) => {
          return <OrderItem key={idx} item={item} />;
        })}
      </div>

      {/* Payment Dedtails */}
      <div className="flex flex-col gap-1 bg-gray-50 rounded-2xl p-4">
        <h1 className="text-lg font-bold">Payment Details</h1>
        <dl className="grid sm:grid-cols-2 gap-y-3 gap-x-2 text-gray-800">
          <div>
            <dt className="text-sm text-gray-500">Total Cost</dt>
            <dd className="font-medium">₹{orderData?.totalCost}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Payment Method</dt>
            <dd className="font-medium">
              {orderData?.paymentMethod.toUpperCase()}
            </dd>
          </div>
        </dl>
      </div>

      {/* Delivery Address */}
      <div className="flex flex-col gap-1 bg-gray-50 rounded-2xl p-4">
        <h1 className="text-lg font-bold">Delivery Address</h1>
        <dl className="grid sm:grid-cols-2 gap-y-3 gap-x-2 text-gray-800">
          <div>
            <dt className="text-sm text-gray-500">Street</dt>
            <dd className="font-medium">{orderData?.shippingAddress.street}</dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">City</dt>
            <dd className="font-medium">{orderData?.shippingAddress.city}</dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">State</dt>
            <dd className="font-medium">{orderData?.shippingAddress.state}</dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Postal Code</dt>
            <dd className="font-medium">
              {orderData?.shippingAddress.postalCode}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Country</dt>
            <dd className="font-medium">
              {orderData?.shippingAddress.country}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm text-gray-500">Phone Number</dt>
            <dd className="font-medium">{orderData?.shippingAddress.phone}</dd>
          </div>
        </dl>
      </div>

      {/* Delivery Status */}
      <div className="flex flex-col gap-1 bg-gray-50 rounded-2xl p-4">
        <h1 className="text-lg font-bold">
          Delivery Status: {orderData?.status}
        </h1>
        <dl className="grid sm:grid-cols-2 gap-y-3 gap-x-2 text-gray-800">
          <div>
            <dt className="text-sm text-gray-500">Ordered Date</dt>
            <dd className="font-medium">
              {orderData && getFormattedDate(orderData.createdAt!)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Delivery Date</dt>
            {(orderData &&orderData?.status === "delivered") ? (
              <dd className="font-medium">
                {getFormattedDate(orderData.deliveredAt!)}
              </dd>
            ) : (
              <dd className="font-medium">
                {orderData && getFormattedDate(orderData.deliveryDate!)}
              </dd>
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
