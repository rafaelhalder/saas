import { useEffect, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";

export function useStripe() {
	const [stripe, setStripe] = useState<Stripe | null>();

	useEffect(() => {
		async function loadStripeAsync() {
			const stripeInstance = await loadStripe(
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!,
			);
			setStripe(stripeInstance);
		}

		loadStripeAsync();
	}, []);

	async function createPaymentStripeCheckout(checkoutData: {
		testeId: string;
	}) {
		if (!stripe) return;

		try {
			const response = await fetch("/api/stripe/create-pay-checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(checkoutData),
			});

			const data = await response.json();

			await stripe.redirectToCheckout({ sessionId: data.sessionId });
		} catch (e) {
			console.error(e);
		}
	}

	async function createSubscriptionStripeCheckout(checkoutData: {
		testeId: string;
	}) {
		if (!stripe) return;

		try {
			const response = await fetch("/api/stripe/create-subscription-checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(checkoutData),
			});

			const data = await response.json();

			await stripe.redirectToCheckout({ sessionId: data.sessionId });
		} catch (e) {
			console.error(e);
		}
	}

	async function handleCreateStripePortal() {
		const response = await fetch("/api/stripe/create-portal", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();

		window.location.href = data.url;
	}

	return {
		createPaymentStripeCheckout,
		createSubscriptionStripeCheckout,
		handleCreateStripePortal,
	};
}
