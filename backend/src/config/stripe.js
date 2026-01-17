import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

export default stripe;






