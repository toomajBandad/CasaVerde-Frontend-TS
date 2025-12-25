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

import SearchFilters from "../../components/SearchFilters/SearchFilters";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

interface Filters {
  contract: string;
  type: string;
  city: string;
  priceMin: number;
  priceMax: number;
  areaMin: number;
  areaMax: number;
  rooms: number;
}

export default function SearchProp() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  const searchParams = new URLSearchParams(window.location.search);
  const polygonParam = searchParams.get("polygon");
  const encodedPolygon = polygonParam ? encodeURIComponent(polygonParam) : "";

  // Filter options
  const [contracts, setContracts] = useState<ContractCategory[]>([]);
  const [types, setTypes] = useState<TypeCategory[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  // Combined filters state
  const [filters, setFilters] = useState<Filters>({
    contract: "",
    type: "",
    city: "",
    priceMin: 0,
    priceMax: 5000,
    areaMin: 0,
    areaMax: 300,
    rooms: -1,
  });

  // Properties
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  // 1) Load filter options once
  useEffect(() => {
    async function loadFilters() {
      const [c1, c2, c3] = await Promise.all([
        fetchContractCategories(),
        fetchTypeCategories(),
        fetchCities(),
      ]);
      setContracts(c1);
      setTypes(c2);
      setCities(c3);
    }
    loadFilters();
  }, []);

  // 2) When URL changes → update filters + fetch properties
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const newFilters: Filters = {
      city: params.get("city") || "",
      type: params.get("type") || "",
      contract: params.get("contract") || "",
      priceMin: Number(params.get("priceMin")) || 0,
      priceMax: Number(params.get("priceMax")) || 5000,
      areaMin: Number(params.get("areaMin")) || 0,
      areaMax: Number(params.get("areaMax")) || 300,
      rooms: params.get("rooms") !== null ? Number(params.get("rooms")) : -1,
    };

    setFilters(newFilters);

    // Fetch only if required filters selected
    if (!newFilters.city || !newFilters.type || !newFilters.contract) return;

    async function load() {
      setLoading(true);

      const res = await fetch(
        `${apiUrl}/properties/search?city=${newFilters.city}&type=${newFilters.type}&contract=${newFilters.contract}&priceMin=${newFilters.priceMin}&priceMax=${newFilters.priceMax}&areaMin=${newFilters.areaMin}&areaMax=${newFilters.areaMax}&rooms=${newFilters.rooms}&polygon=${encodedPolygon}`
      );

      const data = await res.json();
      setProperties(data.properties || []);
      setLoading(false);
    }

    load();
  }, [location.search, apiUrl]);

  // 3) When user changes a filter → navigate()
  const onFilterChange = (updated: Partial<Filters>) => {
    const merged = { ...filters, ...updated };

    navigate(
      `/searchproperty?city=${merged.city}&type=${merged.type}&contract=${merged.contract}&priceMin=${merged.priceMin}&priceMax=${merged.priceMax}&areaMin=${merged.areaMin}&areaMax=${merged.areaMax}&rooms=${merged.rooms}&polygon=${encodedPolygon}`
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 pt-20">
      <SearchFilters
        filters={filters}
        onChange={onFilterChange}
        contracts={contracts}
        types={types}
        cities={cities}
      />

      <div className="max-w-7xl mx-auto px-4 mt-10 pb-20">
        {loading ? (
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
