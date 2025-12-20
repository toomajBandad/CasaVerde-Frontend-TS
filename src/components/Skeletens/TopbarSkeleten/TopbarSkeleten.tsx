export default function TopbarSkeleten() {
  return (
    <div className="absolute top-0 left-0 w-full h-[9vh] bg-black/60 px-20 flex items-center">
      <div className="animate-pulse flex justify-between items-center w-full">
        {/* Logo skeleton */}
        <div className="h-8 w-40 bg-gray-300/40 rounded"></div>

        {/* Right side skeleton */}
        <div className="flex items-center gap-6">
          <div className="h-6 w-20 bg-gray-300/40 rounded"></div>
          <div className="h-6 w-20 bg-gray-300/40 rounded"></div>
          <div className="h-10 w-10 bg-gray-300/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
