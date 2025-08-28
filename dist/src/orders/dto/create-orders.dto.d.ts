import { OrderStatus, PaymentStatus } from '@prisma/client';
import { CreateOrderItemDto } from './create-order-item.dto';
export declare class CreateOrderDto {
    orderNumber: string;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    totalAmount: number;
    shippingCost?: number;
    taxAmount?: number;
    discountAmount?: number;
    notes?: string;
    shippingAddressId?: string;
    trackingID?: string;
    items: CreateOrderItemDto[];
}
