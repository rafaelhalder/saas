import { db } from "@/app/lib/firebase";
import "server-only";

import type Stripe from "stripe";

export async function handleStripePayment(
	event: Stripe.CheckoutSessionCompletedEvent,
) {
	if (event.data.object.payment_status === "paid") {
		console.log(
			"Payment succeeded! Send email to user about payment success and unlock the product.",
		);

		const metadata = event.data.object.metadata;

		const userId = metadata?.userId;

		if (!userId) {
			console.error("User id not found");
			return;
		}

		await db.collection("users").doc(userId).update({
			stripeSubscriptionid: event.data.object.subscription,
			subscriptionStatus: "active",
		});
	}
}
