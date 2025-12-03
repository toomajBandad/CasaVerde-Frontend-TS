import React, { useContext, useEffect, useState } from "react";
import "./SearchProp.css";
import TopSearchFilter from "../../component-backup/TopSearchFilter/TopSearchFilter";
import { useParams } from "react-router";
import PropertyCard from "../../component-backup/PropertyCard/PropertyCard";
import AuthContext from "../../contexts/AuthContext";
import NotFoundItem from "../../component-backup/NotFoundItem/NotFoundItem";
import TopMain from "../../component-backup/TopMain/TopMain";
import Grid from "@mui/material/Grid";
import PaginatioinUI from "../../component-backup/PaginatioinUI/PaginatioinUI";
import { useLocation } from "react-router-dom";

import { MoonLoader } from "react-spinners";

export default function SearchProp() {
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const authContext = useContext(AuthContext);
  const params = useParams();
  const [propertyArr, setPropertyArr] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [polyArray, setPolyArray] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");

  const [paginatedCart, setPaginatedCart] = useState([]);
  const location = useLocation();
  // const myArray = location.state?.data || [];

  useEffect(() => {
    setSelectedCity(params.city);
    setSelectedType(params.type);
    setSelectedContract(params.contract);
    setPolyArray(location.state.data);
  }, [params, params.city]);

  useEffect(() => {
    selectedCity &&
      selectedType &&
      selectedContract &&
      polyArray &&
      fetch(
        `${apiUrl}/properties/search/${selectedCity}/${selectedContract}/${selectedType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ polyArray: polyArray }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setPropertyArr(data.properties);
          setFilteredArr(data.properties);
        })
        .then(
          setTimeout(() => {
            setLoading(false);
          }, 700)
        );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, selectedContract, selectedType]);

  function addNoteHandler(itemId) {
    console.log(itemId);
  }

  function addFavoriteHandler(itemId) {
    fetch(`${apiUrl}/users/favorite/${authContext.userInfos._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: itemId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  function deleteFavoriteHandler(itemId) {
    fetch(`${apiUrl}/users/favorite/${authContext.userInfos._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: itemId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="SearchProps">
      <div className="filters__wrapper">
        <TopMain />
        <TopSearchFilter
          propertyArr={propertyArr}
          filteredArr={filteredArr}
          setFilteredArr={setFilteredArr}
        />
      </div>

      <div className="propertyCardWrapper">
        {loading ? (
          <div className="loadingWrapper">
            <MoonLoader size="90px" color="#01796f" loading={loading} />
            Is Loading...
          </div>
        ) : (
          <>
            <Grid container spacing={4}>
              {filteredArr.length ? (
                paginatedCart.map((item) => (
                  <Grid size={{ xs: 12, md: 12, lg: 6 }} key={item._id}>
                    <PropertyCard
                      item={item}
                      addNoteHandler={addNoteHandler}
                      addFavoriteHandler={addFavoriteHandler}
                      deleteFavoriteHandler={deleteFavoriteHandler}
                    />
                  </Grid>
                ))
              ) : (
                <NotFoundItem
                  errorTitle={"Could Not Find Any Item ! "}
                  errorText={"Sorry we did not find your selected property"}
                />
              )}
            </Grid>
            <PaginatioinUI
              allproperties={filteredArr}
              setPaginatedCart={setPaginatedCart}
              PropNumberInEachPage={4}
            />
          </>
        )}
      </div>
    </div>
  );
}
