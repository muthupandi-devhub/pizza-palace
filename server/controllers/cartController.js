const Cart = require("../models/Cart");

const addToCart = async (req, res) => {

    try {

        console.log(req.user.id);

        const { product, quantity } = req.body;

        const cartItem = new Cart({
            user: req.user.id,
            product: product,
            quantity: quantity
        });

        await cartItem.save();

        res.status(201).json({
            message: "Item Added To Cart",
            cartItem
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to add product to cart",
            error: error.message
        });

    }

};

const getCartItems = async (req, res) => {

    try {

        const cartItems = await Cart.find({
            user: req.user.id
        }).populate("product");

        res.status(200).json(cartItems);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const removeCartItem = async (req, res) => {

    try {

        await Cart.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Cart Item Removed"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
};