import { initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useMercadoPago() {
	const router = useRouter();
	useEffect(() => {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
	}, []);

	async function createMercadoPagoCheckout({
		testeId,
		userEmail,
	}: { testeId: string; userEmail: string }) {
		try {
			const response = await fetch("/api/mercado-pago/create-checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ testeId, userEmail }),
			});

			const data = await response.json();

			router.push(data.initPoint);
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	return {
		createMercadoPagoCheckout,
	};
}
