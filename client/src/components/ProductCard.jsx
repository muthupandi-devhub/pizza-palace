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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

<img
  src={`http://localhost:5000${product.image}`}
  alt={product.title}
  className="w-100 h-80 object-cover"
/>

      <div className="p-5">

        <h2 className="text-2xl font-bold mb-2">
          {product.title}
        </h2>

        <p className="text-red-600 font-bold text-lg mb-1">
          ₹{product.price}
        </p>

        <p className="text-sm text-gray-500 mb-2">
          {product.category}
        </p>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full bg-red-700 text-white py-2 rounded-lg font-semibold hover:bg-red-800 transition"
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;