interface DeleteReviewModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteReviewModal({
  onCancel,
  onDelete,
}: DeleteReviewModalProps) {
  return (
    <div className="fixed top-0 left-0  right-0 bottom-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ">
      <div className="bg-white w-full max-w-md p-4 m-5 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Delete Review</h2>
        <p className="text-gray-600">
          Are you sure you want to delete your review?
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
