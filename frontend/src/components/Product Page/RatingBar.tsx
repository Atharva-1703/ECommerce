"use client";
import { ProductReview } from "@/types";
import { useEffect, useState } from "react";

interface RatingBarProps {
  reviews: ProductReview[];
  totalRatings: number;
}
interface ratingCounts {
  star: number;
  count: number;
}
export default function RatingBar({ reviews, totalRatings }: RatingBarProps) {
    const [animate, setAnimate] = useState<boolean>(false);
  const ratingCounts: ratingCounts[] = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="space-y-2">
      {ratingCounts.map(({ star, count }) => {
        const percent = totalRatings ? (count / totalRatings) * 100 : 0;
        return (
          <div key={star} className="flex items-center gap-2 w-full">
            <span className="w-6 text-sm font-medium ">{star}★</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-yellow-400 h-full transition-all duration-700 ease-in-out"
                style={{ width:  animate?`${percent}%`:0 }}
              ></div>
            </div>
            <span className="w-6 text-sm">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
