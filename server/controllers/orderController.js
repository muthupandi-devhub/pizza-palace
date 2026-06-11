const Order = require("../models/Order");

// Place Order
const placeOrder = async (req, res) => {
  try {

    const {
      products,
      totalPrice,
      paymentId,
      deliveryAddress
    } = req.body;

    const order = new Order({
      user: req.user.id,
      products,
      totalPrice,
      paymentId,
      deliveryAddress
    });

    await order.save();

    res.status(201).json({
      message: "Order Placed Successfully",
      order
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Get My Orders
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

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "username email")
      .populate("products.product");

    console.log(orders);

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Order Status
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

const cancelOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Order Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
};