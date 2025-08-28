"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CheckOutService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckOutService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const prisma_service_1 = require("../prisma/prisma.service");
const utils_1 = require("../common/utility/utils");
const orders_service_1 = require("../orders/orders.service");
let CheckOutService = CheckOutService_1 = class CheckOutService {
    constructor(apiKey, prisma, orderService) {
        this.apiKey = apiKey;
        this.prisma = prisma;
        this.orderService = orderService;
        this.logger = new common_1.Logger(CheckOutService_1.name);
        this.stripe = new stripe_1.default(this.apiKey, {
            apiVersion: '2025-07-30.basil',
        });
    }
    async createPaymentIntent(profile_id, productId, quantity, cartId) {
        let items = [];
        let subtotal = 0;
        if (cartId) {
            const cartItems = await this.prisma.cartItem.findMany({
                where: { customerProfileId: profile_id },
                include: { product: true },
            });
            if (!cartItems.length)
                throw new Error('Cart is empty');
            items = cartItems.map((ci) => ({
                productId: ci.productId,
                quantity: ci.quantity,
                actualPrice: ci.product.actualPrice,
                discountedPrice: ci.product.discountedPrice,
                total: ci.quantity * Number(ci.product.discountedPrice),
            }));
            subtotal = items.reduce((acc, i) => acc + i.total, 0);
        }
        else if (productId) {
            const product = await this.prisma.product.findUnique({
                where: { id: productId },
            });
            if (!product)
                throw new Error('Product not found');
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
        else {
            throw new Error('Either productId or cartId must be provided');
        }
        const order = await this.prisma.order.create({
            data: {
                customerProfileId: profile_id,
                orderNumber: (0, utils_1.generateOrderNumber)(),
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
        const currency = "usd";
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: Math.round(subtotal * 100),
                currency,
                metadata: {
                    orderId: order.id,
                    customerProfileId: profile_id,
                    orderNumber: order.orderNumber,
                },
            });
            this.logger.log(`PaymentIntent created successfully with amount: ${subtotal} ${currency}`);
            return paymentIntent;
        }
        catch (error) {
            this.logger.error('Failed to create PaymentIntent', error.stack);
            throw error;
        }
    }
    async refundPayment(paymentIntentId) {
        try {
            const refund = await this.stripe.refunds.create({
                payment_intent: paymentIntentId,
            });
            this.logger.log(`Refund processed successfully for PaymentIntent: ${paymentIntentId}`);
            return refund;
        }
        catch (error) {
            this.logger.error('Failed to process refund', error.stack);
            throw error;
        }
    }
    async createPaymentLink(priceId) {
        try {
            const paymentLink = await this.stripe.paymentLinks.create({
                line_items: [{ price: priceId, quantity: 1 }],
            });
            this.logger.log('Payment link created successfully');
            return paymentLink;
        }
        catch (error) {
            this.logger.error('Failed to create payment link', error.stack);
            throw error;
        }
    }
};
exports.CheckOutService = CheckOutService;
exports.CheckOutService = CheckOutService = CheckOutService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('STRIPE_API_KEY')),
    __metadata("design:paramtypes", [String, prisma_service_1.PrismaService,
        orders_service_1.OrdersService])
], CheckOutService);
//# sourceMappingURL=checkout.service.js.map