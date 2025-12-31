import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

export async function getCart(req, res) {
  try {
    const cart = await Cart.findOne({ clearkId: req.user.clearkId }).populate(
      "items.product"
    );
    if (!cart) {
      const user = req.user;

      cart = await Cart.create({
        user: user._id,
        clerkId: user.clerkId,
        items: [],
      });
    }
    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error in getCart controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function addToCart(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;

    //validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (product.stock < quantity) {
      return res
        .status(400)
        .json({ error: "Insufficient stock for the requested quantity" });
    }
    let cart = await Cart.findOne({ clerkId: req.user.clerkId });
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        clerkId: req.user.clerkId,
        items: [],
      });
    }
    //check if product already in cart
    const existsingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existsingItem) {
      //update quantity by 1
      const newQuantity = existsingItem.quantity + 1;
      if (product.stock < newQuantity) {
        return res
          .status(400)
          .json({ error: "Insufficient stock for the requested quantity" });
      }
      existsingItem.quantity = newQuantity;
    } else {
      //add new item to cart
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("Error in addToCart controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateCartItem(req, res) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }
    const cart = await Cart.findOne({ clerkId: req.user.clerkId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    //check if product exists andvalidate stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (product.stock < quantity) {
      return res
        .status(400)
        .json({ error: "Insufficient stock for the requested quantity" });
    }
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res
      .status(200)
      .json({ message: "Cart item updated successfully", cart });
  } catch (error) {
    console.error("Error in updateCartItem controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ clerkId: req.user.clerkId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();
    res
      .status(200)
      .json({ message: "Item removed from cart successfully", cart });

  } catch (error) {
    console.error("Error in removeFromCart controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function clearCart(req, res) {
  try {
    const cart = await Cart.findOne({ clerkId: req.user.clerkId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully", cart });

  } catch (error) {
    console.error("Error in clearCart controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
