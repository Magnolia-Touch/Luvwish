import { Injectable } from '@nestjs/common';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';

@Injectable()
export class RazorpayService {
  // private razorpay: Razorpay;

  // constructor() {
  //   this.razorpay = new Razorpay({
  //     key_id: process.env.RAZORPAY_KEY_ID,
  //     key_secret: process.env.RAZORPAY_KEY_SECRET,
  //   });
  // }

  // async createOrder(amount: number, currency: string = 'INR') {
  //   const options = {
  //     amount: amount * 100, // convert to paise
  //     currency,
  //     receipt: `receipt_${Date.now()}`,
  //   };

  //   return this.razorpay.orders.create(options);
  // }

  // async verifyPayment(signature: string, orderId: string, paymentId: string): Promise<boolean> {
  //   const body = orderId + '|' + paymentId;

  //   const expectedSignature = crypto
  //     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
  //     .update(body.toString())
  //     .digest('hex');

  //   return expectedSignature === signature;
  // }
}
