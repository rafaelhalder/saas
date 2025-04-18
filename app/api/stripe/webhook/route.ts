import stripe from "@/app/lib/stripe";
import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cancel";
import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const secret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
	try {
		const body = await req.text();
		const headersList = await headers();
		const signature = headersList.get("stripe-signature");

		if (!signature) {
			return NextResponse.json(
				{ error: "No signature or secret" },
				{ status: 400 },
			);
		}
		const event = stripe.webhooks.constructEvent(body, signature, secret);
		console.log(event)
		console.log("Received event:", event.id, event.type);
		switch (event.type) {
			case "checkout.session.completed": // pagamento realizado se status = paid - pode ser tanto pagamento unico quanto assinatura
				// biome-ignore lint/correctness/noSwitchDeclarations: <explanation>
				const metadata = event.data.object.metadata;

				if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
					await handleStripePayment(event);
				}

				if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
					await handleStripeSubscription(event);
				}

				break;
			case "checkout.session.expired": // expirou tempo de pagamento
				console.log("Send email to user about payment expiration");
				break;
			case "checkout.session.async_payment_succeeded": // boleto pago
				console.log("Send email to user about payment success");
				break;
			case "checkout.session.async_payment_failed": // boleto falhou
				console.log("Send email to user about payment failure");
				break;
			case "customer.subscription.created": // criou assinatura
				console.log(
					"Send email to user about subscription creation. Welcome message",
				);
				break;
			case "customer.subscription.deleted": // cancelou assinatura
				await handleStripeCancelSubscription(event);
				break;
			default:
				console.log(`Unhandled event type ${event.type}`);
		}
		return NextResponse.json({}, { status: 200 });

		// return NextResponse.json({ message: "Webhook received" }, { status: 200 });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: "Webhook error" }, { status: 500 });
	}
}
