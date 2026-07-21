import { useEffect, useState } from "react";
import { getLiveCompanies } from "../lib/jobs/getLiveCompanies";
import { sampleCompanies } from "@/data/sampleCompanies";
import { calculateOpportunityScore } from "../lib/scoring";
import { calculateIntelligence } from "@/lib/intelligence/engine";

interface ProspectListProps {
  selectedCompany: any;
  onSelectCompany: (company: any) => void;
}

export default function ProspectList({
  selectedCompany,
  onSelectCompany,
}: ProspectListProps) {
  const [companies, setCompanies] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<"live" | "demo">("live");

useEffect(() => {
  async function loadCompanies() {
    try {
    const data = await getLiveCompanies();
console.log("Live jobs:", data);

setCompanies(data);
setDataSource("live");
  if (data.length > 0) {
  console.log("Selecting first company:", data[0]);
  onSelectCompany(data[0]);
}
} catch {
  console.warn("Live jobs unavailable. Using sample companies.");

  setCompanies(sampleCompanies);
  setDataSource("demo");

  if (sampleCompanies.length > 0) {
    console.log("Selecting fallback company:", sampleCompanies[0]);
    onSelectCompany(sampleCompanies[0]);
  }
}
  }

  loadCompanies();
}, []);

const sourceCompanies =
  companies.length > 0 ? companies : sampleCompanies;

const rankedCompanies = sourceCompanies
  .map((company: any) => ({
    ...company,
   score: calculateIntelligence(company).overallScore,
  }))
  .sort((a, b) => b.score - a.score);

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">
  <h2 className="text-xl font-bold">
    🎯 Today's Top Prospects
  </h2>

  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      dataSource === "live"
        ? "bg-green-500/20 text-green-400"
        : "bg-yellow-500/20 text-yellow-400"
    }`}
  >
    {dataSource === "live" ? "🟢 Live Data" : "🟡 Demo Data"}
  </span>
</div>

      <div className="space-y-3">

        {rankedCompanies.map((company, index) => (

          <button
  key={company.name}
  onClick={() => onSelectCompany(company)}
  className={`w-full rounded-xl p-4 text-left transition ${
    selectedCompany?.name === company.name
      ? "bg-blue-600"
      : "bg-slate-800 hover:bg-slate-700"
  }`}
>

            <div className="flex justify-between">

              <div>

                <p className="font-semibold">

                  {index + 1}. {company.name}

                </p>

                <p className="text-sm text-slate-400">

                  Score {company.score}

                </p>

              </div>

            </div>

          </button>

        ))}

      </div>

    </div>

  );

}