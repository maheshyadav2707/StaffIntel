import { Company } from "@/types/company";

export function calculateConfidence(company: Company) {
  let dataPoints = 0;

  const signals = company.signals;

  if (company.employees > 0) dataPoints++;
  if (signals.openJobs > 0) dataPoints++;
  if (signals.oldJobs > 0) dataPoints++;
  if (signals.remoteJobs > 0) dataPoints++;
  if ((signals.jobTypes?.length ?? 0) > 0) dataPoints++;
  if (signals.recentlyFunded) dataPoints++;
if (signals.hiringGrowth) dataPoints++;
if (typeof signals.hasTalentLeader === "boolean") dataPoints++;

  if (dataPoints >= 4) {
    return "High";
  }

  if (dataPoints >= 2) {
    return "Medium";
  }

  return "Low";
}