import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../services/orderService";

import {
  FaClipboardList,
  FaUser,
  FaMoneyBillWave,
} from "react-icons/fa";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
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
    }
  };

  return (
    <>
  

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

              <p className="text-gray-600 mt-1">
                Manage customer orders and delivery status
              </p>
            </div>

          </div>

          {/* Table */}

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            <div className="bg-red-600 text-white px-6 py-4">
              <h2 className="text-xl font-semibold">
                All Orders
              </h2>
            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-4 text-left">
                      Customer
                    </th>

                    <th className="p-4 text-left">
                      Products
                    </th>

                    <th className="p-4 text-center">
                      Total
                    </th>

                    <th className="p-4 text-center">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {orders.length > 0 ? (

                    orders.map((order) => (

                      <tr
                        key={order._id}
                        className="border-b hover:bg-gray-50"
                      >

                        {/* Customer */}

                        <td className="p-4">

                          <div className="flex items-center gap-2">

                            <FaUser className="text-blue-500" />

                            <span className="font-medium">
                              {order.user?.username}
                            </span>

                          </div>

                        </td>

                        {/* Products */}

                        <td className="p-4">

                          {order.products.map(
                            (item, index) => (

                              <div
                                key={index}
                                className="bg-orange-50 rounded-lg px-3 py-2 mb-2"
                              >

                                <span className="font-medium">
                                  {item.product?.title}
                                </span>

                                <span className="text-red-600 ml-2">
                                  × {item.quantity}
                                </span>

                              </div>

                            )
                          )}

                        </td>

                        {/* Total */}

                        <td className="p-4 text-center">

                          <div className="flex items-center justify-center gap-2 font-bold text-green-600">

                            <FaMoneyBillWave />

                            ₹{order.totalPrice}

                          </div>

                        </td>

                        {/* Status */}

                        <td className="p-4 text-center">

                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(
                                order._id,
                                e.target.value
                              )
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
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

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center p-10 text-gray-500"
                      >
                        No Orders Found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>


    </>
  );
}

export default AdminOrders;