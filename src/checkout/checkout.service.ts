import { Inject, Injectable, Logger } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateOrderNumber } from 'src/common/utility/utils';
import { OrdersService } from 'src/orders/orders.service';
@Injectable()
export class CheckOutService {
  private stripe: Stripe;

  private readonly logger = new Logger(CheckOutService.name);

  constructor(
    @Inject('STRIPE_API_KEY')
    private readonly apiKey: string,
    private prisma: PrismaService,
    private orderService: OrdersService
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2025-07-30.basil', // Use latest API version, or "null" for your default
    });
  }

  // Accept Payments (Create Payment Intent)
  async createPaymentIntent(
    profile_id: string,
    productId?: string,
    quantity?: number,
    cartId?: string,
  ): Promise<Stripe.PaymentIntent> {
    let items = [];
    let subtotal = 0;
    // 1. If cartId is provided → checkout from cart
    if (cartId) {
      const cartItems = await this.prisma.cartItem.findMany({
        where: { customerProfileId: profile_id },
        include: { product: true },
      });

      if (!cartItems.length) throw new Error('Cart is empty');

      items = cartItems.map((ci) => ({
        productId: ci.productId,
        quantity: ci.quantity,
        actualPrice: ci.product.actualPrice,
        discountedPrice: ci.product.discountedPrice,
        total: ci.quantity * Number(ci.product.discountedPrice),
      }));

      subtotal = items.reduce((acc, i) => acc + i.total, 0);
    }

    // 2. If productId is provided (direct purchase)
    else if (productId) {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) throw new Error('Product not found');
      items = [
        {
          productId: product.id,
          quantity: quantity ?? 1,
          actualPrice: product.actualPrice,
          discountedPrice: product.discountedPrice,
          total: (quantity ?? 1) * Number(product.discountedPrice),
        },
      ];
      subtotal = items[0].total;
    }
    // 3. If both provided → treat as cart checkout (cart wins)
    else {
      throw new Error('Either productId or cartId must be provided');
    }
    // 4. Create Order in DB
    const order = await this.prisma.order.create({
      data: {
        customerProfileId: profile_id,
        orderNumber: generateOrderNumber(),
        status: 'pending',
        totalAmount: subtotal,
        discountAmount: 0,
        shippingCost: 0,
        taxAmount: 0,
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            actualPrice: i.actualPrice,
            discountedPrice: i.discountedPrice,
            total: i.total,
          })),
        },

        Payment: {
          create: {
            amount: subtotal,
            status: 'pending',
            method: 'stripe',
          },
        },
      },
      include: { items: true },
    });
    const currency = "usd"
    // 5. Create Stripe PaymentIntent
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(subtotal * 100), // Stripe expects cents
        currency,
        metadata: {
          orderId: order.id,
          customerProfileId: profile_id,
          orderNumber: order.orderNumber,
        },
      });
      this.logger.log(
        `PaymentIntent created successfully with amount: ${subtotal} ${currency}`,
      );
      return paymentIntent;
    } catch (error) {
      this.logger.error('Failed to create PaymentIntent', error.stack);
      throw error;
    }
  }


  // Refunds (Process Refund)
  async refundPayment(paymentIntentId: string): Promise<Stripe.Refund> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
      });
      this.logger.log(
        `Refund processed successfully for PaymentIntent: ${paymentIntentId}`,
      );
      return refund;
    } catch (error) {
      this.logger.error('Failed to process refund', error.stack);
      throw error;
    }
  }


  // Payment Links
  async createPaymentLink(priceId: string): Promise<Stripe.PaymentLink> {
    try {
      const paymentLink = await this.stripe.paymentLinks.create({
        line_items: [{ price: priceId, quantity: 1 }],
      });
      this.logger.log('Payment link created successfully');
      return paymentLink;
    } catch (error) {
      this.logger.error('Failed to create payment link', error.stack);
      throw error;
    }
  }




}
