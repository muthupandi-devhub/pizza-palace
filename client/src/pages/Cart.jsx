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

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl text-gray-600">
              Your cart is empty
            </h2>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border rounded-xl p-4 mb-4 bg-gray-100 shadow-sm"
              >
                {/* Left Side */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.title}
                    </h2>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="bg-gray-300 px-3 py-1 rounded font-bold"
                      >
                        -
                      </button>

                      <span className="font-semibold text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="bg-red-700 text-white px-3 py-1 rounded font-bold"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 text-lg ml-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="text-right">
                  <h3 className="text-xl font-bold text-red-800">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </h3>

                  <p className="text-gray-500">
                    Rs. {item.price} each
                  </p>
                </div>
              </div>
            ))}

            {/* Total Section */}
            <div className="mt-8 flex justify-end">
              <div className="bg-white border rounded-xl p-6 shadow-md w-80">
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
  <button className="bg-green-600 text-white px-5 py-2 rounded">
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