import React from "react";
import DisasterInfoPanel from "@/components/DisasterInfoPanel";

const DisasterInfoExample = () => {
  // Mock data for a landslide in Central Java
  const mockData = {
    disasterName: "Landslide in Central Java",
    location: "Magelang Regency, Central Java",
    totalVictims: 1250,
    districts: [
      {
        name: "Magelang City",
        affected: 450,
        evacuated: 380,
        missing: 70,
      },
      {
        name: "Temanggung",
        affected: 320,
        evacuated: 250,
        missing: 70,
      },
      {
        name: "Wonosobo",
        affected: 280,
        evacuated: 220,
        missing: 60,
      },
      {
        name: "Kebumen",
        affected: 200,
        evacuated: 150,
        missing: 50,
      },
    ],
    operationalNeeds: [
      {
        item: "Emergency Tents",
        quantity: 100,
        current: 45,
        priority: "Urgent" as const,
      },
      {
        item: "Food Supplies",
        quantity: 2000,
        current: 1200,
        priority: "High" as const,
      },
      {
        item: "Medical Kits",
        quantity: 150,
        current: 80,
        priority: "High" as const,
      },
      {
        item: "Clean Water",
        quantity: 3000,
        current: 2500,
        priority: "Medium" as const,
      },
      {
        item: "Blankets",
        quantity: 800,
        current: 600,
        priority: "Medium" as const,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        <DisasterInfoPanel
          disasterName={mockData.disasterName}
          location={mockData.location}
          districts={mockData.districts}
          operationalNeeds={mockData.operationalNeeds}
          totalVictims={mockData.totalVictims}
        />
      </div>
    </div>
  );
};

export default DisasterInfoExample;
