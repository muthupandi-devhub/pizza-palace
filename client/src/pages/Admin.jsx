import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../services/productService";
import { getAllOrders } from "../services/orderService";

import {
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

function Admin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const productsData = await getProducts();
      const ordersData = await getAllOrders();

      setProducts(productsData);
      setOrders(ordersData);
    } catch (error) {
      console.log(error);
    }
  };

  const totalProducts = products.length;
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  const totalCustomers = new Set(
    orders.map((order) => order.user?._id)
  ).size;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Pizza Palace Admin Dashboard
            </h1>

            <p className="text-red-100 mt-2">
              Administration Panel
            </p>
          </div>

          <button
            onClick={handleLogout}
            
            className="bg-white text-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </button>

        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
            <div>
              <h2 className="text-gray-500">Total Products</h2>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {totalProducts}
              </p>
            </div>
            <FaBoxOpen size={40} className="text-blue-600" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
            <div>
              <h2 className="text-gray-500">Total Orders</h2>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {totalOrders}
              </p>
            </div>
            <FaShoppingBag size={40} className="text-green-600" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
            <div>
              <h2 className="text-gray-500">Revenue</h2>
              <p className="text-4xl font-bold text-orange-600 mt-2">
                ₹{totalRevenue}
              </p>
            </div>
            <FaMoneyBillWave size={40} className="text-orange-600" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
            <div>
              <h2 className="text-gray-500">Customers</h2>
              <p className="text-4xl font-bold text-red-600 mt-2">
                {totalCustomers}
              </p>
            </div>
            <FaUsers size={40} className="text-red-600" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
            <div>
              <h2 className="text-gray-500">Pending Orders</h2>
              <p className="text-4xl font-bold text-yellow-500 mt-2">
                {pendingOrders}
              </p>
            </div>
            <FaClock size={40} className="text-yellow-500" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
            <div>
              <h2 className="text-gray-500">Delivered Orders</h2>
              <p className="text-4xl font-bold text-green-700 mt-2">
                {deliveredOrders}
              </p>
            </div>
            <FaCheckCircle size={40} className="text-green-700" />
          </div>

        </div>

        {/* Management */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-5">
              <FaBoxOpen size={30} className="text-red-600" />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Product Management
            </h2>

            <p className="text-gray-600 mb-6">
              Add, Edit and Delete Products.
            </p>

            <button
              onClick={() => navigate("/admin/products")}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
            >
              Manage Products
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
              <FaShoppingBag size={30} className="text-blue-600" />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Order Management
            </h2>

            <p className="text-gray-600 mb-6">
              View and Update Customer Orders.
            </p>

            <button
              onClick={() => navigate("/admin/orders")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Manage Orders
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Admin;