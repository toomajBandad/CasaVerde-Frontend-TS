import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MainBtn from "../../components/MainBtn/MainBtn";
import MainTitle from "../../components/MainTitle/MainTitle";
import MainInput from "../../components/MainInput/MainInput";

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function Login() {
  const authContext = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (formDatas) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/users/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ critical for cookies
        body: JSON.stringify(formDatas),
      });

      const result = await res.json();

      if (res.ok) {
        authContext.login();

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome to Casa Verde! You can now explore properties.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate("/"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: result.message || "Please try again later.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-Pine to-Seafoam pt-20">
      <div className="flex flex-col md:flex-row bg-white rounded-8xl shadow-lg overflow-hidden">
        {/* Left side image */}
        <div className="md:w-1/2">
          <img
            src="/images/sides/1.jpg"
            alt="side"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <MainTitle level={2} gradient={true}>
            Login to Your Account
          </MainTitle>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-10 gap-5"
          >
            <MainInput
              type="text"
              placeholder="Username"
              label="Username"
              required={true}
              {...register("username", {
                required: "Username is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                maxLength: { value: 20, message: "Maximum 20 characters" },
              })}
              error={errors.username?.message}
            />

            <MainInput
              type="password" // ✅ secure input
              placeholder="Password"
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                maxLength: { value: 35, message: "Maximum 35 characters" },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[A-Z]).{6,}$/,
                  message: "Must include a capital letter and a number",
                },
              })}
              error={errors.password?.message}
            />

            <MainBtn type="submit" className="mt-20" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </MainBtn>
          </form>
        </div>
      </div>
    </div>
  );
}
