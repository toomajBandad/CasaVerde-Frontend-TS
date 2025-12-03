import { React, useState } from "react";
import "./MapSearch.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  FeatureGroup,
  Polyline,
} from "react-leaflet";
import "../../plugins/leaflet/leaflet.css"; // Ensure you have the correct path to your Leaflet CSS
import L from "leaflet"; // Import Leaflet icons
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import PolyDrawer from "./PolyDrawer/PolyDrawer";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

export default function MapSearch({
  mapCenter,
  showMap,
  setPropLocation,
  setShowMap,
}) {
  const [mapMarker, setMapMarker] = useState(mapCenter);

  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [18, 30],
  });

  // function handlePolygon(coords) {
  //   console.log("Polygon coordinates:", coords);
  // }

  const LocationLogger = () => {
    useMapEvents({
      click(e) {
        console.log("Clicked location:", e.latlng);
        setMapMarker([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    showMap && (
      <div className="mapSearch__wrapper">
        <MapContainer
          className="mapSearch__Container"
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <PolyDrawer onPolygonCreated={handlePolygon} /> */}
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
        <button
          className="mapBtn closeBtn"
          onClick={() => {
            setShowMap(false);
          }}
        >
          <span>Close</span>
          <IoMdCloseCircle className="drawBtn__icon" />
        </button>
        <button className="mapBtn infoBtn">
          <span>Please select a location then click on "Finalize Location"</span>
        </button>
      </div>
    )
  );
}
