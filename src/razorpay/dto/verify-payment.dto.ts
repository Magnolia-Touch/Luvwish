import { IsString } from 'class-validator';

export class VerifyPaymentDto {
    @IsString()
    razorpay_order_id: string;

    @IsString()
    razorpay_payment_id: string;

    @IsString()
    razorpay_signature: string;

    @IsString()
    orderId: string; // our DB order ID
}
