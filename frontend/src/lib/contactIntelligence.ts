import { DecisionMaker } from "@/types/decisionMaker";
import { sampleDecisionMakers } from "@/lib/sampleDecisionMakers";

function discoverContacts(companyId: string): DecisionMaker[] {
  return sampleDecisionMakers.filter(
    (person) => person.companyId === companyId
  );
}

function calculateContactScore(person: DecisionMaker): number {
  let score = person.confidence;

  if (person.priority === "High") {
    score += 20;
  } else if (person.priority === "Medium") {
    score += 10;
  }

  return score;
}

function rankContacts(contacts: DecisionMaker[]): DecisionMaker[] {
  return contacts
    .map((person) => ({
      ...person,
      score: calculateContactScore(person),
    }))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

export function getDecisionMakers(company: { id: string }): DecisionMaker[] {
  const contacts = discoverContacts(company.id);

  return rankContacts(contacts);
}