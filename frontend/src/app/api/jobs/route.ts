import { normalizeJobs } from "@/lib/jobs/normalizeJobs";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://jsearch.p.rapidapi.com/search-v2?query=developer%20jobs&country=us&num_pages=1&date_posted=all",
    {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    }
  );

const data = await response.json();

const jobs = normalizeJobs(data);

return NextResponse.json(jobs);
}