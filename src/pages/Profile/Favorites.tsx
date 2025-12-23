import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import type { Property } from "../../types/property";

export default function Favorites() {
  const authContext = useContext(AuthContext);

  const userFavorites = authContext.userFavorites || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Your Favorites</h1>

      {/* Empty state */}
      {userFavorites.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-600 text-lg">
            You haven’t added any favorites yet.
          </p>
          <p className="text-gray-500 mt-2">
            Browse properties and tap the heart icon to save them.
          </p>
        </div>
      )}

      {/* Favorites grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {userFavorites.map((property: Property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            image={property.image as string}
            location={property.location}
            rooms={property.bedrooms}
            area={property.area}
            description={property.desc}
          />
        ))}
      </div>
    </div>
  );
}
