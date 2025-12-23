import { Link } from "react-router-dom";
import { BiArea, BiBed, BiHeart, BiMessage } from "react-icons/bi";

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
      className="
        block shadow-md hover:shadow-xl transition overflow-hidden group rounded-tl-8xl rounded-lg"
    >
      <div
        className="
          flex flex-row 
          lg:flex-col
        "
      >
        <div className="relative sm:w-1/2 md:w-full">
          <img
            src={image}
            alt={title}
            className="
              w-full h-40 sm:h-full md:h-56 
              object-cover 
              group-hover:scale-105 transition-transform duration-300
            "
          />
        </div>

        <div className="p-4 space-y-3 sm:w-1/2 md:w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition">
              {title}
            </h3>
            <span className=" bg-teal-600 text-white px-3">€{price}</span>
          </div>

          <p className="text-gray-500 text-sm">{location}</p>

          <p className="text-gray-600 text-sm leading-relaxed">
            {shortDescription}
          </p>

          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <span className="flex items-center gap-1">
              <BiBed className="text-gray-600" />
              {rooms} rooms
            </span>
            <span className="flex items-center gap-1">
              <BiArea className="text-gray-600" /> {area} m²
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <button
                className=" py-2 px-4 bg-teal-600 text-white text-sm hover:bg-teal-700 transition duration-400 cursor-pointer"
                title="View Details"
              >
                Details
              </button>
            </div>

            <div>
              <button
                className="  py-2 px-4 bg-gray-200 text-gray-800  hover:bg-gray-300 transition duration-400 cursor-pointer"
                title="Add to Favorites"
              >
                <BiHeart className="text-gray-600" />
              </button>
              <button
                className="  py-2 px-4 bg-gray-200 text-gray-800  hover:bg-gray-300  transition duration-400 cursor-pointer"
                title="Contact Owner"
              >
                <BiMessage className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
