import { ContactProvider } from "@/lib/contacts/contactProvider";
import { ContactDiscoveryRequest } from "@/lib/contacts/contactDiscoveryRequest";
import { DecisionMaker } from "@/types/decisionMaker";
import { sampleDecisionMakers } from "@/lib/sampleDecisionMakers";

export const sampleContactProvider: ContactProvider = {
  async findContacts(
    request: ContactDiscoveryRequest
  ): Promise<DecisionMaker[]> {
    return sampleDecisionMakers.filter(
      (person) => person.companyId === request.companyId
    );
  },
};