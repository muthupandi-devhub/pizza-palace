const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");

// Add Product with Image Upload
router.post(
  "/",
  upload.single("image"),
  addProduct
);

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProductById);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;