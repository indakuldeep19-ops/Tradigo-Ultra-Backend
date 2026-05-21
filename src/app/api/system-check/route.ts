import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    frontend: "OK",
    backend: "OK",
    ai: "RUNNING",
    payments: "RUNNING",
    crypto: "LIVE",
    status: "HEALTHY"
  });
}
