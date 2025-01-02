import Product from "../models/productSchema.js";
import User from "../models/userScheme.js";
import mongoose from "mongoose";

const addToCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.body.productId;

    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    console.log(user);
    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    let cart = user.cart || [];
    const price = product.price;
    

    const existingProduct = cart.find(
      (items) => items.productId.toString() === productId
    );
    

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.price = existingProduct.quantity * price;
      
    } else {
      cart.push({
        productId: product._id,
        quantity: 1,
        price:price,  
      });
    }



    user.cart = cart;
    await user.save();

     console.log(user)
    res.status(201).json({ message: "Product added to the cart ", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const cartItems = user.cart;

    if (!cartItems || cartItems.length === 0) {
      return res.status(401).json({ message: "Cart is empty" });
    }

    return res
      .status(201)
      .json({ message: "Successfully get cartItems", cart: cartItems });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const viewTotalCartItems = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const cartItems = user.cart;

    if (!cartItems || cartItems.length === 0) {
      return res.status(401).json({ message: "Cart is empty" });
    }
    // console.log(user);
    const result = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$cart" },
      {
        $group: {
          _id: "$_id", // Group by the user ID
          totalQuantity: { $sum: "$cart.quantity" }, // Sum the quantities of all items in the cart
          totalPrice: { $sum: "$cart.price" },
        },
      },
    ]);

    console.log("Aggregation Result:", result);

    // Extract total quantity from the aggregation result
    // const totalQuantity = result.length > 0 ? result[0].totalQuantity : 1;

    return res
      .status(201)
      .json({ message: "Successfully get cartItems", result });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export { addToCart, getCartItems, viewTotalCartItems };
