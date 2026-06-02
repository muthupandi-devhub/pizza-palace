const express = require("express");

const router = express.Router();

const { placeOrder,getMyOrders,getAllOrders,updateOrderStatus} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");
router.post("/", protect, placeOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/allorders", protect, getAllOrders);
router.put("/updatestatus/:id", protect, updateOrderStatus);
module.exports = router;