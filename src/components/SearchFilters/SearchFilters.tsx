import type { TypeCategory } from "../../types/typeCategory";
import type { ContractCategory } from "../../types/contractCategory";
import type { City } from "../../types/city";

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

interface SearchFiltersProps {
  filters: Filters;
  onChange: (updated: Partial<Filters>) => void;
  contracts: ContractCategory[];
  types: TypeCategory[];
  cities: City[];
}

export default function SearchFilters({
  filters,
  onChange,
  contracts,
  types,
  cities,
}: SearchFiltersProps) {
  const priceOptions = [0, 500, 1000, 1500, 2000, 3000, 5000];
  const areaOptions = [0, 30, 50, 70, 100, 150, 200, 300];
  const roomOptions = [-1, 0, 1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
      {/* Contract buttons */}
      <div className="flex justify-center items-center gap-0">
        {contracts.map((item) => (
          <button
            key={item._id}
            onClick={() => onChange({ contract: item.name })}
            className={`px-4 py-2 font-bold border-2 cursor-pointer transition ${
              filters.contract === item.name
                ? "bg-Jade border-Pine text-Pine"
                : "bg-white text-gray-600 border-Pine"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Type */}
      <select
        className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer"
        value={filters.type}
        onChange={(e) => onChange({ type: e.target.value })}
      >
        {types.map((item) => (
          <option key={item._id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      {/* City */}
      <select
        className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer"
        value={filters.city}
        onChange={(e) => onChange({ city: e.target.value })}
      >
        {cities.map((item) => (
          <option key={item._id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      {/* Min Price */}
      <select
        className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer"
        value={filters.priceMin}
        onChange={(e) => onChange({ priceMin: Number(e.target.value) })}
      >
        {priceOptions.map((p) => (
          <option key={p} value={p}>
            Min €{p}
          </option>
        ))}
      </select>

      {/* Max Price */}
      <select
        className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer"
        value={filters.priceMax}
        onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
      >
        {priceOptions.map((p) => (
          <option key={p} value={p}>
            Max €{p}
          </option>
        ))}
      </select>

      {/* Min Area */}
      <select
        className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer"
        value={filters.areaMin}
        onChange={(e) => onChange({ areaMin: Number(e.target.value) })}
      >
        {areaOptions.map((a) => (
          <option key={a} value={a}>
            Min {a} m²
          </option>
        ))}
      </select>

      {/* Max Area */}
      <select
        className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer"
        value={filters.areaMax}
        onChange={(e) => onChange({ areaMax: Number(e.target.value) })}
      >
        {areaOptions.map((a) => (
          <option key={a} value={a}>
            Max {a} m²
          </option>
        ))}
      </select>

      {/* Rooms */}
      <select
        className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer"
        value={filters.rooms}
        onChange={(e) => onChange({ rooms: Number(e.target.value) })}
      >
        {roomOptions.map((r) => (
          <option key={r} value={r}>
            {r === -1
              ? "Any"
              : r === 0
              ? "No bedrooms"
              : r === 1
              ? "1 room"
              : `${r} rooms`}
          </option>
        ))}
      </select>
    </div>
  );
}
