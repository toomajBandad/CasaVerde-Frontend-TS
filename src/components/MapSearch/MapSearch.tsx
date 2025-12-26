import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

interface MapSearchProps {
  mapCenter: [number, number];
  showMap: boolean;
  setPropLocation: (coords: [number, number]) => void;
  setShowMap: (value: boolean) => void;
}

export default function MapSearch({
  mapCenter,
  showMap,
  setPropLocation,
  setShowMap,
}: MapSearchProps) {
  const [mapMarker, setMapMarker] = useState<[number, number]>(mapCenter);

  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [18, 30],
  });

  const LocationLogger = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMapMarker([lat, lng]);
      },
    });
    return null;
  };

  if (!showMap) return null;

  return (
    <div
      className="
        absolute h-[80vh]
        w-full left-0
        md:w-[30%] md:left-[15px] md:top-40
        top-[9vh]
      "
    >
      <MapContainer
        className="h-[80vh] w-full z-1"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationLogger />

        <Marker position={mapMarker} icon={customIcon}>
          <Popup>Selected Location</Popup>
        </Marker>
      </MapContainer>

      {/* Finalize Button */}
      <button
        className="
          flex items-center gap-2 absolute top-0 left-[38px]
          bg-black/75 text-white px-3 py-2 rounded-lg cursor-pointer m-2
          hover:bg-black z-99
        "
        onClick={() => {
          setPropLocation(mapMarker);
          setShowMap(false);
        }}
      >
        <IoLocationSharp className="text-Mint text-lg" />
        Finalize Location
      </button>

      {/* Close Button */}
      <button
        className="
          flex items-center gap-2 absolute top-0 right-[3px]
          bg-black/75 text-white px-3 py-2 rounded-lg cursor-pointer m-2
          hover:bg-black z-99
        "
        onClick={() => setShowMap(false)}
      >
        <span>Close</span>
        <IoMdCloseCircle className="text-Mint text-lg" />
      </button>

      {/* Info Button */}
      <button
        className="
          flex items-center gap-2 absolute bottom-0 right-0
          bg-black/75 text-white px-3 py-2 rounded-lg cursor-pointer m-2
          hover:bg-black z-99
        "
      >
        <span>Please select a location then click on "Finalize Location"</span>
      </button>
    </div>
  );
}
