const express = require("express");

const router = express.Router();

const {
   addToCart,
   getCartItems,
   removeCartItem
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, addToCart);

router.get("/", protect, getCartItems);

router.delete("/:id", protect, removeCartItem);

module.exports = router;