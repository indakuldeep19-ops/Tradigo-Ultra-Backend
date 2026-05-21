import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const amount = body.amount || 199;

    return NextResponse.json({
      success: true,
      orderId:
        "ORDER_" + Date.now(),
      amount
    });
  } catch (error) {
    return NextResponse.json({
      success: false
    });
  }
}
