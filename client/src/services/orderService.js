import axios from "axios";

const API_URL = "https://pizza-palace-backend-fj5l.onrender.com/api/orders";

export const placeOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/myorders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAllOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/allorders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateOrderStatus = async (
  orderId,
  status
) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/updatestatus/${orderId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};