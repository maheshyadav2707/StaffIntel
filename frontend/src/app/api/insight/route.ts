import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const insightCache = new Map<
  string,
  {
    insight: any;
    timestamp: number;
  }
>();

const INSIGHT_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(request: Request) {
  try {
    const company = await request.json();
 // 👇 Add the cache check here

  const cacheKey = [
  company.name,
  company.signals.openJobs,
  company.signals.oldJobs,
  company.signals.remoteJobs,
  company.signals.hiringGrowth,
  company.signals.recentlyFunded,
  company.signals.hasTalentLeader,
  ...(company.signals.jobTypes ?? []),
].join("|");

console.log("Company:", company.name);
console.log("Cache Key:", cacheKey);

const cached = insightCache.get(cacheKey);

console.log("Cache Hit:", !!cached);

    if (
      cached &&
      Date.now() - cached.timestamp < INSIGHT_CACHE_DURATION
    ) {
      console.log(`Returning cached insight for ${company.name}`);

      return NextResponse.json({
        success: true,
        insight: cached.insight,
      });
    }

    // 👇 Existing OpenAI call stays exactly as it is

    const response = await openai.responses.create({
      model: "gpt-5.5",
      input: `
You are StaffIntel AI.

You are an elite staffing opportunity analyst.

Your purpose is NOT to summarize companies.

Your purpose is to identify companies that are highly likely to require external staffing services.

Analyze ONLY from a staffing perspective.

Company Information

Name: ${company.name}
Industry: ${company.industry}
Location: ${company.location}
Employees: ${company.employees}

Hiring Signals:
${JSON.stringify(company.signals, null, 2)}

Write:
Write a concise staffing intelligence report.

Include:

1. Why this company is a strong staffing opportunity.

2. The biggest hiring pain point.

3. The best decision maker to contact.

4. The recommended sales angle.

5. A confidence level (High, Medium or Low).

Return ONLY valid JSON.

Use exactly this structure:

{
  "summary": "",
  "painPoint": "",
  "decisionMaker": "",
  "salesAngle": "",
  "confidence": ""
}

Do not include markdown.

Do not wrap the JSON in triple backticks.

Return JSON only.
`,
    });

const aiResult = JSON.parse(response.output_text);

// Save to cache
insightCache.set(cacheKey, {
  insight: aiResult,
  timestamp: Date.now(),
});

console.log(`Fresh AI insight stored for ${company.name}`);

return NextResponse.json({
  success: true,
  insight: aiResult,
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate insight",
      },
      { status: 500 }
    );
  }
}