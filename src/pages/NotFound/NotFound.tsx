import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-teal-700 via-teal-500 to-teal-300 px-6 pt-10">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white drop-shadow-lg">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-white/90 max-w-md mx-auto">
          The page you're looking for doesn’t exist or may have been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 bg-white text-teal-700 font-medium rounded-lg shadow-md hover:bg-teal-100 transition-all"
        >
          Go Back Home
        </Link>
      </div>

      <div className="mt-12">
        <svg
          className="w-64 opacity-80"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M43.4,-75.3C55.8,-67.4,64.7,-55.1,72.2,-41.8C79.7,-28.5,85.8,-14.2,86.4,0.3C87,14.8,82.1,29.6,73.6,42.1C65.1,54.6,53,64.8,39.4,72.4C25.8,80,10.9,85,-3.6,89.6C-18.1,94.2,-36.2,98.4,-50.3,92.1C-64.4,85.8,-74.5,69,-80.4,52C-86.3,35,-88,17.5,-87.5,0.3C-87,-16.9,-84.3,-33.8,-76.8,-47.5C-69.3,-61.2,-57,-71.7,-43.1,-79.6C-29.2,-87.5,-14.6,-92.8,0.6,-93.8C15.8,-94.8,31.6,-91.2,43.4,-75.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
}
