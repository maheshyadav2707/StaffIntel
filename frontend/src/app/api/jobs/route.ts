import { normalizeJobs } from "@/lib/jobs/normalizeJobs";
import { NextResponse } from "next/server";

let cachedJobs: any[] | null = null;
let cacheTime = 0;

const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

const companyJobsCache = new Map<
  string,
  { data: any; timestamp: number }
>();
const companyProfileCache = new Map<
  string,
  { data: any; timestamp: number }
>();
async function fetchCompanyProfile(companyName: string) {
  const cached = companyProfileCache.get(companyName);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    console.log(`Returning cached profile for ${companyName}`);
    return cached.data;
  }

  const response = await fetch(
  `https://api.thecompaniesapi.com/v2/companies/by-name?name=${encodeURIComponent(companyName)}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.COMPANIES_API_KEY}`,
    },
  }
);

if (!response.ok) {
  throw new Error(
    `Companies API failed for ${companyName}: ${response.status}`
  );
}

const data = await response.json();

companyProfileCache.set(companyName, {
  data,
  timestamp: Date.now(),
});

console.log(`Fresh company profile stored for ${companyName}`);

return data;
}

async function fetchCompanyJobs(companyName: string) {
  const cached = companyJobsCache.get(companyName);
const now = Date.now();

if (cached && now - cached.timestamp < CACHE_DURATION) {
  console.log(`Returning cached enrichment for ${companyName}`);
  return cached.data;
}
  const query = encodeURIComponent(`${companyName} jobs`);

  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search-v2?query=${query}&country=us&num_pages=1&date_posted=all`,
    {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`JSearch enrichment failed for ${companyName}`);
  }

 const data = await response.json();

companyJobsCache.set(companyName, {
  data,
  timestamp: Date.now(),
});

console.log(`Fresh enrichment stored for ${companyName}`);

return data;
}

export async function GET() {
  try {

    const now = Date.now();

if (cachedJobs && now - cacheTime < CACHE_DURATION) {
  console.log("Returning cached jobs");
  return NextResponse.json(cachedJobs);
}
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

cachedJobs = jobs;
cacheTime = Date.now();

console.log("Fresh jobs stored in cache");

// Select a small discovery pool for future enrichment
const topCandidates = jobs
  .sort((a, b) => b.signals.openJobs - a.signals.openJobs)
  .slice(0, 5);

console.log(
  "Top candidates for enrichment:",
  topCandidates.map((company) => ({
    name: company.name,
    openJobs: company.signals.openJobs,
  }))
);

if (topCandidates.length > 0) {
  const testCompany = topCandidates[0];

  const profileData = await fetchCompanyProfile(testCompany.name);

  const profile = profileData?.companies?.[0];

  console.log("Company profile test:", {
    name: testCompany.name,
    employees: profile?.about?.totalEmployeesExact ?? 0,
  });
}
for (const company of topCandidates) {
  const enrichmentData = await fetchCompanyJobs(company.name);

  const enrichedJobs = enrichmentData.data?.jobs || [];

  company.signals.openJobs = enrichedJobs.length;

  company.signals.remoteJobs = enrichedJobs.filter(
    (job: any) => job.job_is_remote === true
  ).length;

  company.signals.jobTypes = [
    ...new Set(
      enrichedJobs
        .map((job: any) => job.job_employment_type)
        .filter(Boolean)
    ),
  ] as string[];

  const fortyFiveDaysAgo =
    Date.now() - 45 * 24 * 60 * 60 * 1000;

  company.signals.oldJobs = enrichedJobs.filter((job: any) => {
    if (!job.job_posted_at) return false;

    const postedDate = new Date(job.job_posted_at).getTime();

    return postedDate < fortyFiveDaysAgo;
  }).length;

  console.log(`Enriched signals for ${company.name}:`, {
    openJobs: company.signals.openJobs,
    oldJobs: company.signals.oldJobs,
    remoteJobs: company.signals.remoteJobs,
    jobTypes: company.signals.jobTypes,
  });
}
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