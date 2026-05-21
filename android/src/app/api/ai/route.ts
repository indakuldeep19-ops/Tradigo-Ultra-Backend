import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = body.message || "";

    let reply =
      "I am Tradigo AI Assistant.";

    if (
      message.toLowerCase().includes("trade")
    ) {
      reply =
        "Analyzing trading signals...";
    }

    if (
      message.toLowerCase().includes("vip")
    ) {
      reply =
        "VIP unlocks advanced features.";
    }

    if (
      message.toLowerCase().includes("wallet")
    ) {
      reply =
        "Opening wallet support.";
    }

    return NextResponse.json({
      success: true,
      reply
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      reply: "AI Server Error"
    });
  }
}
