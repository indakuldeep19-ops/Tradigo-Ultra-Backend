"use client";

import dynamic from "next/dynamic";

const AdvancedRealTimeChart = dynamic(
  async () =>
    (await import("react-ts-tradingview-widgets"))
      .AdvancedRealTimeChart,
  { ssr: false }
);

export default function LiveChart() {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden">
      <AdvancedRealTimeChart
        theme="dark"
        symbol="BINANCE:BTCUSDT"
        timezone="Asia/Kolkata"
        locale="en"
        autosize
      />
    </div>
  );
}
