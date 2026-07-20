import { calculateOpportunityScore } from "../scoring";
import { calculateResponseScore } from "../responseScore";
import { IntelligenceResult } from "./types";
import { calculateStaffingFriendliness } from "../friendliness";
import { calculateHiringMomentum } from "../momentum";
import { Company } from "@/types/company";
import { calculateConfidence } from "./confidence";
import { calculateRecommendation } from "./recommendation";
import { generateWhyThisProspect } from "./whyThisProspect";
import { calculateGrade } from "./grade";

export function calculateIntelligence(company: Company): IntelligenceResult {
const opportunity = calculateOpportunityScore(company.signals);
const response = calculateResponseScore(company);
const friendliness = calculateStaffingFriendliness(company);
const momentum = calculateHiringMomentum(company);

  const overallScore =
  opportunity.score * 0.40 +
  response.score * 0.25 +
  friendliness.score * 0.20 +
  momentum.score * 0.15;

const recommendation = calculateRecommendation(
  overallScore,
  response.score,
  friendliness.score
);

const grade = calculateGrade(overallScore);

const confidence = calculateConfidence(company);

 return {
  overallScore: Math.round(overallScore),
  opportunityScore: opportunity.score,
  responseScore: response.score,
  staffingFriendliness: friendliness.score,
  hiringMomentum: momentum.score,
  confidence,
  recommendation,
  grade,
  whyThisProspect: generateWhyThisProspect(company),
reasons: [
  ...new Set([
    ...opportunity.reasons,
    ...response.reasons,
    ...friendliness.reasons,
    ...momentum.reasons,
  ]),
],
  };
}