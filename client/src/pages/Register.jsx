import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import loginBg from "../assets/login-bg.png";
import logo from "../assets/logo.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://pizza-palace-backend-fj5l.onrender.com/api/auth/register",
        formData
      );

      alert(response.data.message);

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
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
                className="mx-auto w-25 h-25 mb-4 rounded-full"
              />

              <p className="text-sm sm:text-base text-gray-300">
                Create your account
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 outline-none focus:border-orange-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 outline-none focus:border-orange-500"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 outline-none focus:border-orange-500"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition duration-300 cursor-pointer"
              >
                Register
              </button>

            </form>

            <p className="text-center text-sm sm:text-base text-gray-300 mt-6">
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className="text-orange-400 cursor-pointer ml-2 hover:text-orange-300"
              >
                Login
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;