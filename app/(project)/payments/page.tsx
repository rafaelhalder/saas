"use client";

import { useMercadoPago } from "@/app/hooks/useMercadoPago";
import { useStripe } from "@/app/hooks/useStripe";

export default function Payments() {
	const {
		createPaymentStripeCheckout,
		createSubscriptionStripeCheckout,
		handleCreateStripePortal,
	} = useStripe();
	const { createMercadoPagoCheckout } = useMercadoPago()

	return (
		<div className="flex h-screen w-full items-center justify-center flex-col gap-5">
			<h1 className="text-3xl font-bold">Payments</h1>
			<button
				className="border rounded-md px-1"
				type="button"
				onClick={() => createPaymentStripeCheckout({ testeId: "123" })}
			>
				Create Stripe Payment
			</button>
			<button
				className="border rounded-md px-1"
				type="button"
				onClick={() => createSubscriptionStripeCheckout({ testeId: "123" })}
			>
				Create Stripe Subscription
			</button>
			<button
				className="border rounded-md px-1"
				type="button"
				onClick={handleCreateStripePortal}
			>
				Create Stripe Portal
			</button>
			<button
				className="border rounded-md px-1"
				type="button"
				onClick={() => createMercadoPagoCheckout({ testeId: "123", userEmail: 'teste@teste.com' })}
			>
				Create Mercado Pago Payment
			</button>
		</div>
	);
}
