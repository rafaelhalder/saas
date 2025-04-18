import { db } from "@/app/lib/firebase";
import "server-only";

import type Stripe from "stripe";

export async function handleStripeSubscription(
	event: Stripe.CheckoutSessionCompletedEvent,
) {
	if (event.data.object.payment_status === "paid") {
		console.log(
			"Subscription created! Send email to user about subscription creation. Welcome message",
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
