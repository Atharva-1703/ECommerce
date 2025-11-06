import { Order } from "@/types";
import Image from "next/image";
import React from "react";

interface CardProps {
  order: Order;
}

const statusColors: Record<Order["status"], string> = {
  delivered: "text-green-600",
  pending: "text-yellow-600",
  cancelled: "text-red-600",
  processing: "text-blue-600",
};

const OrderCard: React.FC<CardProps> = ({ order }) => {
  const getFormattedDate = (UTCDate: string) => {
    const date = new Date(UTCDate);
    const day = date.getDate();
    const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      date.getDay()
    ];
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}, ${weekDay}`;
  };
  return (
    <section
      className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer max-md:w-full min-w-4/5 max-sm:py-2"
      // onClick={() => router.push(`/product/${product._id}`)}
    >
      {/* Image */}
      <div className="w-full sm:w-1/3 lg:w-1/4 bg-gray-200 flex items-center max-sm:rounded-t-xl justify-center overflow-hidden aspect-4/3 relative py-2">
        <Image
          src={order.items[0].product.thumbnail!}
          alt={order.items[0].name}
          fill
          className="object-contain"
          sizes="100%"
        />
      </div>

      {/* Info */}
      <aside className="w-full sm:w-2/3 lg:w-3/4 p-3 sm:p-4 flex flex-col justify-between relative">
        {/* Title */}
        <h2 className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-900 line-clamp-2 pr-8">
          {order.items[0].name}
          {order.items.length > 1 && ` + ${order.items.length - 1} more`}
        </h2>

        {/* Price */}
        <div className="">
          <p className="text-green-600 font-bold text-lg sm:text-xl">
            ₹{order.totalCost}
          </p>
        </div>

        <div className="">
          <p
            className={` font-bold text-lg sm:text-xl ${
              statusColors[order.status]
            }`}
          >
            {order.status}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <p className="text-sm text-gray-500 font-bold">
            ordered on:
            <br /> {getFormattedDate(order.createdAt)}
          </p>
          <p className="text-sm text-gray-500 font-bold ">
            {order.status === "delivered" ? (
              <span>
                delivered on: <br />
                {getFormattedDate(order.deliveredAt!)}
              </span>
            ) : (
              <span>
                expected delivery on:
                <br /> {getFormattedDate(order.deliveryDate)}
              </span>
            )}
          </p>
        </div>
      </aside>
    </section>
  );
};

export default OrderCard;
