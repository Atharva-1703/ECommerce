import { ProductReview } from "@/types";
import Ratings from "../Common/Rating/Ratings";
import RatingBar from "./RatingBar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useProductsStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
import { getAge } from "@/utils/Dates";

interface ReviewProps {
  reviews: ProductReview[];
  rating: number;
  ratingCount: number;
}

export default function Reviews({ reviews, rating, ratingCount }: ReviewProps) {
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });
  const { addReview, removeReview } = useProductsStore();
  const { user } = useUserStore();

  const [showDelete, setShowDelete] = useState<boolean>(false);

  const UserReview = reviews.find((review) => review.user === user?.id);

  const handleRatingChange = (rating: number) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating,
    }));
  };

  const handleReviewDelete = async () => {
    setShowDelete(!showDelete);
    if (!UserReview) return;
    await removeReview(UserReview._id);
  };

  const handleReviewSubmit = async () => {
    await addReview(review);
  };

  return (
    <section className="px-4 mt-4">
      <h2 className="text-2xl font-bold">Product Reviews</h2>

      {/* Product Ratings*/}
      <div className="mt-4 flex max-sm:flex-col-reverse  gap-4">
        <aside
          className="sm:shrink-0 max-sm:pt-3 flex flex-col justify-center  items-center sm:border-r max-sm:border-t border-gray-500 px-3"
          aria-label="Average rating"
        >
          <Ratings rating={rating} size={32} />
          <p className="text-sm mt-2">{rating.toFixed(2)} / 5</p>
        </aside>
        <div className="flex-1">
          <RatingBar reviews={reviews} totalRatings={ratingCount} />
        </div>
      </div>

      {/* Give Review section */}
      <div className="mt-5 space-y-5">
        <h2 className="text-xl font-bold mb-6">Write a Review</h2>
        <div className="flex justify-center">
          <Ratings
            rating={review.rating}
            size={32}
            mode="input"
            onChange={handleRatingChange}
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
          onClick={handleReviewSubmit}
        >
          Submit
        </button>
      </div>

      {/* User Review */}
      {UserReview && (
        <div className="mt-5 space-y-3">
          <h2 className="text-xl font-bold mb-4">
            Your Review
            <span className=" text-sm font-medium ml-3">
              {"( Posted "}
              {getAge(UserReview.createdAt)}
              {")"}
            </span>
          </h2>

          <div className="flex flex-col ">
            <Ratings rating={UserReview.rating} size={22} />
            <p className="text-md font-semibold mt-2 text-gray-800  ">
              {UserReview.comment}
            </p>
          </div>
          <div className="flex justify-end gap-3 mr-4">
            {/* Edit */}
            <button className="flex cursor-pointer items-center gap-1 text-blue-600 p-2 rounded-md hover:bg-blue-50 transition ">
              <Icon icon="line-md:edit" className="w-6 h-6 sm:w-5 sm:h-5" />
              <span className="text-sm font-medium">Edit</span>
            </button>

            {/* Delete */}
            <button
              className="flex cursor-pointer items-center gap-1 text-red-600 p-2 rounded-md hover:bg-red-50 transition"
              onClick={() => setShowDelete(true)}
            >
              <Icon icon="line-md:trash" className="w-6 h-6 sm:w-5 sm:h-5" />
              <span className=" hover:visible text-sm font-medium">Delete</span>
            </button>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="fixed top-0 left-0  right-0 bottom-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ">
          <div className="bg-white w-full max-w-md p-4 m-5 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Delete Review</h2>
            <p className="text-gray-600">
              Are you sure you want to delete your review?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 cursor-pointer"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={handleReviewDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Latest Reviews */}
      <div className="mt-5 space-y-3">
        <h2 className="text-xl font-bold mb-6">Latest Reviews</h2>
        {reviews.map((review, idx) => {
          if (user && review.user === user.id) return null;
          if (!review.comment) return null;
          return (
            <div
              key={idx}
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
              <p className="text-sm mt-2 text-gray-800 italic ">
                {review.comment}
              </p>
              <span className="flex justify-end text-xs font-medium text-gray-600">
                {"( Posted "}
                {getAge(review.createdAt)}
                {")"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
