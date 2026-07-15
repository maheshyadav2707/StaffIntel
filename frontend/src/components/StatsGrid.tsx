export default function StatsGrid() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <p className="text-slate-400 text-sm">
          Companies Scanned
        </p>

        <h2 className="text-4xl font-bold mt-3">
          23,458
        </h2>

        <p className="text-green-400 text-sm mt-2">
          ↑ +1,284 since yesterday
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <p className="text-slate-400 text-sm">
          Qualified
        </p>

        <h2 className="text-4xl font-bold mt-3 text-green-400">
          312
        </h2>

        <p className="text-slate-400 text-sm mt-2">
          High-confidence prospects
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <p className="text-slate-400 text-sm">
          Today's Targets
        </p>

        <h2 className="text-4xl font-bold mt-3 text-blue-400">
          20
        </h2>

        <p className="text-slate-400 text-sm mt-2">
          Ready for outreach
        </p>
      </div>

    </div>
  );
}