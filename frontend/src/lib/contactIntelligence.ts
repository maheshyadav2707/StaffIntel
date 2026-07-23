import { DecisionMaker } from "@/types/decisionMaker";
import { sampleDecisionMakers } from "@/lib/sampleDecisionMakers";

type ContactScoreResult = {
  score: number;
  reasons: string[];
  scoreBreakdown: {
    confidence: number;
    priority: number;
    role: number;
    companyContext: number;
    qualificationAdjustment: number;
  };
};

function discoverContacts(companyId: string): DecisionMaker[] {
  return sampleDecisionMakers.filter(
    (person) => person.companyId === companyId
  );
}
function qualifyContact(
  person: DecisionMaker
): "Qualified" | "Possible" | "Low Priority" | "Disqualified" {
  const title = person.title.toLowerCase();

  // Strong staffing decision makers
  if (
    title.includes("ceo") ||
    title.includes("founder") ||
    title.includes("cto") ||
    title.includes("head of talent") ||
    title.includes("head of recruiting") ||
    title.includes("talent acquisition") ||
    title.includes("vp engineering") ||
    title.includes("vp of engineering") ||
    title.includes("head of engineering") ||
    title.includes("director of talent") ||
    title.includes("director of recruiting")
  ) {
    return "Qualified";
  }

  // People who may influence hiring
  if (
    title.includes("director of engineering") ||
    title.includes("engineering manager") ||
    title.includes("hiring manager") ||
    title.includes("hr manager")
  ) {
    return "Possible";
  }

  // Weak buying authority
  if (
    title.includes("recruiter") ||
    title.includes("coordinator") ||
    title.includes("specialist")
  ) {
    return "Low Priority";
  }

  // Individual contributors / unlikely staffing buyers
  if (
    title.includes("engineer") ||
    title.includes("developer") ||
    title.includes("intern")
  ) {
    return "Disqualified";
  }

  return "Possible";
}

function determineBuyingAuthority(
  person: DecisionMaker
): "High" | "Medium" | "Low" {
  const title = person.title.toLowerCase();

  // Direct budget / staffing authority
  if (
    title.includes("ceo") ||
    title.includes("founder") ||
    title.includes("head of talent") ||
    title.includes("head of recruiting") ||
    title.includes("vp talent") ||
    title.includes("vp of talent") ||
    title.includes("director of talent") ||
    title.includes("director of recruiting")
  ) {
    return "High";
  }

  // Strong hiring influence, but may not directly own staffing budget
  if (
    title.includes("cto") ||
    title.includes("vp engineering") ||
    title.includes("vp of engineering") ||
    title.includes("head of engineering") ||
    title.includes("director of engineering") ||
    title.includes("hr manager")
  ) {
    return "Medium";
  }

  return "Low";
}

function determineHiringInfluence(
  person: DecisionMaker
): "High" | "Medium" | "Low" {
  const title = person.title.toLowerCase();

  // Direct ownership or strong involvement in hiring
  if (
    title.includes("head of talent") ||
    title.includes("head of recruiting") ||
    title.includes("talent acquisition") ||
    title.includes("vp engineering") ||
    title.includes("vp of engineering") ||
    title.includes("head of engineering") ||
    title.includes("director of talent") ||
    title.includes("director of recruiting") ||
    title.includes("hiring manager")
  ) {
    return "High";
  }

  // Executive or managerial influence
  if (
    title.includes("ceo") ||
    title.includes("founder") ||
    title.includes("cto") ||
    title.includes("director of engineering") ||
    title.includes("engineering manager") ||
    title.includes("hr manager")
  ) {
    return "Medium";
  }

  return "Low";
}

function determineOutreachPriority(
  qualification: DecisionMaker["qualification"],
  buyingAuthority: DecisionMaker["buyingAuthority"],
  hiringInfluence: DecisionMaker["hiringInfluence"],
  technicalInfluence: DecisionMaker["technicalInfluence"]
): 1 | 2 | 3 {
  // Never prioritize contacts we've already determined are poor targets.
  if (
    qualification === "Disqualified" ||
    qualification === "Low Priority"
  ) {
    return 3;
  }

  // Strongest commercial or hiring authority.
  if (
    buyingAuthority === "High" ||
    hiringInfluence === "High"
  ) {
    return 1;
  }

  // Useful secondary stakeholder.
  if (
    buyingAuthority === "Medium" ||
    hiringInfluence === "Medium" ||
    technicalInfluence === "High"
  ) {
    return 2;
  }

  return 3;
}

