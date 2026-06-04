import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
const { id } = useParams();
const navigate = useNavigate();

const API_URL =
"https://pizza-palace-backend-fj5l.onrender.com";

const [title, setTitle] = useState("");
const [price, setPrice] = useState("");
const [category, setCategory] = useState("Veg");
const [description, setDescription] = useState("");
const [image, setImage] = useState(null);
const [currentImage, setCurrentImage] = useState("");

useEffect(() => {
fetchProduct();
}, []);

const fetchProduct = async () => {
try {
const response = await axios.get(
`${API_URL}/api/products/${id}`
);


  const product = response.data;

  setTitle(product.title);
  setPrice(product.price);
  setCategory(product.category);
  setDescription(product.description);
  setCurrentImage(product.image);
} catch (error) {
  console.log(error);
}


};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  const productData = new FormData();

  productData.append("title", title);
  productData.append("price", price);
  productData.append("category", category);
  productData.append("description", description);

  if (image) {
    productData.append("image", image);
  }

  await axios.put(
    `${API_URL}/api/products/${id}`,
    productData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  alert("Product Updated Successfully");
  navigate("/admin/products");
} catch (error) {
  console.log(error);
  alert("Update Failed");
}


};

return ( <div className="min-h-screen bg-orange-50 py-10 px-4"> <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">


    <h1 className="text-3xl font-bold text-red-600 mb-8">
      Edit Product
    </h1>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-semibold">
          Product Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Price
        </label>

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        >
          <option value="Veg">Veg</option>
          <option value="Non-Veg">
            Non-Veg
          </option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Current Image
        </label>

        {currentImage && (
          <img
            src={`${API_URL}${currentImage}`}
            alt="Product"
            className="w-40 h-40 object-cover rounded-lg border mb-4"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
          className="w-full border p-3 rounded-lg"
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg border mt-4"
          />
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Description
        </label>

        <textarea
          rows="4"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Update Product
      </button>
    </form>
  </div>
</div>


);
}

export default EditProduct;
