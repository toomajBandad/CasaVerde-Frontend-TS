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
import { useNavigate } from "react-router";

interface PolyDrawerProps {
  setIsShowMap: (value: boolean) => void;
  handleSearch: () => void;
  setPolyArray: (coords: [number, number][]) => void;
  city: string;
  typeCat: string;
  contractCat: string;
  cities: { _id: string; name: string; location: [number, number] }[];
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
  city,
  typeCat,
  contractCat,
  cities,
}: PolyDrawerProps) {
  const navigate = useNavigate();

  const customIcon = new L.Icon({
    iconUrl: iconImage,
    iconSize: [18, 30],
  });

  const [polygonCoords, setPolygonCoords] = useState<[number, number][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [allLocations, setAllLocations] = useState<LocationItem[]>([]);
  const [isDisableShowList, setIsDisableShowList] = useState(true);

  const mapCenter = cities.find((c) => c.name === city)?.location || [
    40.4165, -3.70256,
  ];

  const startDrawing = () => {
    setPolygonCoords([]);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    console.log(polygonCoords, city, typeCat, contractCat);

    setIsDrawing(false);
    setPolyArray(polygonCoords);
    const encodedPolygon = encodeURIComponent(JSON.stringify(polygonCoords));

    navigate(
      `/searchproperty?city=${city}&type=${typeCat}&contract=${contractCat}&polygon=${encodedPolygon}`
    );
  };

  return (
    <div className="absolute top-0 left-0 h-204  w-full">
      <MapContainer
        className="h-full w-full z-1"
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
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-15 py-5 z-99">
        <div className="flex flex-row justify-start items-center gap-2 w-full">
          <button
            className="flex items-center gap-2 bg-black/75 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-black z-99"
            onClick={startDrawing}
          >
            <FaDrawPolygon className="text-Mint text-lg" />
            Draw Your Area
          </button>
          <button
            className="flex items-center gap-2  bg-black/75 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-black z-99"
            onClick={finishDrawing}
          >
            <IoLockClosed className="text-Mint text-lg" />
            Finish Drawing
          </button>
          <button
            disabled={isDisableShowList}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer z-99 ${
              isDisableShowList
                ? "bg-gray-400 text-white"
                : "bg-black/75 text-white hover:bg-black"
            }`}
            onClick={() => {
              handleSearch();
              setIsShowMap(false);
            }}
          >
            <CiBoxList className="text-Mint text-lg" />
            Show List
          </button>
        </div>
        <div>
          <button
            className="flex items-center gap-2 bg-black/75 text-white px-3 py-2 rounded-lg cursor-pointer  hover:bg-black z-99"
            onClick={() => {
              setIsShowMap(false);
              setPolyArray([]);
            }}
          >
            <span>Close</span>
            <IoMdCloseCircle className="text-Mint text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
