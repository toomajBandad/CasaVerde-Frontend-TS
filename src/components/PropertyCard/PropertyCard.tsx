import {
  BiArea,
  BiBed,
  BiHeart,
  BiSolidHeart,
  BiMessage,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";

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
  const apiUrl = import.meta.env.VITE_API_URL as string;

  const shortDescription =
    description.length > 90 ? description.slice(0, 90) + "..." : description;

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userId = authContext?.userInfos?.id;
  const isFavorited = authContext?.userInfos?.favorites?.some(
    (property) => property._id === id
  );

  const navigateToProperty = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/property/${id}`);
  };

  const handleAddToFavorites = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    if (!userId) {
      toast.error("Please log in to save favorites");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users/${userId}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: id }),
      });

      if (!response.ok) throw new Error("Failed to add favorite");

      toast.success("Property added to favorites!");
      authContext.updateUserInfos();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add property to favorites.");
    }
  };

  const handleContactOwner = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Details clicked");
  };

  return (
    <div
      onClick={() => navigate(`/property/${id}`)}
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
            <span className=" bg-teal-100 text-teal-600 px-3 rounded-2xl">
              €{price}
            </span>
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
                onClick={navigateToProperty}
              >
                Details
              </button>
            </div>

            <div>
              <button
                className="  py-2 px-4 bg-gray-200 text-gray-800  hover:bg-gray-300 transition duration-400 cursor-pointer"
                title="Add to Favorites"
                onClick={handleAddToFavorites}
              >
                {isFavorited ? (
                  <BiSolidHeart className="text-red-500" />
                ) : (
                  <BiHeart className="text-gray-600" />
                )}
              </button>
              <button
                className="  py-2 px-4 bg-gray-200 text-gray-800  hover:bg-gray-300  transition duration-400 cursor-pointer"
                title="Contact Owner"
                onClick={handleContactOwner}
              >
                <BiMessage className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
