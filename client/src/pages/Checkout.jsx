import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";

import { placeOrder } from "../services/orderService";

import toast from "react-hot-toast";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      setLoading(true);

      const orderData = {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),

        totalPrice: total,

        paymentId: "PAY_" + Date.now(),
      };

      await placeOrder(orderData);

      toast.success("Order Placed Successfully");

      clearCart();

      navigate("/orders");

    } catch (error) {

      console.log(error);

      toast.error("Order Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="border rounded-xl p-5 shadow">

            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between mb-3"
                  >
                    <span>
                      {item.title} x {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}

                <hr className="my-4" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>₹{total}</span>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full mt-5 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                >
                  {loading
                    ? "Processing..."
                    : `Place Order ₹${total}`}
                </button>

              </>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Checkout;