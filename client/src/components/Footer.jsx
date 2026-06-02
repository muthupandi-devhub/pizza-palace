import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="text-center">

          <h2 className="text-3xl font-bold mb-2 text-red-500">
            Pizza Palace 🍕
          </h2>

          <p className="text-gray-400 mb-4">
            Fresh Pizza Delivered Fast & Hot
          </p>

          {/* Optional Links (nice improvement) */}
          <div className="flex justify-center gap-6 text-sm mb-6">
            <Link to="/" className="hover:text-red-400 transition">
              Home
            </Link>
            <Link to="/menu" className="hover:text-red-400 transition">
              Menu
            </Link>
            <Link to="/contact" className="hover:text-red-400 transition">
              Contact
            </Link>
          </div>

          <p className="text-sm text-gray-500 border-t border-gray-800 pt-4">
            © 2026 Pizza Palace. All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;