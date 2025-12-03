import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { LuMapPinned } from "react-icons/lu";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import PolyDrawer from "../MapSearch/PolyDrawer/PolyDrawer";

export default function TopMain() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [contractCat, setContractCat] = useState("");
  const [contractsCatItems, setContractsCatItems] = useState<any[]>([]);
  const [typeCat, setTypeCat] = useState("Apartment");
  const [typeCatItems, setTypeCatItems] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("Madrid");
  const [isShowMap, setIsShowMap] = useState(false);
  const [polyArray, setPolyArray] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    40.416775, -3.70379,
  ]);

  const Provinces = [
    { id: 1, name: "Madrid" },
    { id: 2, name: "Barcelona" },
    { id: 3, name: "Valencia" },
  ];

  // Fetch contract + type categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resContract = await fetch(`${apiUrl}/contractCategories`);
        const contractData = await resContract.json();
        setContractsCatItems(contractData.contractCategories);

        const resType = await fetch(`${apiUrl}/typeCategories`);
        const typeData = await resType.json();
        setTypeCatItems(typeData.typeCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  // Fetch cities whenever province changes
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${apiUrl}/cities/province/${province}`);
        const data = await res.json();
        setCityList(data.cities);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };

    fetchCities();
  }, [province, apiUrl]);

  const handleSearch = () => {
    if (!city || !contractCat || !typeCat) {
      Swal.fire({
        icon: "error",
        title: "Please, Select All Items",
        text: "There is some unselected item!",
      });
    } else {
      navigate(`/searchproperty/${city}/${typeCat}/${contractCat}`, {
        state: { data: polyArray },
      });
    }
  };

  const handleMap = () => {
    if (!city || !contractCat || !typeCat) {
      Swal.fire({
        icon: "error",
        title: "Please, Select All Items",
        text: "There is some unselected item!",
      });
    } else {
      setIsShowMap(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 my-4 md:my-8 w-full">
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

      {/* Province + City */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
        <div className="flex justify-center items-center">
          <select
            className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setCity("");
            }}
          >
            {Provinces.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center">
          <select
            id="citySelector"
            className="px-4 py-2 font-bold border-2 border-Pine bg-white text-gray-600 cursor-pointer w-60"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              const selectedCity = cityList.find(
                (c) => c.name === e.target.value
              );
              if (selectedCity?.location?.[0]) {
                setMapCenter(JSON.parse(selectedCity.location[0]));
              }
            }}
          >
            <option value="">Poblacion</option>
            {cityList.map((item) => (
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
          onClick={handleMap}
        >
          <LuMapPinned />
          Map
        </button>
      </div>

      {isShowMap && (
        <PolyDrawer
          setIsShowMap={setIsShowMap}
          handleSearch={handleSearch}
          setPolyArray={setPolyArray}
          mapCenter={mapCenter}
          city={city}
          typeCat={typeCat}
          contractCat={contractCat}
        />
      )}
    </div>
  );
}
