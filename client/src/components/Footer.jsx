
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand Section */}
          <div>
          <div className="flex items-center gap-3 mb-4">

          
             <img
                        src={logo}
                        alt="Pizza Palace"
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
 <div>
            <h1 className="text-2xl text-red-500 font-bold">
              Pizza Palace
            </h1>

            <p className="text-xs text-red-100">
              Fresh & Hot Pizza
            </p>
          </div>
            </div>

            <p className="text-gray-400 leading-7">
              Serving freshly baked pizzas with premium ingredients,
              exceptional taste, and fast delivery to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <Link
                  to="/"
                  className="hover:text-red-500 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/menu"
                  className="hover:text-red-500 transition"
                >
                  Menu
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="hover:text-red-500 transition"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="hover:text-red-500 transition"
                >
                  Orders
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-gray-400">

              <p>
                Email: info@pizzapalace.com
              </p>

              <p>
                Phone: +91 98765 43210
              </p>

              <p>
                Address: Chennai, Tamil Nadu, India
              </p>

            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">

          <p className="text-gray-500 text-sm">
            © 2026 Pizza Palace. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;