import AIAssistant from "@/components/ai-assistant";

import PaymentButton from "@/components/payment-button";

export default function HomePage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">
        Tradigo Prime
      </h1>

      <AIAssistant />

      <PaymentButton
        amount={199}
        currency="USD"
        label="Upgrade To VIP"
        className="bg-black text-white px-5 py-3 rounded-xl"
      />
    </main>
  );
}
