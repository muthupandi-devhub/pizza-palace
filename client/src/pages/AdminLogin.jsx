import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import loginBg from "../assets/login-bg.png";
import logo from "../assets/logo.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (response.data.role !== "admin") {
        setError("You are not authorized to access Admin Panel.");
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

      navigate("/admin/dashboard");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <div className="w-full max-w-md">

        <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8">

          <div className="text-center mb-8">

            <img
              src={logo}
              alt="Admin Logo"
              className="mx-auto w-24 h-24 rounded-full mb-4"
            />

            <h1 className="text-3xl font-bold text-white">
              Admin Login
            </h1>

            <p className="text-gray-300 mt-2">
              Sign in to access Admin Dashboard
            </p>

          </div>

          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder-gray-400 outline-none focus:border-red-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder-gray-400 outline-none focus:border-red-500"
            />

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Login to Dashboard
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default AdminLogin;