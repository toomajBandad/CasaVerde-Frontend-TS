import { useFormContext } from "react-hook-form";
import MainInput from "../../MainInput/MainInput";
import { useState } from "react";
import MapSearch from "../../MapSearch/MapSearch";

const CITY_CENTERS: Record<string, [number, number]> = {
  Madrid: [40.4168, -3.7038],
  Barcelona: [41.3851, 2.1734],
  Valencia: [39.4699, -0.3763],
};

export default function LocationStep() {
  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const [city, setCity] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    40.4167, -3.7033,
  ]);
  const [isShowMap, setIsShowMap] = useState(false);

  // Visible input value
  const latlngDisplay = watch("latlngDisplay");

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCity(value);

    if (CITY_CENTERS[value]) {
      const [lat, lng] = CITY_CENTERS[value];
      setMapCenter([lat, lng]);
    }
  };

  const handleLocationSelect = async (coords: [number, number]) => {
    const [lat, lng] = coords;

    // Save REAL object for backend
    setValue("latlng", {
      type: "Point",
      coordinates: coords,
    });

    // Save STRING for visible input
    setValue("latlngDisplay", `${lat.toFixed(5)}, ${lng.toFixed(5)}`);

    await trigger("latlng");
  };

  // Register latlng object (no input)
  register("latlng", {
    required: "You must select a location on the map",
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Location</h2>

      {/* City */}
      <label className="block font-medium">City</label>
      <select
        className="w-full border rounded px-3 py-2"
        {...register("city", { required: "City is required" })}
        onChange={handleCityChange}
      >
        <option value="">Select a city</option>
        <option value="Madrid">Madrid</option>
        <option value="Barcelona">Barcelona</option>
        <option value="Valencia">Valencia</option>
      </select>
      <p className="text-red-500 text-sm">{errors.city?.message as string}</p>

      {/* Select on Map */}
      <button
        type="button"
        onClick={() => setIsShowMap(true)}
        disabled={!city}
        className={`px-4 py-2 rounded text-white ${
          city ? "bg-teal-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Select on Map
      </button>

      {/* Visible Lat/Lng Input */}
      <div>
        <label className="block font-medium">Selected Coordinates</label>
        <input
          type="text"
          readOnly
          placeholder="No location selected"
          className="w-full border rounded px-3 py-2 bg-gray-900/80 text-gray-200"
          {...register("latlngDisplay")}
          value={latlngDisplay || ""}
        />
        <p className="text-red-500 text-sm">
          {errors.latlng?.message as string}
        </p>
      </div>

      {/* Map */}
      {isShowMap && (
        <MapSearch
          mapCenter={mapCenter}
          showMap={isShowMap}
          setPropLocation={handleLocationSelect}
          setShowMap={setIsShowMap}
        />
      )}

      {/* Address */}
      <MainInput
        type="text"
        placeholder="Full address or area"
        label="Full address or area"
        required={true}
        {...register("location", {
          required: "Location is required",
          minLength: { value: 4, message: "Minimum 4 characters" },
          maxLength: { value: 30, message: "Maximum 30 characters" },
        })}
        error={errors.location?.message as string}
      />
    </div>
  );
}
