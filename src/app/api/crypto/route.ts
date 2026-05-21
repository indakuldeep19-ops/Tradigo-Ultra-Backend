import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: false
        }
      }
    );

    return NextResponse.json({
      success: true,
      cryptos: response.data
    });
  } catch (error) {
    return NextResponse.json({
      success: false
    });
  }
}
