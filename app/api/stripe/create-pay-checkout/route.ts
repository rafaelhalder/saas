import stripe from "@/app/lib/stripe";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { testeId, userEmail } = await req.json();

	const price = process.env.STRIPE_PRODUCT_PRICE_ID;

	if (!price) {
		return NextResponse.json({ error: "Price not found" }, { status: 500 });
	}

	const metadata = { testeId, price };

	try {
		const session = await stripe.checkout.sessions.create({
			line_items: [{ price, quantity: 1 }],
			mode: "payment",
			payment_method_types: ["card", "boleto"],
			success_url: `${req.headers.get("origin")}/success`,
			cancel_url: `${req.headers.get("origin")}/`,
			...(userEmail && { customer_email: userEmail }), // Add customer_email only if userEmail is provided
			metadata,
		});

		if (!session.url) {
			return NextResponse.json(
				{ error: "Session URL not found" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ sessionId: session.id }, { status: 200 });
	} catch (e) {
		console.error(e);
		return NextResponse.error();
	}
}
