import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const token = localStorage.getItem("token");

  const handleAddToCart = () => {
    if (!token) {
      alert("Please Login First");
      return;
    }

    addToCart(product);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      {/* Product Image */}
    <img
  src={product.image}
  alt={product.title}
  className="w-full h-80 object-cover"
  onError={(e) => {
    e.target.src = "/placeholder.png";
  }}
/>

      <div className="p-5">

        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
              product.category === "Veg"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span
              className={`w-3 h-3 rounded-full ${
                product.category === "Veg"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            ></span>

            {product.category}
          </span>
        </div>

        {/* Product Title */}
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {product.title}
        </h2>

        {/* Price */}
        <p className="text-red-600 font-bold text-xl mb-2">
          ₹{product.price}
        </p>

        {/* Description */}
        <p className="text-gray-600 mb-5 line-clamp-2">
          {product.description}
        </p>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-orange-600 transition duration-300"
        >
          Add To Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;