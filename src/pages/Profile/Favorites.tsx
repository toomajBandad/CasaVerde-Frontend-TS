export default function Favorites() {
  // Mock data — replace with real favorites from backend or context
  const favorites = [
    {
      id: 1,
      title: "Modern Apartment in City Center",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
      location: "Madrid, Spain",
    },
    {
      id: 2,
      title: "Cozy Cottage Near the Lake",
      price: 900,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      location: "Barcelona, Spain",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Your Favorites</h1>

      {/* Empty state */}
      {favorites.length === 0 && (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((property) => (
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

              <button className="mt-4 w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
