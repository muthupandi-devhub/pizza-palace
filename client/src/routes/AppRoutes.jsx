import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Menu from "../pages/Menu";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";

import Admin from "../pages/Admin";
import AdminLogin from "../pages/AdminLogin";
import AdminProducts from "../pages/AdminProducts";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import AdminOrders from "../pages/AdminOrders";

import AdminRoute from "../components/AdminRoute";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* User Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/menu" element={<Menu />} />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={<Navigate to="/admin/login" />}
      />

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-product"
        element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/edit-product/:id"
        element={
          <AdminRoute>
            <EditProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;