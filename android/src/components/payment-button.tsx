'use client';

import { useState } from "react";

type Props = {
  amount?: number;
  currency?: string;
  label?: string;
  className?: string;
};

export default function PaymentButton({
  amount = 199,
  currency = "USD",
  label = "Become VIP",
  className = ""
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const startPayment =
    async () => {
      try {
        setLoading(true);

        const response =
          await fetch(
            "/api/payment/create-order",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                amount
              })
            }
          );

        const data =
          await response.json();

        alert(
          "Payment Order: " +
            data.orderId
        );
      } catch (error) {
        alert("Payment Failed");
      } finally {
        setLoading(false);
      }
    };

  return (
    <button
      onClick={startPayment}
      disabled={loading}
      className={className}
    >
      {loading
        ? "Processing..."
        : label}
    </button>
  );
}
