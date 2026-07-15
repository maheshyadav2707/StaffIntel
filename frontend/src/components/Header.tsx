export default function Header() {
  const today = new Date();

  return (
    <header className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-3xl font-bold">
          Morning Briefing
        </h1>

        <p className="text-slate-400 mt-2">
          {today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-2xl hover:scale-110 transition">
          🔔
        </button>

        <div className="text-right">
          <p className="text-slate-400 text-sm">
            Welcome back
          </p>

          <h2 className="text-xl font-semibold">
            Mahesh 👋
          </h2>
        </div>
      </div>
    </header>
  );
}