import Stripe from 'stripe';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersService } from 'src/orders/orders.service';
export declare class CheckOutService {
    private readonly apiKey;
    private prisma;
    private orderService;
    private stripe;
    private readonly logger;
    constructor(apiKey: string, prisma: PrismaService, orderService: OrdersService);
    createPaymentIntent(profile_id: string, productId?: string, quantity?: number, cartId?: string): Promise<Stripe.PaymentIntent>;
    refundPayment(paymentIntentId: string): Promise<Stripe.Refund>;
    createPaymentLink(priceId: string): Promise<Stripe.PaymentLink>;
}
