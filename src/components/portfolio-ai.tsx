'use client';

export default function PortfolioAI() {

  const portfolio = [
    {
      coin: "BTC",
      profit: "+12%"
    },
    {
      coin: "ETH",
      profit: "+8%"
    }
  ];

  return (

    <div className="space-y-4">

      <h1 className="text-2xl font-bold">
        AI Portfolio
      </h1>

      {portfolio.map((item) => (

        <div
          key={item.coin}
          className="border p-4 rounded-xl"
        >

          <div>{item.coin}</div>

          <div>{item.profit}</div>

        </div>

      ))}

    </div>

  );

}
