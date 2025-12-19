import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import MainBtn from "../../components/MainBtn/MainBtn";
import MainTitle from "../../components/MainTitle/MainTitle";
import MainInput from "../../components/MainInput/MainInput";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (formDatas) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDatas),
      });

      const result = await res.json();

      if (res.ok && result.user) {
        await sendEmailToUser(result.user.id);
        authContext.login(result.user, result.access_token);

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Welcome to Casa Verde! You can now explore properties.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate("/"));
      } else {
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
    } finally {
      setLoading(false);
    }
  };

  async function sendEmailToUser(userId: string) {
    try {
      await fetch(`${apiUrl}/users/sendMail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          type: "Welcome",
          subject: "Welcome from Casa Verde",
        }),
      });
    } catch (err) {
      console.error("Failed to send welcome email:", err);
    }
  }

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
            Register Now
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
              type="email"
              placeholder="Email"
              label="Email"
              {...register("email", {
                required: "Email is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
                maxLength: { value: 35, message: "Maximum 35 characters" },
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Invalid email format",
                },
              })}
              error={errors.email?.message}
            />

            <MainInput
              type="text"
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
              {loading ? "Registering..." : "Register"}
            </MainBtn>
          </form>
        </div>
      </div>
    </div>
  );
}
