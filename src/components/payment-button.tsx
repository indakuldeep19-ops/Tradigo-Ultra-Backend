"use client";

import { useState } from "react";

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  label?: string;
  className?: string;
  variant?: string;
  onSuccess?: (paymentId: string) => void;
}

export default function PaymentButton({
  amount,
  currency = "USD",
  label = "Pay Now",
  className = "",
  variant = "default",
  onSuccess,
}: PaymentButtonProps) {

  const [loading, setLoading] = useState(false);

  async function handlePayment() {

    try {

      setLoading(true);

      const paymentId = "PAY_" + Date.now();

      if (onSuccess) {
        onSuccess(paymentId);
      }

      alert("Payment Successful");

    } catch (e) {

      alert("Payment Failed");

    } finally {

      setLoading(false);

    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      data-variant={variant}
      className={className}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
