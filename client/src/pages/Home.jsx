import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";


import {
  FaPizzaSlice,
  FaTruck,
  FaAward
} from "react-icons/fa";

function Home() {
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600"
            alt="Pizza Banner"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60"></div>

        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-3xl">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Pizza Palace
          </h1>

          <p className="text-xl text-red-300 font-semibold mb-4">
            Fresh • Hot • Delicious
          </p>

          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200">
            Delicious pizzas delivered fresh to your doorstep.
          </p>

          <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold transition duration-300">
            Order Now
          </button>

        </div>

      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Featured Pizzas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Why Choose Pizza Palace?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Fresh Ingredients */}

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300">

              <div className="flex justify-center mb-4">

                <FaPizzaSlice
                  size={50}
                  className="text-red-600"
                />

              </div>

              <h3 className="text-2xl font-bold mb-3">
                Fresh Ingredients
              </h3>

              <p className="text-gray-600">
                We use only the freshest ingredients
                for every pizza.
              </p>

            </div>

            {/* Fast Delivery */}

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300">

              <div className="flex justify-center mb-4">

                <FaTruck
                  size={50}
                  className="text-green-600"
                />

              </div>

              <h3 className="text-2xl font-bold mb-3">
                Fast Delivery
              </h3>

              <p className="text-gray-600">
                Hot and fresh pizzas delivered
                quickly to your door.
              </p>

            </div>

            {/* Best Quality */}

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300">

              <div className="flex justify-center mb-4">

                <FaAward
                  size={50}
                  className="text-yellow-500"
                />

              </div>

              <h3 className="text-2xl font-bold mb-3">
                Best Quality
              </h3>

              <p className="text-gray-600">
                Premium quality pizzas loved by
                thousands of customers.
              </p>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;