import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import loginBg from "../assets/login-bg.png";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (response.data.role === "admin") {

        setErrorMessage(
          "Please use the Admin Login page."
        );

        return;
      }

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      setErrorMessage("");

      navigate("/");

    } catch (error) {

      setErrorMessage(
        error.response?.data?.message ||
        "Login Failed. Please try again."
      );

    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <div className="w-full max-w-md">

        <div className="relative z-10 w-full px-4 sm:px-6">

          <div className="w-full max-w-md mx-auto bg-black/50 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8">

            <div className="text-center mb-8">

              <img
                src={logo}
                alt="Logo"
                className="mx-auto w-24 h-24 mb-4 rounded-full"
              />

              <h2 className="text-2xl font-bold text-white">
                User Login
              </h2>

              <p className="text-sm text-gray-300 mt-2">
                Welcome Back
              </p>

            </div>

            {errorMessage && (
              <div className="mb-4 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-xl text-sm">
                {errorMessage}
              </div>
            )}

            <form
              className="space-y-4"
              onSubmit={handleSubmit}
            >

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 outline-none focus:border-orange-500"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 outline-none focus:border-orange-500"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition duration-300"
              >
                Login
              </button>

            </form>

            <p className="text-center text-sm text-gray-300 mt-6">

              Don't have an account?

              <span
                onClick={() =>
                  navigate("/register")
                }
                className="text-orange-400 cursor-pointer ml-2 hover:text-orange-300"
              >
                Register
              </span>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;