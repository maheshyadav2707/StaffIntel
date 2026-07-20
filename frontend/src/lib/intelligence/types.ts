export interface IntelligenceResult {
   overallScore: number;
  opportunityScore: number;
  responseScore: number;
  staffingFriendliness: number;
  hiringMomentum: number;

  confidence: "High" | "Medium" | "Low";

  recommendation:
    | "Hot Prospect"
    | "Good Prospect"
    | "Watch List"
    | "Low Priority";

    whyThisProspect: string;
    grade: string;

  reasons: string[];
}