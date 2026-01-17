import stripe from "../config/stripe.js";
import Orders from "../models/order_model.js";

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed");
    return res.status(400).send(`Webhook Error`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const orderId = paymentIntent.metadata.orderId;

    await Orders.findByIdAndUpdate(orderId, {
      paymentStatus: "PAID",
    });
  }

  res.json({ received: true });
};

export default stripeWebhook;