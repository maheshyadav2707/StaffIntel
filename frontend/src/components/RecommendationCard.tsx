import { calculateOpportunityScore, generateInsight, } from "@/lib/scoring";

interface RecommendationCardProps {
  company: any;
}

export default function RecommendationCard({
  company,
}: RecommendationCardProps) {

  const result = calculateOpportunityScore(company.signals);
  const insight = generateInsight(company);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-yellow-400 font-semibold uppercase tracking-wider">
            ⭐ Today's Recommendation
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {company.name}
          </h2>

          <p className="mt-2 text-slate-400">
            {company.industry} • {company.location} • {company.employees} Employees
          </p>

        </div>

        <div className="rounded-xl bg-blue-600 px-6 py-4 text-center">

          <p className="text-sm">
            Opportunity Score
          </p>

          <h2 className="text-5xl font-bold">
            {result.score}
          </h2>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-8 mt-10">

        <div>

          <h3 className="font-semibold mb-4">
            Why today?
          </h3>

        <ul className="space-y-3 text-slate-300">
  {result.reasons.map((reason) => (
    <li key={reason}>✅ {reason}</li>
  ))}
</ul>

        </div>

        <div>

          <h3 className="font-semibold mb-4">
            AI Insight
          </h3>

          <div className="rounded-xl bg-slate-800 p-5">

           <p className="leading-7 text-slate-300">
  {insight}
</p>

            <p className="mt-4 font-medium text-green-400">
              Recommended first contact:
{company.contact}
            </p>

          </div>

        </div>

      </div>

      <div className="mt-10 flex gap-4">

        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700">
          ✉️ Draft Email
        </button>

        <button className="rounded-lg bg-slate-700 px-6 py-3 font-semibold hover:bg-slate-600">
          💼 Draft LinkedIn Message
        </button>

      </div>

    </div>
  );
}