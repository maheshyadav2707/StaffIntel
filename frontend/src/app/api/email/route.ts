import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const company = await request.json();

    const response = await openai.responses.create({
      model: "gpt-5.5",
      input: `
You are StaffIntel AI.

You are an elite B2B staffing sales consultant.

Write a professional cold email for the staffing company below.

Company:

Name: ${company.name}
Industry: ${company.industry}
Location: ${company.location}
Employees: ${company.employees}

Hiring Signals:
${JSON.stringify(company.signals, null, 2)}

Requirements:

Write a concise email.

Structure:

Subject:

Greeting

Short personalized opening.

Mention ONE hiring challenge based on the hiring signals.

Explain how our staffing company can help.

End with a soft call-to-action.

Keep it under 170 words.

Return ONLY valid JSON.

Use exactly this structure:

{
  "subject": "",
  "email": ""
}

Do not include markdown.

Return JSON only.
`,
    });

  const aiResult = JSON.parse(response.output_text);

return NextResponse.json({
    success: true,
    email: aiResult,
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate email",
      },
      { status: 500 }
    );
  }
}