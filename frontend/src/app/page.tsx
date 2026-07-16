"use client";

import { useState } from "react";
import ProspectList from "@/components/ProspectList";
import StatsGrid from "@/components/StatsGrid";
import RecommendationCard from "@/components/RecommendationCard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { sampleCompanies } from "@/data/sampleCompanies";

export default function Home() {

  const [selectedCompany, setSelectedCompany] 
  = useState(sampleCompanies[0]);
  return (
    <main className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <section className="flex-1 p-10">

        <Header />

       <StatsGrid />

<div className="mt-10 grid grid-cols-3 gap-8">

  <div className="col-span-1">
    <ProspectList 
    
        selectedCompany={selectedCompany}
    onSelectCompany={setSelectedCompany}
    
    />
    
  </div>

  <div className="col-span-2">
    <RecommendationCard 
    
    company={selectedCompany}
    
    />
  </div>

</div>

      </section>

    </main>
  );
}