export interface FriendlinessResult {
  score: number;
  reasons: string[];
}

export function calculateStaffingFriendliness(company: any): FriendlinessResult {
  let score = 50;
  const reasons: string[] = [];

  const signals = company.signals;

  // Smaller companies often rely more on external recruiters
  if (company.employees > 0 && company.employees < 250) {
    score += 15;
    reasons.push("Small-to-mid-sized company");
  }

  // No internal TA leader
  if (!signals.hasTalentLeader) {
    score += 20;
    reasons.push("No Talent Acquisition leader");
  }

  // Hiring multiple positions
  if (signals.openJobs >= 5) {
    score += 10;
    reasons.push("Multiple open positions");
  }

  // Remote hiring often broadens recruiting needs
  if (signals.remoteJobs > 0) {
    score += 5;
    reasons.push("Remote hiring");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    reasons,
  };
}