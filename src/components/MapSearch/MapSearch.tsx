import { useState } from "react";
import "./MapSearch.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "../../plugins/leaflet/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
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
    <div className="mapSearch__wrapper">
      <MapContainer
        className="mapSearch__Container"
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

      <button
        className="mapBtn selectBtn"
        onClick={() => {
          setPropLocation(mapMarker);
          setShowMap(false);
        }}
      >
        <IoLocationSharp className="drawBtn__icon" />
        Finalize Location
      </button>

      <button className="mapBtn closeBtn" onClick={() => setShowMap(false)}>
        <span>Close</span>
        <IoMdCloseCircle className="drawBtn__icon" />
      </button>

      <button className="mapBtn infoBtn">
        <span>Please select a location then click on "Finalize Location"</span>
      </button>
    </div>
  );
}
