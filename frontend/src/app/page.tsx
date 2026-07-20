"use client";

import { calculateResponseScore } from "../lib/responseScore";
import { useState, useEffect } from "react";
import ProspectList from "@/components/ProspectList";
import StatsGrid from "@/components/StatsGrid";
import RecommendationCard from "@/components/RecommendationCard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { sampleCompanies } from "@/data/sampleCompanies";
import DecisionMakerCard from "@/components/DecisionMakerCard";
import { sampleDecisionMakers } from "@/lib/sampleDecisionMakers";

export default function Home() {

  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [aiInsight, setAiInsight] = useState<any>(null);
  const [emailDraft, setEmailDraft] = useState<any>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [searchCompany, setSearchCompany] = useState("");
     async function generateEmail(company: any) {
  const response = await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company),
  });

  const data = await response.json();

  console.log(data);

  setEmailDraft(data.email);
  setShowEmailModal(true);
}
async function searchRealCompany() {
  if (!searchCompany.trim()) return;

  const response = await fetch("/api/company", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company: searchCompany,
    }),
  });

  const data = await response.json();

  console.log("Company returned:", data.company);

if (data.success) {
const realCompany = {
  name: data.company.name,

  industry: data.company.industry,

  location: data.company.location,

  employees: data.company.employees,

  contact: data.company.contact,

  signals: data.company.signals,
};


  console.log(realCompany);

  setSelectedCompany(realCompany);

  testAPI(realCompany);
}
}
  async function testCompanyAPI() {
    const response = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: "Snowflake",
      }),
    });

    const data = await response.json();

    console.log(data);
  }

  
  async function testAPI(company: any) {
 
  const response = await fetch("/api/insight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company),
  });

  const data = await response.json();

  setAiInsight(data.insight);

  console.log(data);
}
return (
  <>
    <main className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <section className="flex-1 p-10">

        <Header />
<div className="mt-8 mb-8 flex gap-3">

  <input
    value={searchCompany}
    onChange={(e) => setSearchCompany(e.target.value)}
    placeholder="Search any company..."
    className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-5 py-3 text-white outline-none"
  />

  <button
    onClick={searchRealCompany}
    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
  >
    Search
  </button>

</div>
       <StatsGrid />

<div className="mt-10 grid grid-cols-3 gap-8">

  <div className="col-span-1">
    <ProspectList
    selectedCompany={selectedCompany}
    onSelectCompany={(company) => {
        setSelectedCompany(company);
        testAPI(company);
    }}
/>
    
  </div>

  <div className="col-span-2">
  <RecommendationCard
    company={selectedCompany}
    aiInsight={aiInsight}
    onGenerateEmail={() => generateEmail(selectedCompany)}
  />

  <div className="mt-6">
    <h2 className="text-lg font-semibold text-white mb-4">
      Decision Makers
    </h2>

   {selectedCompany &&
  sampleDecisionMakers
    .filter((person) => person.companyId === selectedCompany.id)
    .map((person) => (
      <DecisionMakerCard
        key={person.id}
        person={person}
      />
    ))}
  </div>
</div>

</div>

      </section>

    </main>

    {showEmailModal && emailDraft && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="w-[700px] rounded-2xl bg-slate-900 p-8 shadow-2xl">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              📧 AI Draft Email
            </h2>

            <button
              onClick={() => setShowEmailModal(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-400 mb-2">
              Subject
            </p>

            <div className="rounded-lg bg-slate-800 p-3">
              {emailDraft.subject}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-400 mb-2">
              Email
            </p>

            <div className="rounded-lg bg-slate-800 p-5 whitespace-pre-wrap leading-7 max-h-[400px] overflow-auto">
              {emailDraft.email}
            </div>
          </div>

          <div className="flex justify-end gap-4">

            <button
              onClick={() => navigator.clipboard.writeText(emailDraft.email)}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
            >
              📋 Copy
            </button>

            <button
              onClick={() => setShowEmailModal(false)}
              className="rounded-lg bg-slate-700 px-5 py-3 font-semibold hover:bg-slate-600"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    )}

  </>
);
}