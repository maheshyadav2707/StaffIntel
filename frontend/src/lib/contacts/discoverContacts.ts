import { DecisionMaker } from "@/types/decisionMaker";
import { ContactDiscoveryRequest } from "@/lib/contacts/contactDiscoveryRequest";
import { ContactProvider } from "@/lib/contacts/contactProvider";
import { sampleContactProvider } from "@/lib/contacts/sampleContactProvider";
import { hunterContactProvider } from "@/lib/contacts/hunterContactProvider";

function getContactProvider(): ContactProvider {
  if (process.env.HUNTER_API_KEY) {
    return hunterContactProvider;
  }

  return sampleContactProvider;
}

export async function discoverContacts(
  request: ContactDiscoveryRequest
): Promise<DecisionMaker[]> {
  const provider = getContactProvider();

  try {
    const contacts = await provider.findContacts(request);

    if (contacts.length > 0) {
      return contacts;
    }

    console.warn(
      "Contact provider returned no contacts. Using sample fallback."
    );

    return sampleContactProvider.findContacts(request);
  } catch (error) {
    console.error("Contact discovery provider failed:", error);

    return sampleContactProvider.findContacts(request);
  }
}