import StatsGrid from "@/components/StatsGrid";
import RecommendationCard from "@/components/RecommendationCard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <section className="flex-1 p-10">

        <Header />

        <StatsGrid />

        <RecommendationCard />

      </section>

    </main>
  );
}