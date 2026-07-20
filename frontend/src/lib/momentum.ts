export interface MomentumResult {
  score: number;
  reasons: string[];
}

export function calculateHiringMomentum(company: any): MomentumResult {
  let score = 50;
  const reasons: string[] = [];

  const signals = company.signals;

  if (signals.openJobs >= 10) {
    score += 20;
    reasons.push("Large hiring volume");
  } else if (signals.openJobs >= 5) {
    score += 10;
    reasons.push("Steady hiring");
  }

  if (signals.remoteJobs > 0) {
    score += 5;
    reasons.push("Remote hiring expansion");
  }

  if (signals.recentlyFunded) {
    score += 15;
    reasons.push("Funding likely accelerating growth");
  }

  if (signals.oldJobs > 5) {
    score -= 10;
    reasons.push("Older job postings");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    reasons,
  };
}