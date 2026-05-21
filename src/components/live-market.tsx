'use client';

import {
  useEffect,
  useState
} from "react";

export default function LiveMarket() {

  const [coins, setCoins] =
    useState<any[]>([]);

  const loadCoins = async () => {

    try {

      const response = await fetch(
        "/api/live-crypto"
      );

      const data =
        await response.json();

      setCoins(data.data || []);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadCoins();

    const interval =
      setInterval(loadCoins, 10000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="space-y-4">

      <h1 className="text-3xl font-bold">
        Live Crypto Market
      </h1>

      {coins.map((coin) => (

        <div
          key={coin.id}
          className="border rounded-2xl p-4"
        >

          <div className="flex justify-between">

            <div>

              <div className="font-bold">
                {coin.name}
              </div>

              <div>
                {coin.symbol}
              </div>

            </div>

            <div>

              <div>
                $
                {coin.current_price}
              </div>

              <div>
                24H:
                {
                  coin.price_change_percentage_24h
                }%
              </div>

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}
