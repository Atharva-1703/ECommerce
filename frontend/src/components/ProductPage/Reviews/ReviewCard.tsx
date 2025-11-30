import Ratings from "@/components/Common/Rating/Ratings";
import { ProductReview } from "@/types";
import { getAge } from "@/utils/Dates";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ReviewCardProps {
    review: ProductReview;
}

export default function ReviewCard({review}:ReviewCardProps) {
  return (
    <div
      className="border border-gray-200 rounded-lg p-4 shadow-sm pb-3"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="flex justify-center items-center w-7 h-7 rounded-full bg-gray-300">
          <Icon icon="mdi:person" className="w-5 h-5 text-gray-600" />
        </span>
        <span className="text-normal font-semibold leading-none text-gray-600">
          {review.name}
        </span>
        <Ratings rating={review.rating} size={18} />
      </div>
      <p className="text-sm mt-2 text-gray-800 italic ">{review.comment}</p>
      <span className="flex justify-end text-xs font-medium text-gray-600">
        {"( Posted "}
        {getAge(review.createdAt)}
        {")"}
      </span>
    </div>
  );
}
