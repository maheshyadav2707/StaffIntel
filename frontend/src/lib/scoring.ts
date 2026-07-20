import { IntelligenceWeights } from "./intelligence/intelligenceConfig";
export function calculateOpportunityScore(signals: {
  openJobs: number;
  oldJobs: number;
  recentlyFunded: boolean;
  hasTalentLeader: boolean;
  hiringGrowth: boolean;
  remoteJobs?: number;
  jobTypes?: string[];
}) {
  let score = 0;
  const reasons: string[] = [];

  // Open Jobs
  if (signals.openJobs >= 10) {
    score += IntelligenceWeights.opportunity.highOpenJobs;
    reasons.push(`${signals.openJobs} active openings`);
  } else if (signals.openJobs >= 5) {
    score += IntelligenceWeights.opportunity.mediumOpenJobs;
    reasons.push("Several active openings");
  } else if (signals.openJobs > 0) {
    score += IntelligenceWeights.opportunity.lowOpenJobs;
    reasons.push("Hiring activity detected");
  }

  // Older Jobs
  if (signals.oldJobs >= 5) {
    score += IntelligenceWeights.opportunity.highOldJobs;
    reasons.push("Several positions remain unfilled");
  } else if (signals.oldJobs > 0) {
    score += IntelligenceWeights.opportunity.lowOldJobs;
    reasons.push("Some positions have been open for a while");
  }

  // Remote Hiring
  if ((signals.remoteJobs ?? 0) >= 3) {
    score += IntelligenceWeights.opportunity.remoteHiring;
    reasons.push("Strong remote hiring");
  }

  // Hiring Diversity
  const types = signals.jobTypes?.length ?? 0;

  if (types >= 3) {
    score += IntelligenceWeights.opportunity.multipleJobTypes;
    reasons.push("Multiple hiring categories");
  } else if (types >= 2) {
    score += IntelligenceWeights.opportunity.someJobTypes;
    reasons.push("Hiring across different job types");
  }

  // Future enrichment signals
  if (signals.recentlyFunded) {
    score += IntelligenceWeights.opportunity.recentlyFunded;
    reasons.push("Recently funded");
  }

  if (!signals.hasTalentLeader) {
    score += IntelligenceWeights.opportunity.noTalentLeader;
    reasons.push("No Talent Acquisition leader");
  }
  // Hiring Growth
if (signals.hiringGrowth) {
  score += IntelligenceWeights.opportunity.hiringGrowth;
  reasons.push("Hiring growth detected");
}
  return {
    score: Math.min(score, 100),
    reasons,
  };
}