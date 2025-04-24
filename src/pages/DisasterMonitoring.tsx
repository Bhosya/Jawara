import React from "react";
import { AlertTriangle, FileWarning, AlertCircle, Waves, CloudLightning, Loader, ArrowRight, Users, Package, HandHelping } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DisasterMonitoring = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-4">Disaster Monitoring</h1>
        <p>This page will display real-time disaster information.</p>
      </main>
      <Footer />
    </div>
  );
};

export default DisasterMonitoring;
