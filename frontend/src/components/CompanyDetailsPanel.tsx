import { Company } from "@/types/company";
import { AIInsight } from "@/types/aiInsight";
import { calculateIntelligence } from "@/lib/intelligence/engine";
import MetricCard from "./MetricCard";

interface Props {
  company: Company | null;
  aiInsight: AIInsight | null;
}

export default function CompanyDetailsPanel({
  company,
  aiInsight,
}: Props) {
  if (!company) return null;

  const intelligence = calculateIntelligence(company);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">{company.name}</h2>

      <p className="mt-2 text-slate-400">
        {company.industry} • {company.location}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
 <MetricCard
  title="Overall"
  value={intelligence.overallScore}
/>
  <MetricCard title="Response" value={intelligence.responseScore} />
  <MetricCard title="Friendliness" value={intelligence.staffingFriendliness} />
  <MetricCard title="Momentum" value={intelligence.hiringMomentum} />
</div>

      {aiInsight && (
        <div className="mt-6">
          <h3 className="font-semibold">AI Summary</h3>
          <p className="text-slate-300 mt-2">{aiInsight.summary}</p>
        </div>
      )}
    </div>
  );
}