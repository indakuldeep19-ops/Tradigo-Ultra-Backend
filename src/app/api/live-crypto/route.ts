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
          per_page: 100,
          page: 1,
          sparkline: true,
          price_change_percentage:
            "1h,24h,7d"
        }
      }
    );

    return NextResponse.json({
      success: true,
      data: response.data
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: "Crypto API Error"
    });

  }

}
