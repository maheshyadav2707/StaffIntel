import { normalizeJobs } from "@/lib/jobs/normalizeJobs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://jsearch.p.rapidapi.com/search-v2?query=developer%20jobs&country=us&num_pages=5&date_posted=all",
      {
  headers: {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
    "x-rapidapi-host": "jsearch.p.rapidapi.com",
    "Content-Type": "application/json",
  },
  next: {
    revalidate: 21600,
  },
}
    );

    if (!response.ok) {
      throw new Error(`JSearch API returned ${response.status}`);
    }

    const data = await response.json();

const jobs = normalizeJobs(data);

// Select a small discovery pool for future enrichment
const topCandidates = jobs
  .sort((a, b) => b.signals.openJobs - a.signals.openJobs)
  .slice(0, 10);

console.log(
  "Top candidates for enrichment:",
  topCandidates.map((company) => ({
    name: company.name,
    openJobs: company.signals.openJobs,
  }))
);

return NextResponse.json(jobs);

  } catch (error: any) {
    console.error("Jobs API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}