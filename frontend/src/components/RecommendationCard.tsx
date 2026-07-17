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
const recommendationColor = {
  "Hot Prospect": "text-red-400",
  "Good Prospect": "text-orange-400",
  "Watch List": "text-yellow-400",
  "Low Priority": "text-slate-400",
}[intelligence.recommendation];
const recommendationIcon = {
  "Hot Prospect": "🔥",
  "Good Prospect": "⭐",
  "Watch List": "👀",
  "Low Priority": "📋",
}[intelligence.recommendation];
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <div>

        <div>

          <p className="text-yellow-400 font-semibold uppercase tracking-wider">
            ⭐ Today's Recommendation
          </p>

          <p className={`mt-2 text-lg font-semibold ${recommendationColor}`}>
  🔥 {recommendationIcon} {intelligence.recommendation}
</p>
          <p className="mt-2 inline-block rounded-full bg-orange-500/20 px-3 py-1 text-sm font-semibold text-orange-400">
  🔥 {intelligence.recommendation}
</p>

          <p className="mt-2 text-slate-400">
            {company.industry} • {company.location} • {company.employees} Employees
          </p>

        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">

  <div className="rounded-xl bg-blue-600 px-6 py-4 text-center">
    <p className="text-sm">
      Opportunity
    </p>

    <h2 className="text-5xl font-bold">
      {intelligence.opportunityScore}
    </h2>
  </div>

  <div className="rounded-xl bg-green-600 px-6 py-4 text-center">
    <p className="text-sm">
      Response Probability
    </p>

    <h2 className="text-5xl font-bold">
      {intelligence.responseScore}
    </h2>
  </div>

</div>
      </div>
      <div className="mt-4 flex items-center gap-3">
  <span className="text-slate-400">Confidence</span>

  <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
    {intelligence.confidence}
  </span>
</div>

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