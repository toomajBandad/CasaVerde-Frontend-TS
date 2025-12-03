import React, { useState, useContext, useEffect } from "react";
import "./NewProperty.css";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import ModalMaterial from "../../component-backup/ModalMaterial/ModalMaterial";
import Swal from "sweetalert2";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AuthContext from "../../contexts/AuthContext";
// import sideImg from "/images/backgrounds/top2.jpg";
import { useNavigate } from "react-router";
import { FileUploader } from "../../component-backup/FileUploader/FileUploader";
import MapSearch from "../../component-backup/MapSearch/MapSearch";

export default function NewProperty() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [bedrooms, setbedrooms] = useState("1");
  const [bathrooms, setbathrooms] = useState("1");
  const [couples, setcouples] = useState("true");
  const [pets, setpets] = useState("true");
  const [minors, setminors] = useState("true");
  const [duration, setduration] = useState("3 Months");
  const [contractCategory, setContractCategory] = useState("BUY");
  const [typeCategory, setTypeCategory] = useState("Apartment");
  const [city, setCity] = useState("Madrid");

  const [uploadedFile, setUploadedFile] = useState([]);
  const [isDisactive, setIsDisactive] = useState(false);

  const [isShowModal, setIsShowModal] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(true);

  const [showMap, setShowMap] = useState(false);
  const [propLocation, setPropLocation] = useState([]);
  const [centerTheMap, setCenterTheMap] = useState([40.4168, -3.7038]);

  useEffect(() => {
    if (isShowModal && isModalSuccess) {
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowModal]);

  const modalText = {
    success: "Now your property is registered!",
    fail: "Property register Fail. Please try again Later",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formDatas) => {
    let propertyData = {
      title: formDatas.title,
      desc: formDatas.desc,
      price: formDatas.price,
      location: formDatas.location,
      duration: formDatas.duration,
      bedrooms: formDatas.bedrooms,
      bathrooms: formDatas.bathrooms,
      couples: formDatas.couples,
      pets: formDatas.pets,
      minors: formDatas.minors,
      owner: authContext.userInfos._id,
      contractCategory: formDatas.contractCategory,
      typeCategory: formDatas.typeCategory,
      image: uploadedFile,
      city: formDatas.city,
      latlng: propLocation,
      area: formDatas.area,
    };
    if (propLocation.length) {
      await fetch(`${apiUrl}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      })
        .then((resposnse) => {
          if (resposnse.status === 201) {
            setIsModalSuccess(true);
          } else {
            setIsModalSuccess(false);
          }
          setIsShowModal(true);
          console.log(resposnse);
          console.log(propertyData);
        })
        .catch((err) => {
          console.log(err);
          setIsModalSuccess(false);
          setIsShowModal(true);
        });
    } else {
      Swal.fire({
        title: "Please select correct location firsts",
        icon: "error",
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className="NewProperty">
        <div className="Property__wrapper">
          <div className="PropertyForm__imageWrapper">
            <img
              className="PropertyForm__image"
              src="/images/backgrounds/top2.jpg"
            />
          </div>

          <div className="PropertyForm__Container">
            <div className="PropertyForm__Title mainTitle">
              Crerate your new property
            </div>
            <form className="PropertyForm" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                className="PropertyForm__input"
                size="small"
                type="text"
                {...register("title", {
                  required: true,
                  // maxLength: 20,
                  minLength: 6,
                })}
                aria-invalid={errors.title ? "true" : "false"}
                error={errors.title}
                label="Title"
                defaultValue=""
                helperText={errors.title ? "Please enter valid title!" : null}
                variant="standard"
              />
              <div className="inputHolder">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-typeCategory">typeCategory</InputLabel>
                  <Select
                    {...register("typeCategory", {
                      required: true,
                    })}
                    labelId="select-typeCategory"
                    id="demo-simple-select"
                    value={typeCategory}
                    label="typeCategory"
                    onChange={(event) => setTypeCategory(event.target.value)}
                  >
                    <MenuItem value="Apartment">Apartment</MenuItem>
                    <MenuItem value="Villa">Villa</MenuItem>
                    <MenuItem value="Flat">Flat</MenuItem>
                    <MenuItem value="Room">Room</MenuItem>
                    <MenuItem value="Office">Office</MenuItem>
                    <MenuItem value="Garage">Garage</MenuItem>
                    <MenuItem value="Storage">Storage</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="inputHolder">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-city">City</InputLabel>
                  <Select
                    {...register("city", {
                      required: true,
                    })}
                    labelId="select-city"
                    id="demo-simple-select"
                    value={city}
                    label="city"
                    alt="test"
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (e.target.value === "Madrid") {
                        setCenterTheMap([40.4168, -3.7038]);
                      } else if (e.target.value === "Barcelona") {
                        setCenterTheMap([41.3874, 2.1688]);
                      } else if (e.target.value === "Valencia") {
                        setCenterTheMap([39.4738, -0.3756]);
                      }
                    }}
                  >
                    <MenuItem value="Madrid" alt={[40.4168, -3.7038]}>
                      Madrid
                    </MenuItem>
                    <MenuItem value="Barcelona" alt={[41.3874, 2.1688]}>
                      Barcelona
                    </MenuItem>
                    <MenuItem value="Valencia" alt={[39.4738, -0.3756]}>
                      Valencia
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="inputHolder">
                <TextField
                  className="PropertyForm__input"
                  type="text"
                  size="small"
                  {...register("location", {
                    required: true,
                    minLength: 6,
                  })}
                  aria-invalid={errors.location ? "true" : "false"}
                  error={errors.location}
                  label="Location"
                  defaultValue=""
                  helperText={
                    errors.location ? "Please enter valid location!" : null
                  }
                  variant="standard"
                />
                <Button
                  variant="contained"
                  className="Map__button"
                  onClick={() => setShowMap(true)}
                >
                  on map
                </Button>
              </div>

              <div className="inputHolder">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-contractCategory">
                    contractCategory
                  </InputLabel>
                  <Select
                    {...register("contractCategory", {
                      required: true,
                    })}
                    labelId="select-contractCategory"
                    id="demo-simple-select"
                    value={contractCategory}
                    label="contractCategory"
                    onChange={(event) =>
                      setContractCategory(event.target.value)
                    }
                  >
                    <MenuItem value="BUY">BUY</MenuItem>
                    <MenuItem value="RENT">RENT</MenuItem>
                    <MenuItem value="SHARE">SHARE</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="inputHolder">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-Bedrooms">Bedrooms</InputLabel>
                  <Select
                    {...register("bedrooms", {
                      required: true,
                    })}
                    labelId="select-Bedrooms"
                    id="demo-simple-select"
                    value={bedrooms}
                    label="Bedrooms"
                    onChange={(e) => setbedrooms(e.target.value)}
                  >
                    <MenuItem value="1">One</MenuItem>
                    <MenuItem value="2">Two</MenuItem>
                    <MenuItem value="3">Threa</MenuItem>
                    <MenuItem value="4">Four</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <TextField
                className="PropertyForm__input halfInput"
                type="number"
                size="small"
                {...register("price", {
                  required: true,
                })}
                aria-invalid={errors.price ? "true" : "false"}
                error={errors.price}
                id="standard-error-helper-text"
                label="Price"
                defaultValue=""
                helperText={
                  errors.price ? `Please enter correct price!  ` : null
                }
                variant="standard"
              />
              <div className="inputHolder">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-duration">Duration</InputLabel>
                  <Select
                    {...register("duration", {
                      required: true,
                    })}
                    labelId="select-duration"
                    id="demo-simple-select"
                    value={duration}
                    label="duration"
                    onChange={(event) => setduration(event.target.value)}
                  >
                    <MenuItem value="3 Months">3 Months</MenuItem>
                    <MenuItem value="6 Months">6 Months</MenuItem>
                    <MenuItem value="9 Months">9 Months</MenuItem>
                    <MenuItem value="12 Months">12 Months</MenuItem>
                    <MenuItem value="forever">forever</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="inputHolder">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-bathrooms">bathrooms</InputLabel>
                  <Select
                    {...register("bathrooms", {
                      required: true,
                    })}
                    labelId="select-bathrooms"
                    id="demo-simple-select"
                    value={bathrooms}
                    label="bathrooms"
                    onChange={(e) => setbathrooms(e.target.value)}
                  >
                    <MenuItem value="1">One</MenuItem>
                    <MenuItem value="2">Two</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="inputHolder">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-pets">PETS</InputLabel>
                  <Select
                    {...register("pets", {
                      required: true,
                    })}
                    labelId="select-pets"
                    id="demo-simple-select"
                    value={pets}
                    label="pets"
                    onChange={(e) => setpets(e.target.value)}
                  >
                    <MenuItem value="true">YES</MenuItem>
                    <MenuItem value="false">NO</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="inputHolder">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-couples">COUPLES</InputLabel>
                  <Select
                    {...register("couples", {
                      required: true,
                    })}
                    labelId="select-couples"
                    id="demo-simple-select"
                    value={couples}
                    label="couples"
                    onChange={(e) => setcouples(e.target.value)}
                  >
                    <MenuItem value="true">YES</MenuItem>
                    <MenuItem value="false">NO</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <TextField
                multiline
                rows={6}
                className="descInput PropertyForm__input"
                id="descInput"
                type="text"
                size="small"
                {...register("desc", {
                  required: true,
                  minLength: 10,
                })}
                aria-invalid={errors.desc ? "true" : "false"}
                error={errors.desc}
                label="Description"
                defaultValue=""
                helperText={errors.desc ? "Please enter valid desc!" : null}
                variant="standard"
              />
              <div className="inputHolder">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-minors">Minors Allowed</InputLabel>
                  <Select
                    {...register("minors", {
                      required: true,
                    })}
                    labelId="select-minors"
                    id="demo-simple-select"
                    value={minors}
                    label="minors"
                    onChange={(e) => setminors(e.target.value)}
                  >
                    <MenuItem value="true">YES</MenuItem>
                    <MenuItem value="false">NO</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {!isDisactive ? (
                <FileUploader
                  setUploadedFile={setUploadedFile}
                  setIsDisactive={setIsDisactive}
                />
              ) : (
                <span>foto is uploaded</span>
              )}

              <div className="inputHolder">
                <TextField
                  className="PropertyForm__input halfInput"
                  type="number"
                  size="small"
                  {...register("area", {
                    required: true,
                  })}
                  aria-invalid={errors.area ? "true" : "false"}
                  error={errors.area}
                  id="standard-error-helper-text"
                  label="area/m2"
                  defaultValue=""
                  helperText={
                    errors.area ? `Please enter correct area!  ` : null
                  }
                  variant="standard"
                />
              </div>

              <div className="PropertyForm__button__wraper">
                <Button
                  variant="contained"
                  className="PropertyForm__button"
                  type="submit"
                  value="Property"
                >
                  Create Property
                </Button>
              </div>
            </form>
            <MapSearch
              mapCenter={centerTheMap}
              showMap={showMap}
              setPropLocation={setPropLocation}
              setShowMap={setShowMap}
            />
          </div>
        </div>

        <ModalMaterial
          aria-hidden="false"
          aria-modal="true"
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          isModalSuccess={isModalSuccess}
          modalText={modalText}
        />
      </div>
    </>
  );
}
