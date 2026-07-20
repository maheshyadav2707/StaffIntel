import { Company } from "@/types/company";

export interface QualificationResult {
 qualified: boolean;
 score: number;
 reasons: string[];
}

export function qualifyCompany(
  company: Company
): QualificationResult {
  const reasons: string[] = [];
  let score = 50;

  // Company size rule
  if (company.employees > 500) {
    reasons.push("Company is too large for StaffIntel ICP");
    score -= 40;

    return {
      qualified: false,
      score,
      reasons,
    };
  }

  score += 10;
  reasons.push("Company size matches target market");

  // Hiring activity
if (company.signals.openJobs >= 10) {
  score += 15;
  reasons.push("High hiring activity");
} else if (company.signals.openJobs >= 5) {
  score += 8;
  reasons.push("Moderate hiring activity");
} else if (company.signals.openJobs > 0) {
  score += 3;
  reasons.push("Some hiring activity");
} else {
  score -= 10;
  reasons.push("No active hiring");
}

  return {
    qualified: true,
    score,
    reasons,
  };
}