import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";

import { placeOrder } from "../services/orderService";
import { createOrder } from "../services/paymentService";

import toast from "react-hot-toast";

function Checkout() {
  const { cartItems, clearCart } =
    useContext(CartContext);

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      setLoading(true);

      const order =
        await createOrder(total);

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",

        amount: order.amount,

        currency: order.currency,

        name: "Pizza Palace",

        description: "Pizza Order",

        order_id: order.id,

        handler: async function (
          response
        ) {
          try {
            const orderData = {
              products: cartItems.map(
                (item) => ({
                  product: item._id,
                  quantity:
                    item.quantity,
                })
              ),

              totalPrice: total,

              paymentId:
                response.razorpay_payment_id,
            };

            await placeOrder(
              orderData
            );

            toast.success(
              "Payment Successful"
            );

            clearCart();

            navigate("/orders");
          } catch (error) {
            console.log(error);

            toast.error(
              "Order Save Failed"
            );
          }
        },

        theme: {
          color: "#dc2626",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      toast.error(
        "Payment Failed"
      );
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
              <p>
                Your cart is empty
              </p>
            ) : (
              <>
                {cartItems.map(
                  (item) => (
                    <div
                      key={item._id}
                      className="flex justify-between mb-3"
                    >
                      <span>
                        {item.title}
                        {" x "}
                        {
                          item.quantity
                        }
                      </span>

                      <span>
                        ₹
                        {item.price *
                          item.quantity}
                      </span>
                    </div>
                  )
                )}

                <hr className="my-4" />

                <div className="flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span>
                    ₹{total}
                  </span>

                </div>

                <button
                  onClick={
                    handlePayment
                  }
                  disabled={loading}
                  className="w-full mt-5 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                >
                  {loading
                    ? "Processing..."
                    : `Pay ₹${total}`}
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