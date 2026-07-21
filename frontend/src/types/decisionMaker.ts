export interface DecisionMaker {
  id: string;
  companyId: string;

  name: string;
  title: string;

  department: string;

  priority: "High" | "Medium" | "Low";

  confidence: number;

  score?: number;

  scoreBreakdown?: {
  confidence: number;
  priority: number;
  role: number;
  companyContext: number;
};

  isTopRecommendation?: boolean;

  recommendation?: string;

  reasons?: string[];

  linkedin?: string;

  email?: string;

  avatar?: string;
}