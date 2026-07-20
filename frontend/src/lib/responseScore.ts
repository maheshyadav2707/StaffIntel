export interface ResponseScoreResult {
  score: number;
  reasons: string[];
}

export function calculateResponseScore(company: any): ResponseScoreResult {
  let score = 50;
  const reasons: string[] = [];

  const signals = company.signals;

  if (!signals.hasTalentLeader) {
    score += 15;
    reasons.push("No Talent Acquisition leader");
  } else {
    score -= 20;
    reasons.push("Dedicated Talent Acquisition leader");
  }

  if (signals.openJobs >= 5) {
    score += 10;
    reasons.push("Multiple open positions");
  }

  if (signals.remoteJobs > 0) {
    score += 5;
    reasons.push("Hiring remote employees");
  }

  if (signals.recentlyFunded) {
    score += 10;
    reasons.push("Recently funded");
  }

  if (signals.jobTypes?.size >= 3) {
    score += 5;
    reasons.push("Hiring across multiple job categories");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    reasons,
  };
}