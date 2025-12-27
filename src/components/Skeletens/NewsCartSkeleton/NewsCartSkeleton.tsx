export default function NewsCartSkeleton() {
  return (
    <div className="flex flex-col justify-start items-start w-full max-w-96 border border-gray-300 rounded-5xl overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-300"></div>

      <div className="p-4 flex flex-col gap-4 w-full">
        {/* Category */}
        <div className="h-4 w-20 bg-gray-300 rounded"></div>

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-300 rounded"></div>

        {/* Subtitle */}
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>

        {/* Teaser */}
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

        {/* Author + Date */}
        <div className="h-3 w-24 bg-gray-300 rounded"></div>

        {/* Read More */}
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
