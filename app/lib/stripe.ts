import Stripe from "stripe";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-03-31.basil",
});

export default stripe;
