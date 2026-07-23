import { ContactProvider } from "@/lib/contacts/contactProvider";
import { ContactDiscoveryRequest } from "@/lib/contacts/contactDiscoveryRequest";
import { DecisionMaker } from "@/types/decisionMaker";

interface HunterEmail {
  value?: string;
}

interface HunterPerson {
  first_name?: string;
  last_name?: string;
  position?: string;
  department?: string;
  linkedin?: string;
  email?: string;
  emails?: HunterEmail[];
  value?: string;
confidence?: number;
}

interface HunterDomainSearchResponse {
  data?: {
    emails?: HunterPerson[];
  };
}
export const hunterContactProvider: ContactProvider = {
  async findContacts(
    request: ContactDiscoveryRequest
  ): Promise<DecisionMaker[]> {
    const apiKey = process.env.HUNTER_API_KEY;

    if (!apiKey) {
      throw new Error("HUNTER_API_KEY is not configured");
    }

    const params = new URLSearchParams({
      api_key: apiKey,
    });

    if (request.companyDomain) {
      params.set("domain", request.companyDomain);
    } else {
      params.set("company", request.companyName);
    }

    const response = await fetch(
      `https://api.hunter.io/v2/domain-search?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(
        `Hunter API request failed with status ${response.status}`
      );
    }

    const data =
  (await response.json()) as HunterDomainSearchResponse;

const people = data.data?.emails ?? [];

return people.map((person, index): DecisionMaker => {
  const firstName = person.first_name ?? "";
  const lastName = person.last_name ?? "";

  const name =
    `${firstName} ${lastName}`.trim() || "Unknown Contact";

  const email =
  person.value ??
  person.email ??
  person.emails?.[0]?.value;

  return {
    id: `hunter-${request.companyId}-${index}`,
    companyId: request.companyId,

    name,
    title: person.position ?? "Unknown",

    department: person.department ?? "Unknown",

    priority: "Medium",
    confidence: person.confidence ?? 70,

    linkedin: person.linkedin,
    email,
  };
});
  },
};