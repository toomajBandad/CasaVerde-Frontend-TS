import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvents,
  Polygon,
} from "react-leaflet";
import L from "leaflet";
import iconImage from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { FaDrawPolygon } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";

interface PolyDrawerProps {
  setIsShowMap: (value: boolean) => void;
  handleSearch: () => void;
  setPolyArray: (coords: [number, number][]) => void;
  mapCenter: [number, number];
  city: string;
  typeCat: string;
  contractCat: string;
}

interface LocationItem {
  _id: string;
  title: string;
  price: number;
  latlng: [number, number];
}

interface PolygonDrawerProps {
  isDrawing: boolean;
  addPoint: (point: [number, number]) => void;
}

const PolygonDrawer = ({ isDrawing, addPoint }: PolygonDrawerProps) => {
  useMapEvents({
    click(e) {
      if (isDrawing) {
        addPoint([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
};

export default function PolyDrawer({
  setIsShowMap,
  handleSearch,
  setPolyArray,
  mapCenter,
  city,
  typeCat,
  contractCat,
}: PolyDrawerProps) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const customIcon = new L.Icon({
    iconUrl: iconImage,
    iconSize: [18, 30],
  });

  const [polygonCoords, setPolygonCoords] = useState<[number, number][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [allLocations, setAllLocations] = useState<LocationItem[]>([]);
  const [isDisableShowList, setIsDisableShowList] = useState(true);

  const startDrawing = () => {
    setPolygonCoords([]);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    setPolyArray(polygonCoords);

    fetch(`${apiUrl}/properties/search/locations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ polygonCoords, city, typeCat, contractCat }),
    })
      .then((res) => {
        if (res.ok) {
          setIsDisableShowList(false);
          return res.json();
        } else {
          setIsDisableShowList(true);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No property found! Please try again",
          });
        }
      })
      .then((data) => {
        if (data?.results) {
          setAllLocations(data.results);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="absolute top-[47px] left-0 h-[48vh] w-full">
      <MapContainer
        className="h-[48vh] w-full z-[1]"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {allLocations.map((item) => (
          <Marker position={item.latlng} icon={customIcon} key={item._id}>
            <Popup>
              {item.title} — {item.price} $
            </Popup>
          </Marker>
        ))}

        <PolygonDrawer
          isDrawing={isDrawing}
          addPoint={(point) => setPolygonCoords([...polygonCoords, point])}
        />

        <Polygon
          positions={polygonCoords}
          pathOptions={{ color: "#01796f" }}
          weight={3}
        />
      </MapContainer>

      {/* Buttons */}
      <button
        className="flex items-center gap-2 absolute top-0 left-[38px] bg-black/75 text-white px-3 py-2 rounded-lg cursor-pointer m-2 hover:bg-black z-[99]"
        onClick={startDrawing}
      >
        <FaDrawPolygon className="text-[var(--Mint-Green)] text-lg" />
        Draw Your Area
      </button>

      <button
        className="flex items-center gap-2 absolute top-0 left-[181px] bg-black/75 text-white px-3 py-2 rounded-lg cursor-pointer m-2 hover:bg-black z-[99]"
        onClick={finishDrawing}
      >
        <IoLockClosed className="text-[var(--Mint-Green)] text-lg" />
        Finish Drawing
      </button>

      <button
        disabled={isDisableShowList}
        className={`flex items-center gap-2 absolute top-0 left-[320px] px-3 py-2 rounded-lg cursor-pointer m-2 z-[99] ${
          isDisableShowList
            ? "bg-gray-500 text-white"
            : "bg-black/75 text-white hover:bg-black"
        }`}
        onClick={() => {
          handleSearch();
          setIsShowMap(false);
        }}
      >
        <CiBoxList className="text-[var(--Mint-Green)] text-lg" />
        Show List
      </button>

      <button
        className="flex items-center gap-2 absolute top-0 right-[10px] bg-black/75 text-white px-3 py-2 rounded-lg cursor-pointer m-2 hover:bg-black z-[99]"
        onClick={() => {
          setIsShowMap(false);
          setPolyArray([]);
        }}
      >
        <span>Close</span>
        <IoMdCloseCircle className="text-[var(--Mint-Green)] text-lg" />
      </button>
    </div>
  );
}
