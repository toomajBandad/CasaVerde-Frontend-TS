export default function MainSkeleten() {
  return (
    <div className="relative animate-pulse space-y-6">
      {/* Loading spinner */}
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="w-16 h-16 border-8 border-gray-300 border-t-Pine rounded-full animate-spin"></div>
      </div>

      {/* Navbar skeleton */}
      <div className="h-21 bg-gray-200 w-full"></div>

      {/* Hero skeleton */}
      <div className="h-[40vh] md:h-[60vh] bg-gray-200 rounded-xl"></div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-40 rounded-xl shadow-sm"></div>
        ))}
      </div>

      {/* Blog / News skeleton */}
      <div className="h-32 bg-gray-200 rounded-xl"></div>
      <div className="h-32 bg-gray-200 rounded-xl"></div>
    </div>
  );
}
