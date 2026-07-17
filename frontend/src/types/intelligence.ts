export interface IntelligenceResult {
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

  reasons: string[];
}