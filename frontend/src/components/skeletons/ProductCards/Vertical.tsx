export default function ProductCardSkeletonVertical() {
  return (
    <article className="relative min-w-56 h-min-[465px] p-4 rounded-2xl bg-gray-200 animate-pulse flex flex-col gap-3">
      <div className="w-8 h-8 absolute top-4 right-4 bg-gray-300 rounded-full shadow"></div>
      <div className="absolute top-4 left-4 w-6 h-3 bg-gray-300"></div>
      <div className="w-full h-40 rounded-2xl bg-gray-300"></div>
      <div className="h-5 w-full bg-gray-300 rounded"></div>
      <div className="flex flex-col items-center gap-1">
        <div className="h-4 w-12 bg-gray-300"></div>
        <div className="h-4 w-12 bg-gray-300"></div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="h-6 w-24 bg-gray-300 rounded"></div>
        <div className="h-4 w-10 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col justify-center gap-4 mt-1 w-full">
        <div className="bg-gray-300 text-white w-full h-8 rounded-xl"></div>
        <div className="bg-gray-300 text-white w-full h-8 rounded-xl"></div>
      </div>
    </article>
  );
}
