import { calculateIntelligence } from "@/lib/intelligence/engine";
import { Company } from "@/types/company";
import { AIInsight } from "@/types/aiInsight";

interface RecommendationCardProps {
company: Company;
aiInsight: AIInsight | null;
  onGenerateEmail: () => void;
}

export default function RecommendationCard({
  company,
  aiInsight,
  onGenerateEmail,
}: RecommendationCardProps) {

  if (!company) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <p className="text-slate-400">Loading recommendation...</p>
    </div>
  );
}

const intelligence = calculateIntelligence(company);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <div>

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

        <div className="mt-6 grid grid-cols-2 gap-4">

  <div className="rounded-xl bg-blue-600 px-6 py-4 text-center">
    <p className="text-sm">
      Opportunity Score
    </p>

    <h2 className="text-5xl font-bold">
      {intelligence.opportunityScore}
    </h2>
  </div>

  <div className="rounded-xl bg-green-600 px-6 py-4 text-center">
    <p className="text-sm">
      Response Score
    </p>

    <h2 className="text-5xl font-bold">
      {intelligence.responseScore}
    </h2>
  </div>

</div>
      </div>
      <p className="mt-4 text-sm text-slate-400">
  Confidence:
  <span className="ml-2 font-semibold text-green-400">
    {intelligence.confidence}
  </span>
</p>

      <div className="grid grid-cols-2 gap-8 mt-10">

        <div>

          <h3 className="font-semibold mb-4">
            Why today?
          </h3>

        <ul className="space-y-3 text-slate-300">
  {intelligence.reasons.map((reason) => (
    <li key={reason}>✅ {reason}</li>
  ))}
</ul>

        </div>

        <div>

          <h3 className="font-semibold mb-4">
            AI Insight
          </h3>

          <div className="rounded-xl bg-slate-800 p-5 space-y-5">

  {!aiInsight ? (

    <p className="text-slate-400">
      Analyzing company...
    </p>

  ) : (

    <>

      <div>
        <h4 className="font-semibold text-white">Summary</h4>
        <p className="text-slate-300">{aiInsight.summary}</p>
      </div>

      <div>
        <h4 className="font-semibold text-white">Pain Point</h4>
        <p className="text-slate-300">{aiInsight.painPoint}</p>
      </div>

      <div>
        <h4 className="font-semibold text-white">Decision Maker</h4>
        <p className="text-slate-300">{aiInsight.decisionMaker}</p>
      </div>

      <div>
        <h4 className="font-semibold text-white">Sales Angle</h4>
        <p className="text-slate-300">{aiInsight.salesAngle}</p>
      </div>

      <div>
        <h4 className="font-semibold text-white">Confidence</h4>
        <p className="text-green-400 font-semibold">
          {aiInsight.confidence}
        </p>
      </div>

    </>

  )}

</div>

        </div>

      </div>

      <div className="mt-10 flex gap-4">

       <button
  onClick={onGenerateEmail}
  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
>
  ✉️ Draft Email
</button>

        <button className="rounded-lg bg-slate-700 px-6 py-3 font-semibold hover:bg-slate-600">
          💼 Draft LinkedIn Message
        </button>

      </div>

    </div>
  );
}