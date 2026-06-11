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

const [address, setAddress] = useState({
fullName: "",
phone: "",
email: "",
addressLine: "",
city: "",
state: "",
pincode: "",
});

const navigate = useNavigate();

const total = cartItems.reduce(
(sum, item) => sum + item.price * item.quantity,
0
);

const handlePayment = async () => {
if (
!address.fullName ||
!address.phone ||
!address.addressLine ||
!address.city ||
!address.state ||
!address.pincode
) {
toast.error("Please fill all delivery details");
return;
}

try {
  setLoading(true);

  const orderData = {
    products: cartItems.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    })),

    totalPrice: total,

    deliveryAddress: address,

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
<> <Navbar />
  
  <div className="min-h-screen bg-gray-100 py-10 px-4">

    <div className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold text-center mb-10">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Delivery Address */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Delivery Address
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={address.fullName}
              onChange={(e) =>
                setAddress({
                  ...address,
                  fullName: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={address.phone}
              onChange={(e) =>
                setAddress({
                  ...address,
                  phone: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={address.email}
              onChange={(e) =>
                setAddress({
                  ...address,
                  email: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              rows="4"
              placeholder="Street Address"
              value={address.addressLine}
              onChange={(e) =>
                setAddress({
                  ...address,
                  addressLine: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
            />

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    city: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    state: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
              />

            </div>

            <input
              type="text"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) =>
                setAddress({
                  ...address,
                  pincode: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
            />

          </div>

        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4">

                {cartItems.map((item) => (

                  <div
                    key={item._id}
                    className="flex justify-between border-b pb-3"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Qty : {item.quantity}
                      </p>

                    </div>

                    <span className="font-semibold">
                      ₹{item.price * item.quantity}
                    </span>

                  </div>

                ))}

              </div>

              <div className="border-t mt-6 pt-6">

                <div className="flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span>₹{total}</span>

                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  {loading
                    ? "Processing..."
                    : `Place Order ₹${total}`}
                </button>

              </div>
            </>
          )}

        </div>

      </div>

    </div>

  </div>

  <Footer />
</>


);
}

export default Checkout;
