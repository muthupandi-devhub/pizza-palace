const Product = require("../models/Product");

// Add Product
const addProduct = async (req, res) => {
  try {

    console.log("FILE:", req.file);

    const { title, price, category, description } = req.body;

    const product = new Product({
      title,
      price,
      category,
      description,
      image: req.file ? req.file.path : "",
    });

    await product.save();

    res.status(201).json({
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.title = req.body.title || product.title;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;

    if (req.file) {
      product.image = req.file.path;
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product Updated Successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};