"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  FaBitcoin,
  FaChartLine,
  FaWallet,
  FaRobot
} from "react-icons/fa";

const AdvancedRealTimeChart = dynamic(
  async () =>
    (await import("react-ts-tradingview-widgets"))
      .AdvancedRealTimeChart,
  { ssr: false }
);

export default function HomePage() {

  const coins = [
    {
      name: "Bitcoin",
      price: "$108,000",
      change: "+4.2%"
    },
    {
      name: "Ethereum",
      price: "$4,200",
      change: "+2.8%"
    },
    {
      name: "Solana",
      price: "$190",
      change: "+8.1%"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white p-4 space-y-6">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >

        <h1 className="text-4xl font-bold">
          Tradigo Prime
        </h1>

        <p className="text-gray-400">
          AI Powered Crypto Trading
        </p>

      </motion.div>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-zinc-900 rounded-2xl p-4">
          <FaWallet size={30} />
          <div className="mt-2 text-gray-400">
            Wallet Balance
          </div>
          <div className="text-2xl font-bold">
            $12,540
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-4">
          <FaRobot size={30} />
          <div className="mt-2 text-gray-400">
            AI Signals
          </div>
          <div className="text-2xl font-bold text-green-400">
            BUY
          </div>
        </div>

      </div>

      <div className="bg-zinc-900 rounded-2xl overflow-hidden">

        <AdvancedRealTimeChart
          theme="dark"
          symbol="BINANCE:BTCUSDT"
          timezone="Asia/Kolkata"
          locale="en"
          autosize
        />

      </div>

      <div className="space-y-4">

        <h2 className="text-2xl font-bold">
          Live Market
        </h2>

        {coins.map((coin) => (

          <motion.div
            whileHover={{ scale: 1.02 }}
            key={coin.name}
            className="bg-zinc-900 rounded-2xl p-4 flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <FaBitcoin size={28} />

              <div>

                <div className="font-bold">
                  {coin.name}
                </div>

                <div className="text-gray-400">
                  {coin.price}
                </div>

              </div>

            </div>

            <div className="text-green-400 font-bold">
              {coin.change}
            </div>

          </motion.div>

        ))}

      </div>

      <div className="bg-zinc-900 rounded-2xl p-4">

        <div className="flex items-center gap-3">

          <FaChartLine size={28} />

          <div>

            <div className="font-bold text-xl">
              AI Market Prediction
            </div>

            <div className="text-green-400">
              Bullish Trend Detected
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