function determineTechnicalInfluence(
  person: DecisionMaker
): "High" | "Medium" | "Low" {
  const title = person.title.toLowerCase();

  // Direct technical leadership
  if (
    title.includes("cto") ||
    title.includes("vp engineering") ||
    title.includes("vp of engineering") ||
    title.includes("head of engineering") ||
    title.includes("director of engineering")
  ) {
    return "High";
  }

  // Technical managers involved in candidate evaluation
  if (
    title.includes("engineering manager") ||
    title.includes("technical lead") ||
    title.includes("tech lead")
  ) {
    return "Medium";
  }

  return "Low";
}
function calculateContactScore(
  person: DecisionMaker,
  company: {
    employees?: number;
    signals?: {
      openJobs?: number;
      hasTalentLeader?: boolean;
    };
  }
): ContactScoreResult {
  let score = person.confidence;

  const reasons: string[] = [];
  let priorityScore = 0;
let roleScore = 0;
let companyContextScore = 0;

reasons.push(`High confidence contact match (${person.confidence}%)`);

  // Priority signal
  if (person.priority === "High") {
  score += 20;
  priorityScore += 20;
  reasons.push("High-priority decision maker");
} else if (person.priority === "Medium") {
  score += 10;
  priorityScore += 10;
  reasons.push("Medium-priority decision maker");
}

  // Role / buying-authority signal
  const title = person.title.toLowerCase();

  if (
  title.includes("head of talent") ||
  title.includes("head of recruiting") ||
  title.includes("talent acquisition")
) {
  score += 30;
  roleScore += 30;
  reasons.push("Direct ownership of talent acquisition and recruiting");
} else if (
  title.includes("vp talent") ||
  title.includes("vp of talent") ||
  title.includes("director of talent") ||
  title.includes("director of recruiting")
) {
  score += 25;
  roleScore += 25;
  reasons.push("Senior talent leader with staffing buying authority");
} else if (
  title.includes("vp engineering") ||
  title.includes("vp of engineering") ||
  title.includes("head of engineering")
) {
  score += 20;
  roleScore += 20;
  reasons.push("Senior engineering leader involved in technical hiring");
} else if (
  title.includes("ceo") ||
  title.includes("founder")
) {
  score += 15;
  roleScore += 15;
  reasons.push("Executive likely involved in strategic hiring decisions");
} else if (
  title.includes("engineering manager") ||
  title.includes("director of engineering")
) {
  score += 10;
  roleScore += 10;
  reasons.push("Engineering leader involved in hiring decisions");
}
// Company-context signal:
// In small companies without a Talent leader,
// CEO / Founder is more likely to own hiring decisions.
const isSmallCompany =
  company.employees !== undefined && company.employees <= 25;

const hasNoTalentLeader =
  company.signals?.hasTalentLeader === false;

const isExecutive =
  title.includes("ceo") ||
  title.includes("founder");

  const isSeniorEngineeringLeader =
  title.includes("vp engineering") ||
  title.includes("vp of engineering") ||
  title.includes("head of engineering");

if (isSmallCompany && hasNoTalentLeader && isExecutive) {
  score += 10;
  companyContextScore += 10;
  reasons.push(
    "Small company with no dedicated Talent leader — executive likely owns hiring"
  );
}

if (hasNoTalentLeader && isSeniorEngineeringLeader) {
  score += 5;
  companyContextScore += 5;
  reasons.push(
    "No dedicated Talent leader detected — engineering leadership may directly own technical hiring"
  );
}

// Hiring-demand context
const openJobs = company.signals?.openJobs ?? 0;

if (openJobs >= 10) {
  reasons.push(
    `Strong hiring demand detected (${openJobs} open roles)`
  );
} else if (openJobs >= 5) {
  reasons.push(
    `Active hiring demand detected (${openJobs} open roles)`
  );
}
return {
  score,
  reasons,
  scoreBreakdown: {
    confidence: person.confidence,
    priority: priorityScore,
    role: roleScore,
    companyContext: companyContextScore,
    qualificationAdjustment: 0,
  },
};
}

function rankContacts(
  contacts: DecisionMaker[],
  company: {
    employees?: number;
    signals?: {
      openJobs?: number;
      hasTalentLeader?: boolean;
    };
  }
): DecisionMaker[] {
  const rankedContacts = contacts
  .map((person) => {
    const result = calculateContactScore(person, company);
const qualification = qualifyContact(person);
const buyingAuthority = determineBuyingAuthority(person);
const hiringInfluence = determineHiringInfluence(person);
const technicalInfluence = determineTechnicalInfluence(person);
const outreachPriority = determineOutreachPriority(
  qualification,
  buyingAuthority,
  hiringInfluence,
  technicalInfluence
);

let adjustedScore = result.score;
let qualificationAdjustment = 0;

if (qualification === "Low Priority") {
  qualificationAdjustment = -25;
}

if (qualification === "Disqualified") {
  qualificationAdjustment = -100;
}

adjustedScore += qualificationAdjustment;

    return {
      ...person,
      qualification,
      buyingAuthority,
      hiringInfluence,
      technicalInfluence,
      outreachPriority,
      score: adjustedScore,
      scoreBreakdown: {
  ...result.scoreBreakdown,
  qualificationAdjustment,
},
      reasons: result.reasons,
    };
  })
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return rankedContacts.map((person, index) => {
    return {
      ...person,
      isTopRecommendation: index === 0,
      reasons:
        index === 0
          ? [
              ...(person.reasons ?? []),
              "Highest-ranked decision maker for this staffing opportunity",
            ]
          : person.reasons,
    };
  });
}

export function getDecisionMakers(company: {
  id: string;
  employees?: number;
  signals?: {
    openJobs?: number;
    hasTalentLeader?: boolean;
  };
}): DecisionMaker[] {
  const contacts = discoverContacts(company.id);

  return rankContacts(contacts, company);
}