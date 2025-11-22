import { orderItem } from "@/types";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface OrderItemProps {
  item: orderItem;
}

export default function OrderItem({ item }: OrderItemProps) {
  console.log(item);

  return (
    <section
      className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer max-md:w-full min-w-3/5"
      //   onClick={() => router.push(`/product/${product._id}`)}
    >
      {/* Image */}
      <div className="w-full sm:w-1/3 lg:w-1/4 bg-gray-100 flex items-center justify-center overflow-hidden aspect-video  relative">
        <Image
          src={item.product.thumbnail!}
          alt={item.name}
          fill
          className="object-contain py-2"
          sizes="100%"
        />
      </div>

      {/* Info */}
      <aside className="w-full sm:w-2/3 lg:w-3/4 p-3 sm:p-4 flex flex-col justify-between relative">
        {/* Remove button */}
        {
          <button
            onClick={(e) => {
              e.stopPropagation();
              //   onRemove && onRemove();
            }}
            className="text-red-500 hover:text-red-600 absolute top-3 right-3 rounded-full shadow-md bg-white p-1 cursor-pointer"
          >
            <Icon icon="mynaui:trash" className="w-6 h-6" />
          </button>
        }

        {/* Title */}
        <h2 className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-900 line-clamp-2 pr-8">
          {item.name}
        </h2>

        {/* Price */}
        <div className="mt-2 gap-1">
          <span className="text-green-600 font-bold ">
            ₹{item.totalItemCost / item.quantity}
          </span>
          <p className="text-sm text-gray-500 font-bold">
            Quantity: {item.quantity}
          </p>
          <span className="text-gray-600 text-sm">
            Total: ₹{item.totalItemCost}
          </span>
        </div>

      </aside>
    </section>
  );
}
