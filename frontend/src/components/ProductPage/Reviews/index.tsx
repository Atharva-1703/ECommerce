import { ProductReview } from "@/types";
import Ratings from "../../Common/Rating/Ratings";
import RatingBar from "../RatingBar";
import { useState } from "react";
import { useProductsStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
import AddReviewForm from "./AddReviewForm";
import UserReviewCard from "./UserReviewCard";
import DeleteReviewModal from "./DeleteReviewModal";
import ReviewCard from "./ReviewCard";
import EditReview from "./EditReview";
import toast from "react-hot-toast";

interface ReviewProps {
  reviews: ProductReview[];
  rating: number;
  ratingCount: number;
}

export default function Reviews({ reviews, rating, ratingCount }: ReviewProps) {
  const { addReview, removeReview,updateReview } = useProductsStore();
  const { user } = useUserStore();

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const UserReview = reviews.find((review) => review.user === user?.id);

  const handleReviewDelete = async () => {
    setShowDelete(!showDelete);
    if (!UserReview) return;
    setProcessing(true);
    await removeReview(UserReview._id);
    setProcessing(false);
  };

  const handleReviewSubmit = async (review: Partial<ProductReview>) => {
    await addReview(review);
  };

  const handleReviewEdit=async(review:ProductReview)=>{
    if (!UserReview) return;
    if(UserReview.rating===review.rating && UserReview.comment===review.comment){
      toast.error("No change in review found");
      return;
    }
    setEditing(false);
    await updateReview(review);
  }

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
      <AddReviewForm onSubmit={handleReviewSubmit} />

      {/* User Review */}
      {UserReview &&
        (editing ? (
          <EditReview
            editReview={UserReview}
            onCancel={() => setEditing(false)}
            onSave={handleReviewEdit}
          />
        ) : (
          <UserReviewCard
            review={UserReview}
            onEdit={() => setEditing(true)}
            onDelete={() => setShowDelete(true)}
            disabled={processing}
          />
        ))}

      {showDelete && (
        <DeleteReviewModal
          onCancel={() => setShowDelete(false)}
          onDelete={handleReviewDelete}
        />
      )}

      {/* Latest Reviews */}
      <div className="mt-5 space-y-3">
        <h2 className="text-xl font-bold mb-6">Latest Reviews</h2>
        {reviews.map((review, idx) => {
          if (user && review.user === user.id) return null;
          if (!review.comment) return null;
          return <ReviewCard key={idx} review={review} />;
        })}
      </div>
    </section>
  );
}
