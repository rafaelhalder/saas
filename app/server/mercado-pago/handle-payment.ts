import type { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
	const metadata = paymentData.metadata;
	const userEmail = metadata.user_email;
	const testeId = metadata.teste_id;

	console.log("Pagamento com Sucesso", { userEmail, testeId });
}
