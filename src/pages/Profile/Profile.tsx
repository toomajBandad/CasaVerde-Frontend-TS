import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { MdSpaceDashboard } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { TbHelpHexagonFilled } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import AuthContext from "../../contexts/AuthContext";
import Dashboard from "../../component-backup/Dashboard/Dashboard";
import UserProperties from "../../component-backup/UserProperties/UserProperties";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UserFavorites from "../../component-backup/UserFavorites/UserFavorites";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { SiCmake } from "react-icons/si";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { grey } from "@mui/material/colors";
import Credits from "../../component-backup/Credits/Credits";

export default function Profile() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  function getUserData() {
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      let userToken = JSON.parse(userLocal).token;
      fetch(`${apiUrl}/users/me`, {
        method: "GET",
        headers: { authorization: `Bearer ${userToken}` },
      })
        .then((res) => {
          if (res.ok === true) {
            return res.json();
          }
        })
        .then((data) => {
          authContext.login(data.user, userToken);
          console.log("login done");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logoutHandler() {
    Swal.fire({
      title: "Log Out ?",
      text: "Are you sure you want to log out ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4fc074",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do this!",
    }).then((result) => {
      if (result.isConfirmed) {
        authContext.logout();
        navigate("/");
        Swal.fire({
          title: "success!",
          text: "You have been log out successfully",
          icon: "success",
        });
      }
    });
  }

  const menuItems = [
    { id: 1, name: "Dashboard", icon: <MdSpaceDashboard /> },
    { id: 2, name: "Favorites", icon: <MdFavorite /> },
    { id: 3, name: "Properties", icon: <FaBuilding /> },
    { id: 4, name: "Credits", icon: <SiCmake /> },
  ];

  const [currentTab, setCurrentTab] = useState("Dashboard");

  return (
    <div className="profile">
      <div className="profile__sidebar">
        <div className="profile__sidebarLogo">Select Menu</div>
        <ul className="profile__sidebarWrapper">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={
                currentTab === item.name
                  ? "profile__sidebarItem active"
                  : "profile__sidebarItem"
              }
              onClick={() => setCurrentTab(item.name)}
            >
              {item.icon} {item.name}
            </li>
          ))}
          <li className="profile__sidebarItem" onClick={() => logoutHandler()}>
            <LuLogOut />
            Log out
          </li>
        </ul>
        <div className="profile__sidebarMobileWrapper">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sidebarMobile">Menu</InputLabel>
            <Select
              labelId="sidebarMobile"
              id="sidebarMobile"
              value={currentTab}
              label="Age"
              onChange={(event) => setCurrentTab(event.target.value)}
              color={grey[50]}
            >
              <MenuItem value="Dashboard">Dashboard</MenuItem>
              <MenuItem value="Favorites">Favorites</MenuItem>
              <MenuItem value="Properties">Properties</MenuItem>
              <MenuItem value="Credits">Credits</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="profile__mainbar__wrapper">
        <div className="profile__mainbar">
          {currentTab === "Dashboard" && (
            <Dashboard
              currentUser={authContext.userInfos}
              updateUserInfos={authContext.updateUserInfos}
            />
          )}
          {currentTab === "Properties" && (
            <UserProperties currentUser={authContext.userInfos} />
          )}
          {currentTab === "Favorites" && <UserFavorites />}
          {currentTab === "Credits" && <Credits />}
        </div>
      </div>
    </div>
  );
}
