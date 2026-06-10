import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProducts,
  deleteProduct,
} from "../services/productService";
import {
  FaPizzaSlice,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      toast.success("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>


      <div className="min-h-screen bg-orange-50 py-10 px-6">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

              <div>
                <h1 className="text-4xl font-bold text-red-600">
                  Product Management
                </h1>

                <p className="text-gray-600 mt-2">
                  Manage Pizza Palace Menu Items
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/admin/add-product")
                }
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                + Add Product
              </button>

            </div>

          </div>

          {/* Product Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            <div className="bg-red-600 text-white px-6 py-4">
              <h2 className="text-xl font-semibold">
                All Products
              </h2>
            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="bg-orange-100 text-gray-700">

                  <tr>
                    <th className="p-4 text-left">
                      Image
                    </th>

                    <th className="p-4 text-left">
                      Title
                    </th>

                    <th className="p-4 text-center">
                      Price
                    </th>

                    <th className="p-4 text-center">
                      Category
                    </th>

                    <th className="p-4 text-left">
                      Description
                    </th>

                    <th className="p-4 text-center">
                      Actions
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr
                        key={product._id}
                        className="border-b hover:bg-orange-50 transition"
                      >

                        <td className="p-4">
<img
  src={product.image}
  alt={product.title}
  className="w-20 h-20 object-cover rounded-xl border"
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/80";
  }}
/>

                        </td>

                        <td className="p-4 font-semibold">
                          {product.title}
                        </td>

                        <td className="p-4 text-center text-green-600 font-bold text-lg">
                          ₹{product.price}
                        </td>

                        <td className="p-4 text-center">
                          {product.category}
                        </td>

                        <td className="p-4 max-w-sm">
                          <p className="truncate">
                            {product.description}
                          </p>
                        </td>

                        <td className="p-4 text-center">

                          <button
                            onClick={() =>
                              navigate(
                                `/admin/edit-product/${product._id}`
                              )
                            }
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(product._id)
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>

                      <td
                        colSpan="6"
                        className="p-10 text-center text-gray-500 text-lg"
                      >
                        🍕 No Products Found
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

export default AdminProducts;