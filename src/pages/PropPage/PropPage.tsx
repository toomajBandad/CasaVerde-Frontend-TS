import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBath, FaBed, FaCity } from "react-icons/fa";
import { GiMoneyStack, GiDuration } from "react-icons/gi";
import { MdPets, MdChildCare } from "react-icons/md";
import { LiaVenusMarsSolid } from "react-icons/lia";
import { IoLocation } from "react-icons/io5";
import { BsCalendarDateFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { TbMeterSquare } from "react-icons/tb";
// import ShowPropMap from "../../component-backup/ShowPropMap/ShowPropMap";
import nofoto from "/images/properties/noimage.png";

type LatLng = {
  lat: number;
  lng: number;
};

type Category = {
  _id: string;
  name: string;
};

type Property = {
  _id: string;
  title: string;
  desc: string;
  image?: string;
  city: string;
  location: string;
  price: number;
  duration: string;
  bedrooms: number;
  bathrooms: number;
  pets: boolean;
  couples: boolean;
  minors: boolean;
  area: number;
  latlng?: LatLng;
  createdAt: string;
  typeCategory?: Category;
  contractCategory?: Category;
};

type RouteParams = {
  propId: string;
};

export default function PropPage() {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const { propId } = useParams<RouteParams>();

  const [propData, setPropData] = useState<Property | null>(null);
  const [createdDate, setCreatedDate] = useState<string>("");

  useEffect(() => {
    if (!propId) return;

    const fetchProperty = async () => {
      try {
        const res = await fetch(`${apiUrl}/properties/${propId}`);
        const data: Property = await res.json();
        setPropData(data);
        formatDate(data.createdAt);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    };

    fetchProperty();
  }, [apiUrl, propId]);

  function formatDate(iso: string) {
    const date = new Date(iso);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCreatedDate(date.toLocaleDateString(undefined, options));
  }

  if (!propData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading property...
      </div>
    );
  }

  return (
    <div className="w-full px-20 pt-24 space-y-10 bg-linear-to-br from-teal-700 via-teal-600 to-teal-400">
      {/* MAIN LAYOUT: IMAGE LEFT, DETAILS RIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: IMAGE */}
        <div className="w-full h-72 sm:h-96 md:h-full rounded-xl overflow-hidden shadow-lg">
          <img
            src={propData.image || nofoto}
            alt={propData.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div className="space-y-6">
          {/* Title + Description */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              {propData.title}
            </h1>
            <p className="text-gray-600 text-lg">{propData.desc}</p>
          </div>

          {/* Property Details */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Property Details
            </h2>

            <Detail
              icon={<BiCategory />}
              text={`${propData.typeCategory?.name ?? "Unknown"} Category`}
            />
            <Detail
              icon={<FaBath />}
              text={`${propData.bathrooms} Bathrooms`}
            />
            <Detail icon={<FaBed />} text={`${propData.bedrooms} Bedrooms`} />
            <Detail icon={<FaCity />} text={propData.city} />
            <Detail
              icon={<BiCategory />}
              text={`Contract: ${propData.contractCategory?.name ?? "Unknown"}`}
            />
            <Detail icon={<GiMoneyStack />} text={`${propData.price}$/month`} />
            <Detail
              icon={<BsCalendarDateFill />}
              text={`Registered on ${createdDate}`}
            />
          </div>

          {/* Additional Info */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Additional Info
            </h2>

            <Detail
              icon={<TbMeterSquare />}
              text={`${propData.area} m² area`}
            />
            <Detail
              icon={<GiDuration />}
              text={`${propData.duration} duration`}
            />
            <Detail
              icon={<IoLocation />}
              text={`Located in ${propData.location}`}
            />

            <Detail
              icon={<MdChildCare />}
              text={`Minors: ${
                propData.minors ? "Permitted" : "Not permitted"
              }`}
            />
            <Detail
              icon={<MdPets />}
              text={`Pets: ${propData.pets ? "Permitted" : "Not permitted"}`}
            />
            <Detail
              icon={<LiaVenusMarsSolid />}
              text={`Couples: ${
                propData.couples ? "Permitted" : "Not permitted"
              }`}
            />
          </div>
        </div>
      </div>

      {/* MAP */}
      {/* {propData.latlng && (
        <div className="w-full h-80 rounded-xl overflow-hidden shadow">
          <ShowPropMap mapCenter={propData.latlng} />
        </div>
      )} */}
    </div>
  );
}

type DetailProps = {
  icon: JSX.Element;
  text: string;
};

function Detail({ icon, text }: DetailProps) {
  return (
    <p className="flex items-center gap-3 text-gray-700 text-lg">
      <span className="text-teal-600 text-2xl">{icon}</span>
      {text}
    </p>
  );
}
