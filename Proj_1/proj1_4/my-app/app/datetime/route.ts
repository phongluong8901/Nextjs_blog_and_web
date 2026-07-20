import { NextResponse } from "next/server";

export const dynamc = "fore-dynamic";
export function GET() {
  return NextResponse.json({
    dateTime: new Date().toLocaleTimeString(),
  });
}
