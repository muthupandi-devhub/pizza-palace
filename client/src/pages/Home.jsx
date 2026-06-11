import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import PizzaIcon from "../assets/icons/pizza.svg";
import DeliveryIcon from "../assets/icons/delivary.svg";
import QualityIcon from "../assets/icons/quality.svg";

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


AOS.init({
  duration: 1000,
  once: true,
});


}, []);

return (
<> <Navbar />

  {/* Hero Section */}
<section className="relative h-screen flex items-center justify-center overflow-hidden">

  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600"
      alt="Pizza Palace"
      className="w-full h-full object-cover hero-image"
    />
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  <div className="relative z-10 text-center text-white">

    <h1
      data-aos="zoom-in"
      className="text-5xl md:text-7xl font-bold mb-4"
    >
      Pizza Palace
    </h1>

    <p
      data-aos="fade-up"
      data-aos-delay="300"
      className="text-xl md:text-2xl mb-8"
    >
      Fresh • Hot • Delicious
    </p>

    <button
      data-aos="fade-up"
      data-aos-delay="500"
      className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold transition-all duration-300"
    >
      Order Now
    </button>

  </div>

</section>

  {/* Stats Section */}

  <section className="bg-red-600 text-white py-12">

    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

      <div>
        <h2 className="text-4xl font-bold">5000+</h2>
        <p>Happy Customers</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold">100+</h2>
        <p>Pizza Varieties</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold">24/7</h2>
        <p>Fast Delivery</p>
      </div>

    </div>

  </section>

  {/* Featured Products */}

 {/* Featured Products */}

<section className="max-w-7xl mx-auto py-16 px-4">

  <h2
    data-aos="fade-up"
    className="text-4xl font-bold text-center mb-12"
  >
    Featured Pizzas
  </h2>

  <div
    data-aos="fade-up"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
  >

    {products.slice(0, 6).map((product) => (
      <ProductCard
        key={product._id}
        product={product}
      />
    ))}

  </div>

  <div className="text-center mt-12">

    <Link to="/menu">

      <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">

        View Full Menu

      </button>

    </Link>

  </div>

</section>

  {/* Why Choose Us */}

  <section className="bg-gray-100 py-16">

    <div className="max-w-7xl mx-auto px-4">

      <h2
        data-aos="fade-up"
        className="text-4xl font-bold text-center mb-12"
      >
        Why Choose Pizza Palace
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div
          data-aos="zoom-in"
          className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-3 transition duration-500"
        >

          <img
            src={PizzaIcon}
            alt="Fresh Ingredients"
            className="w-16 h-16 mx-auto mb-4"
          />

          <h3 className="text-2xl font-bold mb-3">
            Fresh Ingredients
          </h3>

          <p className="text-gray-600">
            We use only fresh and premium ingredients for every pizza.
          </p>

        </div>

        <div
          data-aos="zoom-in"
          className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-3 transition duration-500"
        >

          <img
            src={DeliveryIcon}
            alt="Fast Delivery"
            className="w-16 h-16 mx-auto mb-4"
          />

          <h3 className="text-2xl font-bold mb-3">
            Fast Delivery
          </h3>

          <p className="text-gray-600">
            Freshly baked pizzas delivered quickly to your doorstep.
          </p>

        </div>

        <div
          data-aos="zoom-in"
          className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-3 transition duration-500"
        >

          <img
            src={QualityIcon}
            alt="Premium Quality"
            className="w-16 h-16 mx-auto mb-4"
          />

          <h3 className="text-2xl font-bold mb-3">
            Premium Quality
          </h3>

          <p className="text-gray-600">
            Every pizza is prepared with care and top quality standards.
          </p>

        </div>

      </div>

    </div>

  </section>

  {/* Offer Section */}

  <section className="bg-black text-white py-16 text-center">

    <h2 className="text-4xl font-bold mb-4">
      Special Offer
    </h2>

    <p className="text-xl">
      Get 20% OFF on your first online order.
    </p>

  </section>

  <Footer />
</>

);
}

export default Home;
