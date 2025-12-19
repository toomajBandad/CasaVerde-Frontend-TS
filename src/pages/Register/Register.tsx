import { useContext } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { User } from "../../types/user";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import MainBtn from "../../components/MainBtn/MainBtn";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  login: (user: User, token: string) => void;
  logout: () => void;
}

export default function Register() {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext) as AuthContextType;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (formDatas) => {
    try {
      const res = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDatas),
      });

      const result = await res.json();

      if (res.ok && result.user) {
        sendEmailToUser(result.user.id);
        authContext.login(result.user, result.access_token);

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Welcome to Casa Verde! You can now explore properties.",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/"), 2000);
      } else {
        authContext.logout();
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
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
    }
  };

  function sendEmailToUser(userId: string) {
    fetch(`${apiUrl}/users/sendMail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        type: "Welcome",
        subject: "Welcome from Casa Verde",
      }),
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-Pine to-Seafoam pt-20">
      <div className="flex flex-col md:flex-row bg-white rounded-8xl shadow-lg overflow-hidden">
        <div className="md:w-1/2">
          <img
            src="/images/sides/1.jpg"
            alt="side"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
            Register Now
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Username"
              className="border rounded px-3 py-2 w-full"
              {...register("username", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
            />
            {errors.username && (
              <span className="text-red-600 text-sm">Invalid username</span>
            )}

            <input
              type="email"
              placeholder="Email"
              className="border rounded px-3 py-2 w-full"
              {...register("email", {
                required: true,
                minLength: 10,
                maxLength: 35,
                pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">Invalid email</span>
            )}

            <input
              type="password"
              placeholder="Password"
              className="border rounded px-3 py-2 w-full"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 35,
                pattern: /^(?=.*[0-9])(?=.*[A-Z]).{6,}$/,
              })}
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                Password must be at least 6 chars, include a capital letter and
                a number
              </span>
            )}
            <MainBtn type="submit">Register</MainBtn>
            {/* <button
              type="submit"
              className="bg-Pine text-Jade font-bold py-2 px-4 rounded hover:bg-green-900 hover:text-green-100 transition"
            >
              Register
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
}
