import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import type { Property } from "../../types/property";

export default function MyProperties() {
  const { userProperties = [] } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">My Properties</h1>

        <Link
          to="/createProperty"
          className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
        >
          + Add New Property
        </Link>
      </div>

      {userProperties.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-600 text-lg">
            You haven’t added any properties yet.
          </p>
          <p className="text-gray-500 mt-2">
            Click “Add New Property” to create your first listing.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {userProperties.map((property: Property) => (
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
