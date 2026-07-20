export interface DecisionMaker {
  id: string;
  companyId: string;

  name: string;
  title: string;

  department: string;

  priority: "High" | "Medium" | "Low";

  confidence: number;

  recommendation?: string;

  reasons?: string[];

  linkedin?: string;

  email?: string;

  avatar?: string;
}