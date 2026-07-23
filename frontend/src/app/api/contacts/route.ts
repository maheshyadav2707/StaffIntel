import { NextRequest, NextResponse } from "next/server";
import { getDecisionMakers } from "@/lib/contactIntelligence";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const contacts = await getDecisionMakers({
  id: body.companyId,
  name: body.companyName,
  domain: body.companyDomain,
  employees: body.employees,
  signals: body.signals,
});

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Contact discovery API failed:", error);

    return NextResponse.json(
      { error: "Failed to discover contacts" },
      { status: 500 }
    );
  }
}