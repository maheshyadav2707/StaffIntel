import { DecisionMaker } from "@/types/decisionMaker";
import { ContactDiscoveryRequest } from "@/lib/contacts/contactDiscoveryRequest";

export interface ContactProvider {
  findContacts(
    request: ContactDiscoveryRequest
  ): Promise<DecisionMaker[]>;
}