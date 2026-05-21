import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = body.message || "";

    let reply = "I am your Tradigo AI assistant.";

    if (message.toLowerCase().includes("signal")) {
      reply = "Checking trading signals...";
    } else if (message.toLowerCase().includes("vip")) {
      reply = "VIP unlocks premium trading tools.";
    } else if (message.toLowerCase().includes("wallet")) {
      reply = "Opening wallet support.";
    }

    return NextResponse.json({
      success: true,
      reply
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      reply: "AI server error"
    });
  }
}
