export interface CompanySignals {
  openJobs: number;
  oldJobs: number;
  remoteJobs: number;
  jobTypes: string[];
  recentlyFunded: boolean;
  hasTalentLeader: boolean;
  hiringGrowth: boolean;
}

export interface Company {
  name: string;
  industry: string;
  location: string;
  employees: number;

  signals: CompanySignals;
}