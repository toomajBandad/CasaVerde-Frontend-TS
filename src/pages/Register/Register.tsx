import React, { useContext, useState } from "react";
import "./../Login/Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import ModalMaterial from "../../component-backup/ModalMaterial/ModalMaterial";
import { Button } from "@mui/material";
import AuthContext from "../../contexts/AuthContext";

export default function Register() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [isShowModal, setIsShowModal] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(true);

  const modalText = {
    success: "Now your are ready to play our games!",
    fail: "Register Fail. Please try again Later",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formDatas) => {
    await fetch(`${apiUrl}/users/newUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formDatas.username,
        password: formDatas.password,
        email: formDatas.email,
      }),
    })
      .then((res) => {
        if (res.ok === true) {
          setIsModalSuccess(true);
        } else {
          setIsModalSuccess(false);
        }
        setIsShowModal(true);
        return res.json();
      })
      .then((result) => {
        if (result.user) {
          sendEmailToUser(result.user._id);
          authContext.login(result.user, result.access_token);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsModalSuccess(false);
        setIsShowModal(true);
      });
  };

  function sendEmailToUser(userId) {
    console.log("sendingEmail...", userId);
    fetch(`${apiUrl}/users/sendMail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        type: "Welcome",
        subject: "Welcome from Casa Verde",
      }),
    });
  }

  return (
    <div className="Register">
      <div className="Register__wrapper">
        <div className="Register__fotoContainer">
          <img className="Register__foto" src="/images/sides/1.jpg" />
        </div>
        <div className="RegisterForm__Container">
          <div className="RegisterForm__Title">Register Now</div>
          <form className="RegisterForm" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="text"
              className="RegisterForm__input"
              {...register("username", {
                required: true,
                maxLength: 20,
                minLength: 6,
              })}
              aria-invalid={errors.username ? "true" : "false"}
              error={errors.username}
              // id="standard-error-helper-text"
              label="username"
              defaultValue=""
              helperText={
                errors.username ? "Please enter valid username!" : null
              }
              variant="standard"
            />
            <TextField
              className="RegisterForm__input"
              type="text"
              {...register("email", {
                required: true,
                maxLength: 35,
                minLength: 10,
                pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              })}
              aria-invalid={errors.email ? "true" : "false"}
              error={errors.email}
              label="Email"
              defaultValue=""
              helperText={errors.email ? "Please enter valid email!" : null}
              variant="standard"
            />
            <TextField
              className="RegisterForm__input"
              type="text"
              {...register("password", {
                required: true,
                maxLength: 35,
                minLength: 6,
                pattern: /^(?=.*[0-9])(?=.*[A-Z]).{6,}$/,
              })}
              aria-invalid={errors.password ? "true" : "false"}
              error={errors.password}
              id="standard-error-helper-text"
              label="Password"
              defaultValue=""
              helperText={
                errors.password
                  ? `Please enter correct password! (Password must be 6 and include capitals and numbers) `
                  : null
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
              Register
            </Button>
          </form>
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
  );
}

// List of validation rules supported:
// required
// min
// max
// minLength
// maxLength
// pattern
// validate
