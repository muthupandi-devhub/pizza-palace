import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMyOrders } from "../services/orderService";

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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-xl">
          Loading Orders...
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

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
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
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Orders;