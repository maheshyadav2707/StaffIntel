import { sampleCompanies } from "@/data/sampleCompanies";
import { calculateOpportunityScore } from "@/lib/scoring";

interface ProspectListProps {
  selectedCompany: any;
  onSelectCompany: (company: any) => void;
}

export default function ProspectList({
  selectedCompany,
  onSelectCompany,
}: ProspectListProps) {

  const rankedCompanies = sampleCompanies
    .map(company => ({
      ...company,
      score: calculateOpportunityScore(company.signals).score
    }))
    .sort((a, b) => b.score - a.score);

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-bold mb-6">
        🎯 Today's Top Prospects
      </h2>

      <div className="space-y-3">

        {rankedCompanies.map((company, index) => (

          <button
  key={company.name}
  onClick={() => onSelectCompany(company)}
  className={`w-full rounded-xl p-4 text-left transition ${
    selectedCompany.name === company.name
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