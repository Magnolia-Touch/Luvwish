import { CheckOutService } from './checkout.service';
export declare class CheckOutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckOutService);
    createPaymentIntent(body: {
        amount: number;
        currency: string;
    }, productId: string, quantity: number, cartId: string, req: any): Promise<import("stripe").Stripe.PaymentIntent>;
    refundPayment(body: {
        paymentIntentId: string;
    }): Promise<import("stripe").Stripe.Refund>;
    createPaymentLink(body: {
        priceId: string;
    }): Promise<import("stripe").Stripe.PaymentLink>;
}
