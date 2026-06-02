import { createContext, useState } from "react";
import toast from "react-hot-toast";
export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

const addToCart = (product) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      toast.success(`${product.title} quantity updated`);

      return prevItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    toast.success(`${product.title} added to cart`);

    return [
      ...prevItems,
      {
        ...product,
        quantity: 1,
      },
    ];
  });
};

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };

  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;