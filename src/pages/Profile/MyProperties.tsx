import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function MyProperties() {
  const authContext = useContext(AuthContext);
  const userData = authContext.userInfos;
  const userFavorites = authContext.userFavorites;
  const userProperties = authContext.userProperties;
  const userMessages = authContext.userMessages;
  // Mock data — replace with real properties from backend
  const myProperties = [
    {
      id: 1,
      title: "Luxury Villa with Pool",
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      location: "Valencia, Spain",
      status: "Published",
    },
    {
      id: 2,
      title: "Modern Loft in City Center",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
      location: "Madrid, Spain",
      status: "Draft",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">My Properties</h1>

        <Link
          to="/create-property"
          className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
        >
          + Add New Property
        </Link>
      </div>

      {/* Empty state */}
      {myProperties.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-600 text-lg">
            You haven’t added any properties yet.
          </p>
          <p className="text-gray-500 mt-2">
            Start by creating your first listing.
          </p>

          <Link
            to="/create-property"
            className="inline-block mt-6 px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Create Property
          </Link>
        </div>
      )}

      {/* Properties grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {property.title}
              </h3>
              <p className="text-gray-500 text-sm">{property.location}</p>

              <p className="text-teal-600 font-bold text-lg mt-2">
                €{property.price}
              </p>

              {/* Status badge */}
              <span
                className={`inline-block mt-3 px-3 py-1 text-sm rounded-full ${
                  property.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {property.status}
              </span>

              {/* Actions */}
              <div className="flex gap-3 mt-5">
                <Link
                  to={`/edit-property/${property.id}`}
                  className="flex-1 text-center py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                  Edit
                </Link>

                <button className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
