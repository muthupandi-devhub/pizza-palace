import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaTimes,
  FaHome,
  FaUtensils,
  FaClipboardList,
} from "react-icons/fa";

import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { useState, useContext } from "react";

import logo from "../assets/logo.png";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const { cartItems } = useContext(CartContext);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    navigate("/login");
  };

  return (
    <nav className="bg-red-700 text-white shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="Pizza Palace"
            className="w-12 h-12 rounded-full border-2 border-white"
          />

          <div>
            <h1 className="text-2xl font-bold">
              Pizza Palace
            </h1>

            <p className="text-xs text-red-100">
              Fresh & Hot Pizza
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <FaHome />
            Home
          </Link>

          <Link
            to="/menu"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <FaUtensils />
            Menu
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <FaClipboardList />
            Orders
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative"
          >
            <FaShoppingCart size={22} />

            {totalCartItems > 0 && (
              <span className="absolute -top-3 -right-3 bg-white text-red-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>


          {!token ? (
            <>
              <Link
                to="/login"
                className="border px-4 py-2 rounded-lg hover:bg-white hover:text-red-700 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-red-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-medium">
                Hi, {username}
              </span>

              <button
                onClick={handleLogout}
                className="bg-white text-red-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          {menuOpen ? (
            <FaTimes size={24} />
          ) : (
            <HiOutlineMenuAlt3 size={28} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-red-800 px-6 py-4 flex flex-col gap-4">

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <FaHome />
            Home
          </Link>

          <Link
            to="/menu"
            className="flex items-center gap-2"
          >
            <FaUtensils />
            Menu
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-2"
          >
            <FaClipboardList />
            Orders
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2"
          >
            <FaShoppingCart />
            Cart ({totalCartItems})
          </Link>

          {!token ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-left"
            >
              Logout
            </button>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;