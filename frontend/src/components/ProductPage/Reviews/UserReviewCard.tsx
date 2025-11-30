import Ratings from "@/components/Common/Rating/Ratings";
import { ProductReview } from "@/types";
import { getAge } from "@/utils/Dates";
import { Icon } from "@iconify/react/dist/iconify.js";

interface UserReviewProps {
  review: ProductReview;
  onDelete: () => void;
  onEdit: () => void;
  disabled: boolean;
}

export default function UserReviewCard({
  review,
  onDelete,
  onEdit,
  disabled,
}: UserReviewProps) {
  return (
    <div className="mt-5 space-y-3">
      <h2 className="text-xl font-bold mb-4">
        Your Review
        <span className=" text-sm font-medium ml-3">
          {"( Posted "}
          {getAge(review.createdAt)}
          {")"}
        </span>
      </h2>

      <div className="flex flex-col ">
        <Ratings rating={review.rating} size={22} />
        <p className="text-md font-semibold mt-2 text-gray-800  ">
          {review.comment}
        </p>
      </div>
      <div className="flex justify-end gap-3 mr-4">
        {/* Edit */}
        <button
          className={`flex items-center gap-1 text-blue-600 p-2 rounded-md hover:bg-blue-50 transition ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } `}
          disabled={disabled}
          onClick={onEdit}
        >
          <Icon icon="line-md:edit" className="w-6 h-6 sm:w-5 sm:h-5" />
          <span className="text-sm font-medium">Edit</span>
        </button>

        {/* Delete */}
        <button
          className={`flex  items-center gap-1 text-red-600 p-2 rounded-md hover:bg-red-50 transition ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={disabled}
          onClick={onDelete}
        >
          <Icon icon="line-md:trash" className="w-6 h-6 sm:w-5 sm:h-5" />
          <span className=" hover:visible text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
}
