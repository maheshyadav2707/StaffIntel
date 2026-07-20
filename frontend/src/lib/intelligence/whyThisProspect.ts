import { Company } from "@/types/company";

export function generateWhyThisProspect(company: Company): string {
  const signals = company.signals;

  if (signals.openJobs >= 10) {
    return "High hiring volume indicates immediate staffing demand.";
  }

  if (signals.hiringGrowth) {
    return "Hiring growth suggests expanding workforce needs.";
  }

  if (signals.recentlyFunded) {
    return "Recent funding often leads to increased hiring.";
  }

  if (signals.hasTalentLeader === false) {
    return "No Talent Acquisition leader may increase reliance on staffing partners.";
  }

  return "Hiring activity makes this company worth monitoring.";
}