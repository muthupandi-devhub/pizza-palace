const Order = require("../models/Order");

const placeOrder = async (req, res) => {
    try{
        const { products, totalPrice } = req.body;
        const order = new Order({
            user: req.user.id,
            products,
            totalPrice
        });
        await order.save();
        res.status(201).json({
            message: "Order Placed Successfully",
            order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        }).populate("products.product");

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "username email")
      .populate("products.product");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {placeOrder, getMyOrders, getAllOrders, updateOrderStatus};