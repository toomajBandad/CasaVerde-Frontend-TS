import { Link } from "react-router-dom";

interface PropertyCardProps {
  id: string | number;
  title: string;
  price: number;
  image: string;
  location: string;
  rooms: number;
  area: number; // m²
  description: string;
}

export default function PropertyCard({
  id,
  title,
  price,
  image,
  location,
  rooms,
  area,
  description,
}: PropertyCardProps) {
  // Trim description to 90 characters
  const shortDescription =
    description.length > 90 ? description.slice(0, 90) + "..." : description;

  return (
    <Link
      to={`/property/${id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Price badge */}
        <span className="absolute bottom-3 left-3 bg-teal-600 text-white px-3 py-1 rounded-lg text-sm shadow">
          €{price}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition">
          {title}
        </h3>

        <p className="text-gray-500 text-sm">{location}</p>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {shortDescription}
        </p>

        {/* Rooms + Area */}
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <span className="flex items-center gap-1">🛏 {rooms} rooms</span>
          <span className="flex items-center gap-1">📐 {area} m²</span>
        </div>

        <button className="mt-3 w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
          View Details
        </button>
      </div>
    </Link>
  );
}
