  import { useEffect, useState } from "react";
  import {
    getAllOrders,
    updateOrderStatus,
  } from "../services/orderService";

  import toast from "react-hot-toast";

  import {
    FaClipboardList,
    FaUser,
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaPhone,
    FaCalendarAlt,
  } from "react-icons/fa";

  function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      fetchOrders();
    }, []);

const fetchOrders = async () => {
  try {
    const data = await getAllOrders();

    console.log("ALL ORDERS :", data);

    setOrders(data);

  } catch (error) {
    console.log(error);
  }
};

    const handleStatusChange = async (
      orderId,
      status
    ) => {
      try {
        await updateOrderStatus(orderId, status);

        fetchOrders();

        toast.success("Order Status Updated");
      } catch (error) {
        console.log(error);
        toast.error("Failed To Update Status");
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
              <FaClipboardList
                size={30}
                className="text-red-600"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-red-600">
                Order Management
              </h1>

              <p className="text-gray-600">
                Manage customer orders and delivery status
              </p>
            </div>
          </div>

          {/* Orders */}

          <div className="space-y-6">

            {orders.length > 0 ? (

              orders.map((order) => (

                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >

                  {/* Top */}

                  <div className="flex flex-col lg:flex-row justify-between gap-6">

                    {/* Customer Details */}

                    <div className="flex-1">

                      <h2 className="text-xl font-bold mb-4 text-red-600">
                        Customer Details
                      </h2>

                      <div className="space-y-2">

                        <p className="flex items-center gap-2">
                          <FaUser className="text-blue-500" />
                          <span>
                            {order.deliveryAddress?.fullName ||
                              order.user?.username}
                          </span>
                        </p>

                        <p className="flex items-center gap-2">
                          <FaPhone className="text-green-500" />
                          <span>
                            {order.deliveryAddress?.phone}
                          </span>
                        </p>

                        <p className="flex items-start gap-2">
                          <FaMapMarkerAlt className="text-red-500 mt-1" />
                          <span>
                            {order.deliveryAddress?.addressLine},
                            {" "}
                            {order.deliveryAddress?.city},
                            {" "}
                            {order.deliveryAddress?.state}
                            {" - "}
                            {order.deliveryAddress?.pincode}
                          </span>
                        </p>

                        <p className="flex items-center gap-2">
                          <FaCalendarAlt className="text-purple-500" />
                          <span>
                            {new Date(
                              order.createdAt
                            ).toLocaleString()}
                          </span>
                        </p>

                      </div>

                    </div>

                    {/* Order Total */}

                    <div className="text-center lg:text-right">

                      <h2 className="text-xl font-bold mb-3">
                        Order Total
                      </h2>

                      <div className="flex items-center justify-center lg:justify-end gap-2 text-green-600 text-2xl font-bold">
                        <FaMoneyBillWave />
                        ₹{order.totalPrice}
                      </div>

                    </div>

                  </div>

                  {/* Products */}

                  <div className="mt-6">

                    <h2 className="text-xl font-bold mb-4">
                      Ordered Products
                    </h2>

                    <div className="grid md:grid-cols-2 gap-3">

                      {order.products.map(
                        (item, index) => (

                          <div
                            key={index}
                            className="bg-orange-50 border rounded-xl p-3 flex justify-between"
                          >

                            <span className="font-medium">
                              {item.product?.title}
                            </span>

                            <span className="text-red-600 font-semibold">
                              × {item.quantity}
                            </span>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                  {/* Status */}

                  <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3">

                    <label className="font-semibold">
                      Order Status:
                    </label>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Preparing">
                        Preparing
                      </option>

                      <option value="Out For Delivery">
                        Out For Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>
                    </select>

                  </div>

                </div>

              ))

            ) : (

              <div className="bg-white rounded-xl p-10 text-center text-gray-500">
                No Orders Found
              </div>

            )}

          </div>

        </div>
      </div>
    );
  }

  export default AdminOrders;