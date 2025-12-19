import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { User } from "../../types/user";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

interface LoginFormInputs {
  username: string;
  password: string;
}

interface AuthContextType {
  login: (user: User, token: string) => void;
  logout: () => void;
}

export default function Login() {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext) as AuthContextType;

  const [isShowModal, setIsShowModal] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(true);

  const modalText = {
    success: "Login success! You can find your favorites",
    fail: "Login failed. Please try again later",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (formDatas) => {
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDatas),
      });

      const result = await response.json();

      if (response.ok && result?.token) {
        authContext.login(result.user, result.token);
        setIsModalSuccess(true);
        setTimeout(() => navigate("/"), 2000);
      } else {
        authContext.logout();
        setIsModalSuccess(false);
      }
      setIsShowModal(true);
    } catch (err) {
      console.error(err);
      setIsModalSuccess(false);
      setIsShowModal(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-Pine via-teal-500 to-Jade">
      <div className="flex flex-col md:flex-row bg-white rounded-tl-8xl rounded-br-8xl rounded-bl-5xl rounded-tr-5xl shadow-lg overflow-hidden">
        <div className="md:w-1/2">
          <img
            src="/images/sides/1.jpg"
            alt="side"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-Pine mb-6 text-center font-Aladin">
            Login Now
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Username"
              className="px-3 py-2 w-full"
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
              type="password"
              placeholder="Password"
              className="px-3 py-2 w-full"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
            />
            {errors.password && (
              <span className="text-red-600 text-sm">Invalid password</span>
            )}

            <button
              type="submit"
              className="bg-Pine text-Jade font-bold py-2 px-4 rounded hover:bg-Jade hover:text-Pine hover:cursor-pointer transition"
            >
              Login
            </button>
          </form>

          {isShowModal && (
            <div
              className={`mt-4 p-3 rounded text-center ${
                isModalSuccess
                  ? "bg-green-200 text-green-900"
                  : "bg-red-200 text-red-900"
              }`}
            >
              {isModalSuccess ? modalText.success : modalText.fail}
              <button
                className="ml-4 text-sm underline"
                onClick={() => setIsShowModal(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
