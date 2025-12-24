export default function PropertyCardSkeleton() {
  return (
    <div className="block shadow-md rounded-tl-8xl rounded-lg overflow-hidden animate-pulse">
      <div className="flex flex-row lg:flex-col">
        <div className="relative sm:w-1/2 md:w-full">
          <div className="w-full h-40 sm:h-full md:h-56 bg-gray-300" />
        </div>

        <div className="p-4 space-y-3 sm:w-1/2 md:w-full">
          <div className="flex justify-between items-center">
            <div className="h-5 w-32 bg-gray-300 rounded" />
            <div className="h-5 w-16 bg-gray-300 rounded" />
          </div>

          <div className="h-4 w-40 bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-3/4 bg-gray-300 rounded" />

          <div className="flex items-center gap-4">
            <div className="h-4 w-20 bg-gray-300 rounded" />
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>

          <div className="flex justify-between items-center">
            <div className="h-8 w-20 bg-gray-300 rounded" />
            <div className="flex gap-2">
              <div className="h-8 w-10 bg-gray-300 rounded" />
              <div className="h-8 w-10 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
