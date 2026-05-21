'use client';

export default function CopyTrading() {

  const traders = [
    {
      name: "Pro Trader",
      roi: "+210%"
    },
    {
      name: "Elite Trader",
      roi: "+180%"
    }
  ];

  return (

    <div className="space-y-4">

      <h1 className="text-2xl font-bold">
        Copy Trading
      </h1>

      {traders.map((trader) => (

        <div
          key={trader.name}
          className="border p-4 rounded-xl"
        >

          <div>{trader.name}</div>

          <div>{trader.roi}</div>

          <button
            className="bg-black text-white px-4 py-2 rounded-xl mt-2"
          >
            Copy Trader
          </button>

        </div>

      ))}

    </div>

  );

}
