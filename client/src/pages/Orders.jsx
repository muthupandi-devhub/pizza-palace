  import { useEffect, useState } from "react";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  import {
    getMyOrders,
    cancelOrder,
  } from "../services/orderService";

  import toast from "react-hot-toast";

  function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleCancel = async (id) => {
    try {

      await cancelOrder(id);

      toast.success("Order Cancelled");

      fetchOrders();

    } catch (error) {   
      console.log(error);

      console.log(error.response);

      console.log(error.response?.data);

      toast.error("Failed to cancel order");
    }
  };
    if (loading) {
      return (
        <>
          <Navbar />
          <div className="text-center py-20 flex flex-col items-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-20 h-20 text-gray-400 mb-4 animate-bounce"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25v7.5a2.25 2.25 0 01-1.133 1.955l-6.75 3.857a2.25 2.25 0 01-2.234 0l-6.75-3.857A2.25 2.25 0 013 15.75v-7.5A2.25 2.25 0 014.133 6.295l6.75-3.857a2.25 2.25 0 012.234 0l6.75 3.857A2.25 2.25 0 0121 8.25z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.5 7.5L12 12.75 20.5 7.5M12 12.75v8.25"
    />
  </svg>

  <h2 className="text-xl text-gray-600">
    Loading Orders...
  </h2>
</div>
          <Footer />
        </>
      );
    }

    
    return (
      <>
        <Navbar />

        <div className="max-w-6xl mx-auto p-6 min-h-screen">
          <h1 className="text-3xl font-bold mb-6">
            My Orders
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow">
              No Orders Found
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md p-5 mb-5"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-bold">
                    Order ID: {order._id}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full ${
                      order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p>
                  <strong>Total:</strong> ₹{order.totalPrice}
                </p>

                <div className="mt-3">
                  <h3 className="font-semibold mb-2">
                    Products
                  </h3>

                  {order.products?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b py-2"
                    >
                      <span>
                        {item.product?.title || "Product"}
                      </span>

                      <span>
                        Qty: {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-gray-500 mt-3">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>

                {/* Cancel Button */}
              {order.status?.toLowerCase() === "pending" && (
  <button
    onClick={() => handleCancel(order._id)}
    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
  >
    Cancel Order
  </button>
)}
              </div>
            ))
          )}
        </div>

        <Footer />
      </>
    );
  }

  export default Orders;