import React, { useState } from "react";
import { addProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPizzaSlice, FaImage } from "react-icons/fa";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Veg",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const productData = new FormData();

    productData.append("title", formData.title);
    productData.append("price", formData.price);
    productData.append("category", formData.category);
    productData.append("description", formData.description);
    productData.append("image", image);

    try {
      await addProduct(productData);

      toast.success("Product Added Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <FaPizzaSlice className="mx-auto text-red-600 text-5xl mb-3" />

          <h1 className="text-4xl font-bold text-red-700">
            Add New Pizza
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new product for Pizza Palace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="font-semibold block mb-2">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Pizza Name"
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-red-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter Price"
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-red-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-red-500 outline-none"
            >
              <option value="Veg"> Veg</option>
              <option value="Non-Veg"> Non-Veg</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border-2 border-dashed border-gray-300 p-3 rounded-xl"
            />

            {image && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-xl border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Pizza Description"
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-red-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 text-white py-3 rounded-xl font-bold hover:bg-red-800 transition"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;