
'use server';

import { razorpay } from '@/lib/razorpay';
import crypto from 'crypto';

export async function createRazorpayOrder(amount: number, currency: string = 'INR') {
  try {
    const options = {
      amount: Math.round(amount * 100), // Convert to smallest currency unit (paisa for INR)
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return { success: true, order };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return { success: false, error: 'Failed to create payment order' };
  }
}

export async function verifyPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) {
  const secret = process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret';
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  return { success: isAuthentic };
}
