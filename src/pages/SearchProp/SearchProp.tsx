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
import EmptyState from "../../components/EmptyState/EmptyState";
import PropertyCardSkeleton from "../../components/Skeletens/PropertyCardSkeleton/PropertyCardSkeleton";

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

  const searchParams = new URLSearchParams(location.search);
  const polygonParam = searchParams.get("polygon");
  const encodedPolygon = polygonParam ? encodeURIComponent(polygonParam) : "";

  // Filter options
  const [contracts, setContracts] = useState<ContractCategory[]>([]);
  const [types, setTypes] = useState<TypeCategory[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  // Properties
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  // 👉 Compute filters directly from URL (NO STATE)
  const filters: Filters = {
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    contract: searchParams.get("contract") || "",
    priceMin: Number(searchParams.get("priceMin")) || 0,
    priceMax: Number(searchParams.get("priceMax")) || 5000,
    areaMin: Number(searchParams.get("areaMin")) || 0,
    areaMax: Number(searchParams.get("areaMax")) || 300,
    rooms:
      searchParams.get("rooms") !== null
        ? Number(searchParams.get("rooms"))
        : -1,
  };

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

  // 2) Fetch properties when URL changes
  useEffect(() => {
    if (!filters.city || !filters.type || !filters.contract) return;

    async function load() {
      setLoading(true);

      const res = await fetch(
        `${apiUrl}/properties/search?city=${filters.city}&type=${filters.type}&contract=${filters.contract}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}&areaMin=${filters.areaMin}&areaMax=${filters.areaMax}&rooms=${filters.rooms}&polygon=${encodedPolygon}`
      );

      const data = await res.json();
      setProperties(data.properties || []);
      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, apiUrl, encodedPolygon]);

  // 3) When user changes a filter → navigate()
  const onFilterChange = (updated: Partial<Filters>) => {
    const merged = { ...filters, ...updated };

    navigate(
      `/searchproperty?city=${merged.city}&type=${merged.type}&contract=${merged.contract}&priceMin=${merged.priceMin}&priceMax=${merged.priceMax}&areaMin=${merged.areaMin}&areaMax=${merged.areaMax}&rooms=${merged.rooms}&polygon=${encodedPolygon}`
    );
  };

  return (
    <div className="min-h-screen w-full">
      <div className="h-20 bg-linear-to-r from-teal-800 via-teal-400 to-teal-300"></div>

      <div className="mx-auto pb-20 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 px-10">
        {/* Sidebar */}
        <aside className=" h-fit sticky top-30">
          <SearchFilters
            filters={filters}
            onChange={onFilterChange}
            contracts={contracts}
            types={types}
            cities={cities}
          />
        </aside>

        {/* Results */}
        <main className="px-0 pt-15">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : properties.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in-scale">
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
            <EmptyState
              title="No properties found"
              message="Try adjusting your filters or drawing a different area on the map."
            />
          )}
        </main>
      </div>
    </div>
  );
}
