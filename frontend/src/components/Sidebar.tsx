export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-bold text-blue-500">
        StaffIntel
      </h1>

      <p className="text-slate-400 mt-2 text-sm">
        Opportunity Intelligence
      </p>

      <nav className="mt-12 space-y-3">

        <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-600 text-white font-medium">
          🏠 Morning Briefing
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          🎯 Opportunities
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          🏢 Companies
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          ✉️ Outreach
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          📈 Analytics
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          ⚙️ Settings
        </button>

      </nav>

    </aside>
  );
}