import axios from "axios";

const API = "https://pizza-palace-backend-fj5l.onrender.com/api/products";

export const getProducts = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await axios.post(
    API,
    productData
  );

  return response.data;
};

export const updateProduct = async (
  id,
  productData
) => {

  const response = await axios.put(
    `https://pizza-palace-backend-fj5l.onrender.com/api/products/${id}`,
    productData
  );

  return response.data;

};

export const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${API}/${id}`
  );

  return response.data;
};