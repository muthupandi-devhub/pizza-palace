import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  const API_URL =
    "https://pizza-palace-backend-fj5l.onrender.com";

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl text-gray-600">
              Your cart is empty
            </h2>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border rounded-xl p-4 mb-4 bg-gray-100 shadow-sm"
              >
                {/* Product */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.image
                        ? `${API_URL}${item.image}`
                        : "https://via.placeholder.com/100"
                    }
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100";
                    }}
                  />

                  <div>
                    <h2 className="text-lg md:text-xl font-semibold">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      Rs. {item.price} each
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          decreaseQty(item._id)
                        }
                        className="bg-gray-300 px-3 py-1 rounded font-bold"
                      >
                        -
                      </button>

                      <span className="font-semibold text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item._id)
                        }
                        className="bg-red-700 text-white px-3 py-1 rounded font-bold"
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          removeFromCart(item._id)
                        }
                        className="text-red-600 ml-2"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-left md:text-right">
                  <h3 className="text-xl font-bold text-red-700">
                    Rs.{" "}
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </h3>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="mt-8 flex justify-center md:justify-end">
              <div className="bg-white border rounded-xl p-6 shadow-md w-full md:w-80">
                <h2 className="text-2xl font-bold mb-4">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-4">
                  <span>Total</span>

                  <span className="font-bold">
                    Rs. {total.toFixed(2)}
                  </span>
                </div>

                <Link to="/checkout">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
                    Proceed To Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;