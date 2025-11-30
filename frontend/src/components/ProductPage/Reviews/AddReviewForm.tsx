import Ratings from "@/components/Common/Rating/Ratings";
import { ProductReview } from "@/types";
import { useState } from "react";

interface AddReviewFormProps {
  onSubmit: (review: Partial<ProductReview>) => void;
}

export default function AddReviewForm({ onSubmit }: AddReviewFormProps) {
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });
  return (
    <div className="mt-5 space-y-5">
      <h2 className="text-xl font-bold mb-6">Write a Review</h2>
      <div className="flex justify-center">
        <Ratings
          rating={review.rating}
          size={32}
          mode="input"
          onChange={(rating) =>
            setReview((prevReview) => ({
              ...prevReview,
              rating,
            }))
          }
        />
      </div>
      <textarea
        placeholder="(Optional) Write a review..."
        className="w-full p-3 border border-gray-300 rounded-lg min-h-16"
        value={review.comment}
        onChange={(e) => setReview({ ...review, comment: e.target.value })}
      ></textarea>
      <button
        className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        onClick={() => onSubmit(review)}
      >
        Submit
      </button>
    </div>
  );
}
