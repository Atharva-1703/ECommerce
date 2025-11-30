import { useState } from "react";
import { ProductReview } from "@/types";
import Ratings from "@/components/Common/Rating/Ratings";

interface EditReviewProps {
  editReview: ProductReview;
  onCancel: () => void;
  onSave: (review: ProductReview) => void;
}

export default function EditReview({
  editReview,
  onCancel,
  onSave,
}: EditReviewProps) {
  const [review, setReview] = useState(editReview);

  return (
    <div className="mt-5 space-y-5">
      {/* Header */}
      <div className=" mb-3">
        <h3 className="text-lg font-semibold">Edit Your Review</h3>
      </div>

      {/* Rating stars */}
      <div className="flex justify-center mb-3">
        <Ratings
          rating={review.rating}
          size={30}
          mode="input"
          onChange={(r) =>
            setReview((prevReview) => ({ ...prevReview, rating: r }))
          }
        />
      </div>

      {/* Comment box */}
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg min-h-20 focus:ring-1 focus:ring-gray-700 outline-none"
        value={review.comment}
        onChange={(e) => setReview({ ...review, comment: e.target.value })}
        placeholder="Update your review..."
      />

      {/* Actions */}
      <div className="flex justify-end gap-3 ">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-600 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={() => onSave(review)}
          className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
