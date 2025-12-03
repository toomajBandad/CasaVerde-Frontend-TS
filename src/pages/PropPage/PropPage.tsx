import React, { useEffect, useState } from "react";
import "./PropPage.css";
import { useParams } from "react-router";
import ShowPropMap from "../../component-backup/ShowPropMap/ShowPropMap";
import { LiaVenusMarsSolid } from "react-icons/lia";
import { FaCity } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { MdChildCare } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { LuScrollText } from "react-icons/lu";
import { GiDuration } from "react-icons/gi";
import { FaHouseUser } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { TbMeterSquare } from "react-icons/tb";
import nofoto from "/images/properties/noimage.png";

export default function PropPage() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const params = useParams();

  const [propData, setPropData] = useState("");
  const [propId, setPropId] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    setPropId(params.propId);
  }, [params.propId]);

  useEffect(() => {
    if (propId) {
      fetch(`${apiUrl}/properties/${propId}`)
        .then((res) => res.json())
        .then((data) => {
          setPropData(data);
          createDate(data.createdAt);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propId]);

  function createDate() {
    const isoString = "2025-06-26T23:37:50.641Z";
    const date = new Date(isoString);

    // Options for formatting
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    setCreatedDate(date.toLocaleString(undefined, options));
  }

  return (
    <div className="PropPage">
      <div className="PropPage__container">
        <div className="PropPage__imgWrapper">
          <img
            className="PropPage__image"
            src={propData.image ? propData.image : nofoto}
            alt=""
          />
        </div>
        <div className="PropPage__body">
          <h3 className="PropPage__Title">{propData.title}</h3>
          <p className="PropPage__Sub">{propData.desc}</p>
          <div className="PropPage__body__Wrapper">
            <div className="PropPage__body__left">
              <p className="propPage__text">
                <BiCategory className="propPage__icon" />
                {propData.typeCategory ? propData.typeCategory.name : null}{" "}
                Category
              </p>
              <p className="propPage__text">
                <FaBath className="propPage__icon" />
                {propData.bathrooms} bathrooms
              </p>
              <p className="propPage__text">
                <FaBed className="propPage__icon" />
                {propData.bedrooms} bedrooms
              </p>
              <p className="propPage__text">
                <FaCity className="propPage__icon" />
                {propData.city} City
              </p>
              <p className="propPage__text">
                <BiCategory className="propPage__icon" /> Type the contract is{" "}
                {propData.contractCategory
                  ? propData.contractCategory.name
                  : null}{" "}
              </p>

              <p className="propPage__text">
                <GiMoneyStack className="propPage__icon" />
                {propData.price}$/month
              </p>
              <p className="propPage__text">
                <BsCalendarDateFill className="propPage__icon" />
                Registered at: <br /> {createdDate}
              </p>
            </div>
            <div className="PropPage__body__right">
              <p className="propPage__text">
                <TbMeterSquare className="propPage__icon" />
                {propData.area} square meters area
              </p>
              <p className="propPage__text">
                <GiDuration className="propPage__icon" />
                {propData.duration} duration
              </p>
              <p className="propPage__text">
                <IoLocation className="propPage__icon" />
                located in {propData.location}
              </p>
              <p className="propPage__text">
                <MdChildCare className="propPage__icon" />
                minors{" "}
                {propData.minors === "true" ? "permited" : "not permited"}
              </p>
              {/* <p className="propPage__text"><FaHouseUser  className="propPage__icon"/>owner : {propData.owner}</p> */}
              <p className="propPage__text">
                <MdPets className="propPage__icon" />
                pets {propData.pets === "true" ? "permited" : "not permited"}
              </p>
              <p className="propPage__text">
                <LiaVenusMarsSolid className="propPage__icon" />
                couples{" "}
                {propData.couples === "true" ? "permited" : "not permited"}
              </p>
            </div>
          </div>
        </div>
        <div className="PropPage__imgWrapper">
          {propData.latlng ? <ShowPropMap mapCenter={propData.latlng} /> : null}
        </div>
      </div>
    </div>
  );
}
