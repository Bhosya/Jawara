import React, { useState } from "react";
import { Package, Truck, Stethoscope, Home, Utensils, Droplet, Heart, Search, SlidersHorizontal, Download, Plus, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data
const aidData = [
  {
    id: 1,
    type: "Medical Supplies",
    location: "Semarang General Hospital",
    status: "Urgent",
    needed: 500,
    received: 250,
    description: "Emergency medical supplies including bandages, antiseptics, and basic medications.",
    icon: Stethoscope,
    color: "bg-red-500"
  },
  {
    id: 2,
    type: "Food Supplies",
    location: "Temanggung Evacuation Center",
    status: "High",
    needed: 1000,
    received: 600,
    description: "Non-perishable food items and clean drinking water for displaced families.",
    icon: Utensils,
    color: "bg-amber-500"
  },
  {
    id: 3,
    type: "Shelter Materials",
    location: "Mt. Merapi Evacuation Zone",
    status: "Medium",
    needed: 200,
    received: 120,
    description: "Tents, blankets, and basic shelter materials for displaced families.",
    icon: Home,
    color: "bg-blue-500"
  },
  {
    id: 4,
    type: "Clean Water",
    location: "Surakarta Affected Areas",
    status: "High",
    needed: 800,
    received: 400,
    description: "Clean water supply and water purification tablets for affected communities.",
    icon: Droplet,
    color: "bg-cyan-500"
  }
];

const statsData = [
  { label: "Total Needs", value: 2500, icon: Package, color: "text-jawara-red" },
  { label: "Supplies Received", value: 1370, icon: Truck, color: "text-jawara-blue" },
  { label: "Urgent Needs", value: 3, icon: Heart, color: "text-amber-500" },
  { label: "Distribution Points", value: 8, icon: MapPin, color: "text-green-500" }
];

const AidMonitoring = () => {
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
                  Aid Distribution
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
                  Aid <span className="text-jawara-blue">Needs</span> Monitoring
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl mb-8 max-w-xl">
                  Track aid requirements, donations, and distribution efforts across affected areas.
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
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Aid Requirements</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Current aid needs and distribution status
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search aid needs..."
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
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  <span>Add Need</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {aidData.map((aid) => (
                <Card key={aid.id} className="disaster-card glass-card overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${aid.color}`}>
                          <aid.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{aid.type}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {aid.location}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`
                          ${aid.status === 'Urgent' ? 'bg-red-500' : 
                            aid.status === 'High' ? 'bg-amber-500' : 'bg-blue-500'} 
                          text-white border-none`}
                        >
                          {aid.status} Priority
                        </Badge>
                        <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none">
                          {aid.received}/{aid.needed} Units
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-slate-600 dark:text-slate-300">
                        {aid.description}
                      </p>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
                          <span>Progress</span>
                          <span>{Math.round((aid.received / aid.needed) * 100)}%</span>
                        </div>
                        <Progress value={(aid.received / aid.needed) * 100} className="h-2" />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                      <Button variant="outline" className="text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10">
                        Update Status
                      </Button>
                      <Button className="bg-jawara-blue hover:bg-jawara-blue/90">
                        Donate
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

export default AidMonitoring;
