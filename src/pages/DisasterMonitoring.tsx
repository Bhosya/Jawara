import React, { useState } from "react";
import { AlertTriangle, FileWarning, AlertCircle, Waves, CloudLightning, Loader, ArrowRight, Users, Package, HandHelping, MapPin, Filter, Search, SlidersHorizontal, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data
const disasterData = [
  {
    id: 1,
    type: "Flood",
    location: "Semarang Coastal Area",
    status: "Ongoing",
    severity: "High",
    affected: 1250,
    lastUpdate: "10 minutes ago",
    description: "Heavy rainfall causing potential flooding in low-lying areas of Semarang.",
    icon: Waves,
    color: "bg-blue-500"
  },
  {
    id: 2,
    type: "Landslide",
    location: "Temanggung Hills",
    status: "Monitoring",
    severity: "Medium",
    affected: 342,
    lastUpdate: "30 minutes ago",
    description: "Recent soil instability on hillsides near Magelang. Residents should be cautious.",
    icon: FileWarning,
    color: "bg-amber-500"
  },
  {
    id: 3,
    type: "Volcanic Activity",
    location: "Mt. Merapi",
    status: "Warning",
    severity: "Medium",
    affected: 520,
    lastUpdate: "1 hour ago",
    description: "Increased volcanic activity detected. Evacuation procedures initiated.",
    icon: AlertCircle,
    color: "bg-red-500"
  }
];

const statsData = [
  { label: "Active Disasters", value: 3, icon: AlertTriangle, color: "text-jawara-red" },
  { label: "People Affected", value: 2112, icon: Users, color: "text-jawara-blue" },
  { label: "High Risk Areas", value: 5, icon: MapPin, color: "text-amber-500" },
  { label: "Response Teams", value: 12, icon: HandHelping, color: "text-green-500" }
];

const DisasterMonitoring = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-20 hero-gradient overflow-hidden relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 z-10 animate-fade-in">
                <Badge className="mb-4 bg-jawara-blue/10 text-jawara-blue border-none hover:bg-jawara-blue/20">
                  Real-time Monitoring
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
                  Disaster <span className="text-jawara-blue">Monitoring</span> Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl mb-8 max-w-xl">
                  Track active disasters, affected areas, and response efforts in real-time.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {statsData.map((stat, index) => (
                <Card key={index} className="victim-card border-none shadow-md overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <stat.icon className={`w-10 h-10 mb-4 ${stat.color}`} />
                      <h3 className="text-3xl font-bold mb-1">{stat.value.toLocaleString()}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-20 bg-slate-50 dark:bg-jawara-dark/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Active Disasters</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Real-time updates on ongoing disaster situations
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search disasters..."
                    className="pl-10 w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {disasterData.map((disaster) => (
                <Card key={disaster.id} className="disaster-card glass-card overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${disaster.color}`}>
                          <disaster.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{disaster.type}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {disaster.location}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`
                          ${disaster.status === 'Ongoing' ? 'bg-red-500' : 
                            disaster.status === 'Monitoring' ? 'bg-amber-500' : 'bg-orange-500'} 
                          text-white border-none`}
                        >
                          {disaster.status}
                        </Badge>
                        <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none">
                          {disaster.severity} Severity
                        </Badge>
                        <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none">
                          {disaster.affected.toLocaleString()} Affected
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-slate-600 dark:text-slate-300">
                        {disaster.description}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Last updated: {disaster.lastUpdate}
                      </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" className="text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DisasterMonitoring;
