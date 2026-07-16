import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const company = await request.json();

  return NextResponse.json({
    success: true,
    message: `Hello! I received ${company.name}`,
  });
}