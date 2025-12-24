import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { fetchCities } from "../../services/citiesService";
import {
  fetchTypeCategories,
  fetchContractCategories,
} from "../../services/categoriesService";

import type { Property } from "../../types/property";
import type { TypeCategory } from "../../types/typeCategory";
import type { ContractCategory } from "../../types/contractCategory";
import type { City } from "../../types/city";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

export default function SearchProp() {
  const navigate = useNavigate();
  const location = useLocation();

  const apiUrl = import.meta.env.VITE_API_URL;

  // Typed state
  const [contractTypes, setContractTypes] = useState<ContractCategory[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<TypeCategory[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedContract, setSelectedContract] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingFilters, setLoadingFilters] = useState<boolean>(true);
  const [loadingProperties, setLoadingProperties] = useState<boolean>(false);

  // Read query params on mount + whenever URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSelectedCity(params.get("city") || "");
    setSelectedType(params.get("type") || "");
    setSelectedContract(params.get("contract") || "");
  }, [location.search]);

  // Fetch filter data
  useEffect(() => {
    async function loadFilters() {
      try {
        const [contracts, types, citiesData] = await Promise.all([
          fetchContractCategories(),
          fetchTypeCategories(),
          fetchCities(),
        ]);

        setContractTypes(contracts);
        setPropertyTypes(types);
        setCities(citiesData);
      } catch (err) {
        console.error("Failed to load filters:", err);
      } finally {
        setLoadingFilters(false);
      }
    }

    loadFilters();
  }, []);

  // Update URL when filters change
  const updateURL = (city: string, type: string, contract: string) => {
    const params = new URLSearchParams();

    if (city) params.set("city", city);
    if (type) params.set("type", type);
    if (contract) params.set("contract", contract);

    navigate(`/searchproperty?${params.toString()}`);
  };

  // Handlers
  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    updateURL(value, selectedType, selectedContract);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    updateURL(selectedCity, value, selectedContract);
  };

  const handleContractChange = (value: string) => {
    setSelectedContract(value);
    updateURL(selectedCity, selectedType, value);
  };

  // AUTO‑FETCH PROPERTIES WHEN URL PARAMS CHANGE
  useEffect(() => {
    if (!selectedCity || !selectedType || !selectedContract) return;

    async function loadProperties() {
      setLoadingProperties(true);

      try {
        const res = await fetch(
          `${apiUrl}/properties/search?city=${selectedCity}&type=${selectedType}&contract=${selectedContract}`
        );
        const data = await res.json();
        setProperties(data.properties || []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoadingProperties(false);
      }
    }

    loadProperties();
  }, [selectedCity, selectedType, selectedContract, apiUrl]);

  return (
    <div className="min-h-screen w-full bg-gray-50 pt-20">
      {/* Header */}
      <div className="w-full bg-white shadow-sm py-6 px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Search Properties
        </h1>
        <p className="text-gray-500 mt-1">
          Choose your filters to find the perfect property
        </p>
      </div>

      {/* Filters */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-700">Filters</h2>

          {loadingFilters ? (
            <div className="text-gray-500 animate-pulse">
              Loading filters...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Contract Type */}
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500"
                value={selectedContract}
                onChange={(e) => handleContractChange(e.target.value)}
              >
                <option value="">Select Contract</option>
                {contractTypes.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              {/* Property Type */}
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500"
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              {/* City */}
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500"
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
              >
                <option value="">Select City</option>
                {cities.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-10 pb-20">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>

        {loadingProperties ? (
          <div className="text-gray-500 animate-pulse">
            Loading properties...
          </div>
        ) : properties.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
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
        ) : (
          <p className="text-gray-500">No properties found.</p>
        )}
      </div>
    </div>
  );
}
