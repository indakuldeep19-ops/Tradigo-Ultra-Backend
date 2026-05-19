
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CreditCard } from 'lucide-react';
import { useCurrency } from '@/context/currency-context';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  label: string;
  onSuccess?: (paymentId: string) => void;
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
}

export function PaymentButton({
  amount,
  currency = 'INR',
  label,
  onSuccess,
  variant = 'default',
  className,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await createRazorpayOrder(amount, currency);
      if (!res.success || !res.order) {
        throw new Error(res.error || 'Failed to initialize payment');
      }

      const options = {
        // Use provided production key
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_Sm9ukMcAM7nPBD',
        amount: res.order.amount,
        currency: res.order.currency,
        name: 'Tradigo Prime',
        description: label,
        order_id: res.order.id,
        handler: async function (response: any) {
          const verification = await verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );

          if (verification.success) {
            toast({
              title: 'Payment Successful',
              description: `Successfully paid ${amount} ${currency}`,
            });
            onSuccess?.(response.razorpay_payment_id);
          } else {
            toast({
              variant: 'destructive',
              title: 'Payment Verification Failed',
              description: 'Please contact support if funds were deducted.',
            });
          }
        },
        prefill: {
          name: 'Trader',
          email: 'trader@tradigo.prime',
        },
        theme: {
          color: '#D4AF37',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: err.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      variant={variant}
      className={className}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <CreditCard className="mr-2 h-4 w-4" />
      )}
      {label}
    </Button>
  );
}
