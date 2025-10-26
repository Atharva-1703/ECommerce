import { ProductReview } from "@/types";
import Ratings from "../Common/Rating/Ratings";
import RatingBar from "./RatingBar";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ReviewProps {
  reviews: ProductReview[];
  rating: number;
  ratingCount: number;
}

export default function Reviews({ reviews, rating, ratingCount }: ReviewProps) {
  return (
    <section className="px-4 mt-4">
      <h2 className="text-2xl font-bold">Product Reviews</h2>
      <div className="mt-4 flex max-sm:flex-col-reverse  gap-4">
        <aside
          className="sm:shrink-0 max-sm:pt-3 flex flex-col justify-center  items-center sm:border-r max-sm:border-t border-gray-500 px-3"
          aria-label="Average rating"
        >
          <Ratings rating={rating} size={32} />
          <p className="text-sm mt-2">{rating} / 5</p>
        </aside>
        <div className="flex-1">
          <RatingBar reviews={reviews} totalRatings={ratingCount} />
        </div>
      </div>
      <div className="mt-5 space-y-3">
        <h2 className="text-xl font-bold mb-6">Latest Reviews</h2>
        {reviews.map((review, idx) => {
          return (
            <div key={idx} className="border-b border-gray-500 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex justify-center items-center w-7 h-7 rounded-full bg-gray-300">
                  <Icon icon="mdi:person" className="w-5 h-5 text-gray-600" />
                </span>
                <span className="text-normal font-semibold leading-none text-gray-600">{review.name}</span>
                <Ratings rating={review.rating} size={18} />
              </div>
              <p className="text-sm mt-2 text-gray-800 italic ">{review.comment}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
