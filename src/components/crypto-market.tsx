'use client';

import {
  useEffect,
  useState
} from "react";

export default function CryptoMarket() {
  const [coins, setCoins] =
    useState<any[]>([]);

  const loadCoins = async () => {
    try {
      const response = await fetch(
        "/api/crypto"
      );

      const data =
        await response.json();

      setCoins(data.cryptos || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCoins();

    const interval = setInterval(() => {
      loadCoins();
    }, 30000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Live Crypto Market
      </h2>

      {coins.map((coin) => (
        <div
          key={coin.id}
          className="border rounded-xl p-4"
        >
          <div className="font-bold">
            {coin.name}
          </div>

          <div>
            ${coin.current_price}
          </div>

          <div>
            Rank #{coin.market_cap_rank}
          </div>
        </div>
      ))}
    </div>
  );
}
