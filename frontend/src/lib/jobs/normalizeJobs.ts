export interface StaffIntelCompany {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: number;
  jobs: any[];
 signals: {
  openJobs: number;
  oldJobs: number;
  recentlyFunded: boolean;
  hasTalentLeader: boolean;
hiringGrowth: boolean;
remoteJobs: number;
jobTypes: string[];
};
}

export function normalizeJobs(apiResponse: any): StaffIntelCompany[] {
  const jobs = apiResponse.data?.jobs || [];

  const companies = new Map<string, StaffIntelCompany>();

  for (const job of jobs) {
    const name = job.employer_name || "Unknown Company";

    if (!companies.has(name)) {
      companies.set(name, {
        id: name,
        name,
        industry: job.job_employment_type || "Technology",
        location: job.job_location || "Unknown",
        employees: 0,
        jobs: [],
 signals: {
  openJobs: 0,
  oldJobs: 0,
  recentlyFunded: false,
  hasTalentLeader: true,
  hiringGrowth: false,
  remoteJobs: 0,
  jobTypes: [],
},
      });
    }

    const company = companies.get(name)!;

   company.jobs.push(job);
company.signals.openJobs++;

if (
  job.job_posted_at &&
  job.job_posted_at.toLowerCase().includes("30")
) {
  company.signals.oldJobs++;
}

if (job.job_is_remote) {
  company.signals.remoteJobs++;
}

if (job.job_employment_type) {
  if (!company.signals.jobTypes.includes(job.job_employment_type)) {
    company.signals.jobTypes.push(job.job_employment_type);
  }
}
  }

  return Array.from(companies.values());
}