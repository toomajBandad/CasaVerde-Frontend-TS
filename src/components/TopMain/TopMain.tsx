import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { LuMapPinned } from "react-icons/lu";
import { useNavigate } from "react-router";

import {
  fetchContractCategories,
  fetchTypeCategories,
} from "../../services/categoriesService";

import { fetchCities } from "../../services/citiesService";

import type { TypeCategory } from "../../types/typeCategory";
import type { ContractCategory } from "../../types/contractCategory";
import type { City } from "../../types/city";
import PolyDrawer from "../MapSearch/PolyDrawer/PolyDrawer";

export default function TopMain() {
  const navigate = useNavigate();

  const [contractCat, setContractCat] = useState<string>("RENT");
  const [contractsCatItems, setContractsCatItems] = useState<
    ContractCategory[]
  >([]);

  const [typeCat, setTypeCat] = useState<string>("Apartment");
  const [typeCatItems, setTypeCatItems] = useState<TypeCategory[]>([]);

  const [city, setCity] = useState<string>("Madrid");
  const [cities, setCities] = useState<City[]>([]);

  const [isShowMap, setIsShowMap] = useState<boolean>(false);

  // Fetch contract + type categories + cities
  useEffect(() => {
    const loadData = async () => {
      try {
        const [contracts, types, citiesData] = await Promise.all([
          fetchContractCategories(),
          fetchTypeCategories(),
          fetchCities(),
        ]);

        setContractsCatItems(contracts);
        setTypeCatItems(types);
        setCities(citiesData);

        // Default city = first city from backend
        if (citiesData.length > 0) {
          setCity(citiesData[0].name);
        }
      } catch (err) {
        console.error("Failed to load filters:", err);
      }
    };

    loadData();
  }, []);

  const handleSearch = () => {
    navigate(
      `/searchproperty?city=${city}&type=${typeCat}&contract=${contractCat}`
    );
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 my-4 md:my-8 w-full">
      {/* Contract buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
        <div className="flex justify-center items-center gap-0">
          {contractsCatItems.map((item) => (
            <button
              key={item._id}
              value={item.name}
              onClick={(e) => setContractCat(e.currentTarget.value)}
              className={`px-4 py-2 font-bold border-2 cursor-pointer transition ${
                contractCat === item.name
                  ? "bg-Jade border-Pine text-Pine"
                  : "bg-white text-gray-600 border-Pine"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Property Type */}
        <div className="flex justify-center items-center">
          <select
            className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer"
            value={typeCat}
            onChange={(e) => setTypeCat(e.target.value)}
          >
            {typeCatItems.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* City */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
        <div className="flex justify-center items-center">
          <select
            className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {cities.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search + Map Buttons */}
      <div className="flex justify-center items-center gap-2">
        <button
          className="flex items-center gap-2 px-6 py-2 font-bold text-white bg-green-500 transition hover:bg-Pine"
          onClick={handleSearch}
        >
          <FaSearch />
          Search
        </button>

        <button
          className="flex items-center gap-2 px-6 py-2 font-bold text-white bg-green-500 transition hover:bg-Pine"
          onClick={() => setIsShowMap(true)}
        >
          <LuMapPinned />
          Map
        </button>
      </div>

      {isShowMap && (
        <PolyDrawer
          setIsShowMap={setIsShowMap}
          handleSearch={handleSearch}
          setPolyArray={() => {}}
          cities={cities}
          city={city}
          typeCat={typeCat}
          contractCat={contractCat}
        />
      )}
    </div>
  );
}
