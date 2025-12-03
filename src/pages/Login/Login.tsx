import React, { useState, useContext } from "react";
import "./Login.css";
// import sideImg from "/images/sides/1.jpg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import ModalMaterial from "../../component-backup/ModalMaterial/ModalMaterial";
import AuthContext from "../../contexts/AuthContext";

export default function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [isShowModal, setIsShowModal] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(true);

  const modalText = {
    success: "Login succes! You can find your favorites",
    fail: "Login Fail. Please try again Later",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formDatas) => {
    await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formDatas.username,
        password: formDatas.password,
      }),
    })
      .then((response) => {
        if (response.ok === true) {
          setIsModalSuccess(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setIsModalSuccess(false);
          authContext.logout();
        }
        setIsShowModal(true);
        return response.json();
      })
      .then((result) => {
        if (result.token) {
          authContext.login(result.user, result.token);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsModalSuccess(false);
        setIsShowModal(true);
      });
  };

  return (
    <div className="Register">
      <div className="Register__wrapper">
        <div className="Register__fotoContainer">
          <img className="Register__foto" src="/images/sides/1.jpg" />
        </div>
        <div className="RegisterForm__Container">
          <div className="RegisterForm__Title">Login Now</div>
          <form className="RegisterForm" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className="RegisterForm__input"
              type="text"
              {...register("username", {
                required: true,
                maxLength: 35,
                minLength: 6,
              })}
              aria-invalid={errors.username ? "true" : "false"}
              error={errors.username}
              id="loginForm__username"
              label="username"
              defaultValue=""
              name="username"
              autoComplete="username"
              helperText={
                errors.username ? "Please enter valid username!" : null
              }
              variant="standard"
            />
            <TextField
              className="RegisterForm__input"
              type="password"
              {...register("password", {
                required: true,
                maxLength: 35,
                minLength: 6,
              })}
              aria-invalid={errors.password ? "true" : "false"}
              error={errors.password}
              id="loginForm__password"
              label="Password"
              autoComplete="current-password"
              defaultValue=""
              name="password"
              helperText={
                errors.password ? "Please enter correct password! " : null
              }
              variant="standard"
            />
            {errors.exampleRequired && <span>This field is required</span>}
            <Button
              variant="contained"
              className="RegisterForm__button"
              type="submit"
              value="Register"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
      <ModalMaterial
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        isModalSuccess={isModalSuccess}
        modalText={modalText}
      />
    </div>
  );
}
