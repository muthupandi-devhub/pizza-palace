import axios from "axios";

export const createOrder = async (amount) => {
  const response = await axios.post(
    "https://pizza-palace-backend-fj5l.onrender.com/api/payment/create-order",
    { amount }
  );

  return response.data;
};