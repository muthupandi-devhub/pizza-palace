
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

import AOS from "aos";
import "aos/dist/aos.css";

function Menu() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

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

    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "low-high") {
        return a.price - b.price;
      }

      if (sortOption === "high-low") {
        return b.price - a.price;
      }

      return 0;
    });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">

        {/* Hero Section */}

        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">

          <div className="max-w-7xl mx-auto px-4 text-center">

            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Our Menu
            </h1>

            <p className="text-lg md:text-xl text-red-100">
              Freshly Baked Pizzas Made With Premium Ingredients
            </p>

          </div>

        </section>

        <div className="max-w-7xl mx-auto px-4 py-10">

          {/* Search */}

          <div className="max-w-lg mx-auto mb-8">

            <input
              type="text"
              placeholder="Search Pizza..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full px-5 py-4 rounded-full border shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />

          </div>

          {/* Category Tabs */}

          <div className="flex flex-wrap justify-center gap-4 mb-8">

            <button
              onClick={() =>
                setSelectedCategory("All")
              }
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
              ${
                selectedCategory === "All"
                  ? "bg-black text-white shadow-lg"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              All Pizzas
            </button>

            <button
              onClick={() =>
                setSelectedCategory("Veg")
              }
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
              ${
                selectedCategory === "Veg"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white border hover:bg-green-50"
              }`}
            >
              Veg Pizzas
            </button>

            <button
              onClick={() =>
                setSelectedCategory("Non-Veg")
              }
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
              ${
                selectedCategory === "Non-Veg"
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white border hover:bg-red-50"
              }`}
            >
              Non-Veg Pizzas
            </button>

          </div>



          {/* Product Count */}

          <div className="text-center mb-10">

            <p className="text-gray-600 text-lg">
              Showing {filteredProducts.length} Pizza(s)
            </p>

          </div>

          {/* Product Grid */}

          {filteredProducts.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredProducts.map((product) => (

                <div
                  key={product._id}
                  data-aos="fade-up"
                  className="hover:-translate-y-2 transition duration-300"
                >
                  <ProductCard product={product} />
                </div>

              ))}

            </div>

          ) : (

            <div className="text-center py-20">

              <h2 className="text-2xl font-semibold text-gray-500">
                No Pizzas Found
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

