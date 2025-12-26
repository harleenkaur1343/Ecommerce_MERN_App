import Orders from "../models/order_model.js";
import Cart from "../models/cart_model.js";

export const placeOrder = async (req, res) => {
  try {
    //need user's cart - p
    const cart = await Cart.findOneAndDelete({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    //if all okay then go to orders
    //preparing the object changning form for storage in order
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      qty: item.qty,
      price: item.product.price,
    }));
    //totalAmt of all the products in the cart

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.qty * item.product.price,
      0
    );

    const order = await Orders.create({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress: req.body.shippingAddress,
    });

    //clear the cart

    cart.items = [];

    await cart.save();
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUsersOrders = async (req, res) => {
  try {
    const getOrder = (await Orders.find({ user: req.user.id })).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
