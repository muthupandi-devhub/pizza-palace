import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

function Menu() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4">

        <div className="max-w-7xl mx-auto">

          {/* Page Heading */}

          <div className="text-center mb-12">

            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Our Menu
            </h1>

            <p className="text-gray-500 text-lg">
              Discover our freshly baked pizzas made with premium ingredients
            </p>

          </div>

          {/* Category Buttons */}

          <div className="flex flex-wrap justify-center gap-4 mb-12">

            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
              ${
                selectedCategory === "All"
                  ? "bg-black text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
            >
              All Pizzas
            </button>

            <button
              onClick={() => setSelectedCategory("Veg")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
              ${
                selectedCategory === "Veg"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border hover:bg-green-50"
              }`}
            >
              Veg Pizzas
            </button>

            <button
              onClick={() => setSelectedCategory("Non-Veg")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
              ${
                selectedCategory === "Non-Veg"
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border hover:bg-red-50"
              }`}
            >
              Non-Veg Pizzas
            </button>

          </div>

          {/* Product Count */}

          <div className="text-center mb-8">

            <p className="text-gray-600 text-lg">
              Showing {filteredProducts.length} Pizza(s)
            </p>

          </div>

          {/* Product Grid */}

          {filteredProducts.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>

          ) : (

            <div className="text-center py-20">

              <h2 className="text-2xl font-semibold text-gray-500">
                No Products Found
              </h2>

            </div>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Menu;

