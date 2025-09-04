export const ProductCardSkeletonHorizontal = () => {
  return (
    <section className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full sm:w-1/3 lg:w-1/4 bg-gray-100 flex items-center justify-center overflow-hidden aspect-[4/3] relative py-2">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-40" />
        <div className="w-32 h-24 bg-gray-200 rounded-md" />
      </div>

      {/* Info Skeleton */}
      <aside className="w-full sm:w-2/3 lg:w-3/4 p-3 sm:p-4 flex flex-col justify-between relative">
        {/* Remove button skeleton */}
        <div className="absolute top-3 right-3 w-6 h-6 bg-gray-200 rounded-full" />

        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Price skeleton */}
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="w-10 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-24 h-6 bg-gray-200 rounded mt-1"></div>
        </div>

        {/* Actions skeleton */}
        <div className="mt-3 flex flex-col sm:flex-row gap-2 items-center">
          <div className="w-32 h-10 bg-gray-200 rounded-full"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </aside>
    </section>
  );
};
