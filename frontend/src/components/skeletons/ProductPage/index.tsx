export default function InfoSkeleton() {
  return (
    <>
      <section className="flex max-sm:flex-col animate-pulse">
        {/* Image Carousel Skeleton */}
        <aside className="w-1/2 max-sm:w-full">
          <div className="w-full h-96 bg-gray-300 rounded-xl"></div>
          <div className="flex justify-center mt-3 gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </aside>

        {/* Product Info Skeleton */}
        <div className="flex flex-col gap-3 w-1/2 max-sm:w-full p-4">
          <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded"></div>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-24 h-6 bg-gray-300 rounded"></div>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2 items-center">
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
              <div className="w-10 h-5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="w-24 h-6 bg-gray-300 rounded"></div>
          </div>

          {/* Quantity */}
          <div className="flex gap-3 items-center mt-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-4 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Product Details Skeleton */}
      <section className="mt-8 px-4 animate-pulse">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="mt-4 h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded mt-2"></div>

        <ul className="mt-4 space-y-2">
          {[1, 2, 3].map((_, i) => (
            <li
              key={i}
              className="flex justify-between border-b border-gray-200 pb-1"
            >
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
            </li>
          ))}
        </ul>
      </section>

      {/* Policies Skeleton */}
      <section className="grid grid-cols-3 gap-4 w-full h-32 mt-8 animate-pulse">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-gray-300 rounded-2xl h-full px-3"
          ></div>
        ))}
      </section>

      {/* Product Reviews Skeleton */}
      <section className="px-4 mt-4 animate-pulse">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>

        {/* Ratings Section */}
        <div className="mt-4 flex max-sm:flex-col-reverse gap-4">
          <aside className="sm:flex-shrink-0 flex flex-col justify-center items-center sm:border-r border-gray-300 px-3">
            <div className="w-24 h-6 bg-gray-300 rounded"></div>
            <div className="w-16 h-4 bg-gray-300 rounded mt-2"></div>
          </aside>
          <div className="flex-1">
            <div className="h-24 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Review List Skeleton */}
        <div className="mt-5 space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="border-b border-gray-300 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-300"></div>
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-full h-3 bg-gray-300 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
