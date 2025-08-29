import { Controller, Post, Body } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';

@Controller('razorpay')
export class RazorpayController {
  // constructor(private readonly razorpayService: RazorpayService) { }
  // @Post('create-order')
  // async createOrder(@Body('amount') amount: number) {
  //   return this.razorpayService.createOrder(amount);
  // }
  // @Post('verify-payment')
  // async verifyPayment(
  //   @Body('razorpay_order_id') razorpay_order_id: string,
  //   @Body('razorpay_payment_id') razorpay_payment_id: string,
  //   @Body('razorpay_signature') razorpay_signature: string,
  // ) {
  //   const isValid = await this.razorpayService.verifyPayment(
  //     razorpay_signature,
  //     razorpay_order_id,
  //     razorpay_payment_id,
  //   );
  //   return { valid: isValid };
  // }
}
