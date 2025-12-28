import stripe from "../config/stripe.js";
import Orders from "../models/order_model.js";

export const createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentStatus === "PAID") {
      return res.status(400).json({ message: "Order already paid" });
    }

    //CREATE THE PAYMENT INTENT
    //order id, userid, amount, currency

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100),
      currency: "inr",
      metadata: {
        orderId: order._id.toString(),
        userId: order.user.toString(),
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: "Payment error" });
  }
};
