import { useUserStore } from "@/stores/useUserStore";
import React, { useEffect } from "react";
import ReviewCard from "../ProductPage/Reviews/ReviewCard";
import Link from "next/link";
import Image from "next/image";
import UserReviewCard from "../ProductPage/Reviews/UserReviewCard";

const ProfileReviews = () => {
  const { reviews, fetchReview } = useUserStore();
  useEffect(() => {
    fetchReview();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <Link key={review._id} href={`/product/${review.product._id}`}>
          <section className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer max-md:w-full min-w-4/5">
            {/* Image */}
            <div className="w-full sm:w-1/3 lg:w-1/4 bg-gray-100 flex items-center justify-center overflow-hidden aspect-4/3 relative py-2">
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/15 to-transparent opacity-40" />
              <Image
                src={review.product.thumbnail!}
                alt={review.product.title!}
                fill
                className="object-contain"
                sizes="100%"
              />
            </div>

            {/* Info */}
            <aside className="w-full sm:w-2/3 lg:w-3/4 p-3 sm:p-4 flex flex-col justify-between relative">
              {/* Title */}
              <h2 className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-900 line-clamp-2 pr-8">
                {review.product.title}
              </h2>

              {/* Ratings */}
              <div className="">
                <UserReviewCard review={review} onDelete={() => {}} onEdit={() => {}} disabled={true} mode="profile"/>
              </div>
            </aside>
          </section>
        </Link>
      ))}
    </div>
  );
};

export default ProfileReviews;
