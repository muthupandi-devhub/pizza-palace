import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import toast from "react-hot-toast";

function Menu() {
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

  const vegProducts = products.filter(
    (product) => product.category === "Veg"
  );

  const nonVegProducts = products.filter(
    (product) => product.category === "Non-Veg"
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
             Our Menu
          </h1>

          {/* Veg Section */}
          <div className="mb-16">

            <h2 className="text-3xl font-bold text-green-600 mb-8 border-b-4 border-green-500 inline-block pb-2">
               Veg Pizzas
            </h2>

            {vegProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {vegProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}

              </div>
            ) : (
              <p className="text-gray-500">
                No Veg Pizzas Available
              </p>
            )}

          </div>

          {/* Non Veg Section */}
          <div>

            <h2 className="text-3xl font-bold text-red-600 mb-8 border-b-4 border-red-500 inline-block pb-2">
              Non-Veg Pizzas
            </h2>

            {nonVegProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {nonVegProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}

              </div>
            ) : (
              <p className="text-gray-500">
                No Non-Veg Pizzas Available
              </p>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Menu;