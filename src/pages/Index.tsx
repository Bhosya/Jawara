
import React, { useEffect, useState } from "react";
import { AlertTriangle, FileWarning, AlertCircle, Waves, CloudLightning, Loader, ArrowRight, Users, Package, HandHelping } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data
const alertData = [
  {
    id: 1,
    type: "Flood",
    location: "Semarang",
    level: "High",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    description: "Heavy rainfall causing potential flooding in low-lying areas of Semarang.",
    icon: Waves,
    color: "bg-blue-500"
  },
  {
    id: 2,
    type: "Landslide",
    location: "Magelang",
    level: "Medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    description: "Recent soil instability on hillsides near Magelang. Residents should be cautious.",
    icon: FileWarning,
    color: "bg-amber-500"
  },
  {
    id: 3,
    type: "Thunderstorm",
    location: "Surakarta",
    level: "Medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    description: "Severe thunderstorm expected in Surakarta region in the next 6 hours.",
    icon: CloudLightning,
    color: "bg-purple-500"
  }
];

const disasterData = [
  {
    id: 1,
    name: "Flood",
    location: "Semarang Coastal Area",
    status: "Ongoing",
    severity: "High",
    affected: 1250,
    icon: Waves,
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Landslide",
    location: "Temanggung Hills",
    status: "Monitoring",
    severity: "Medium",
    affected: 342,
    icon: FileWarning,
    color: "bg-amber-500"
  },
  {
    id: 3,
    name: "Volcanic Activity",
    location: "Mt. Merapi",
    status: "Warning",
    severity: "Medium",
    affected: 520,
    icon: AlertCircle,
    color: "bg-red-500"
  }
];

const statsData = [
  { label: "Active Disasters", value: 3, icon: AlertTriangle, color: "text-jawara-red" },
  { label: "People Affected", value: 2112, icon: Users, color: "text-jawara-blue" },
  { label: "Aid Packages", value: 1450, icon: Package, color: "text-green-500" },
  { label: "Active Volunteers", value: 325, icon: HandHelping, color: "text-amber-500" }
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % alertData.length);
      setProgress(0);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentAlertIndex]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-jawara-dark">
        <div className="flex flex-col items-center">
          <AlertTriangle className="w-12 h-12 text-jawara-red animate-pulse" />
          <h1 className="mt-4 text-2xl font-medium">JAWARA</h1>
          <div className="mt-6 flex items-center">
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            <span className="text-sm text-slate-500">Loading disaster data...</span>
          </div>
        </div>
      </div>
    );
  }

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
                  Early Warning System
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
                  Central Java <span className="text-jawara-blue">Disaster</span> Response Platform
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl mb-8 max-w-xl">
                  Real-time disaster monitoring, victim tracking, and aid coordination for Jawa Tengah.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-jawara-blue hover:bg-jawara-blue/90">
                    View Active Disasters
                  </Button>
                  <Button size="lg" variant="outline" className="border-jawara-blue text-jawara-blue hover:bg-jawara-blue/10">
                    Register as Volunteer
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2 mt-12 md:mt-0 relative z-10 animate-scale-up">
                <div className="relative">
                  <div className="alert-card glass-card rounded-2xl p-6 md:p-8 shadow-lg mb-6 overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${alertData[currentAlertIndex].color} mr-4`}>
                          {/* Fixed line - proper JSX syntax for dynamic component */}
                          {React.createElement(alertData[currentAlertIndex].icon, { className: "w-5 h-5 text-white" })}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg flex items-center">
                            {alertData[currentAlertIndex].type} Alert
                            <Badge className="ml-3 bg-red-500 text-white border-none">
                              {alertData[currentAlertIndex].level}
                            </Badge>
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {alertData[currentAlertIndex].location} • {alertData[currentAlertIndex].timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      {alertData[currentAlertIndex].description}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link to="/disaster-monitoring" className="text-jawara-blue hover:underline text-sm flex items-center">
                        View details <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                      <div className="flex items-center">
                        <div className="text-xs text-slate-500 mr-2">Next alert in</div>
                        <Progress value={progress} className="w-24 h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {disasterData.map((disaster) => (
                      <div
                        key={disaster.id}
                        className="disaster-card glass-card p-4 rounded-xl shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center mb-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${disaster.color} mr-3`}>
                            {/* Fixed line - proper JSX syntax for dynamic component */}
                            {React.createElement(disaster.icon, { className: "w-4 h-4 text-white" })}
                          </div>
                          <h3 className="font-medium">{disaster.name}</h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                          {disaster.location}
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge className={`
                            ${disaster.status === 'Ongoing' ? 'bg-red-500' : 
                              disaster.status === 'Monitoring' ? 'bg-amber-500' : 'bg-orange-500'} 
                            text-white border-none`}
                          >
                            {disaster.status}
                          </Badge>
                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            {disaster.affected} affected
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-jawara-dark/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-jawara-blue/10 text-jawara-blue border-none hover:bg-jawara-blue/20">
                Our Services
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Disaster Management</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                JAWARA provides an integrated platform for disaster monitoring, response coordination, and resource allocation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card rounded-xl p-6 transition-all hover:translate-y-[-5px]">
                <div className="w-12 h-12 rounded-full bg-jawara-blue/10 flex items-center justify-center mb-5">
                  <AlertTriangle className="w-6 h-6 text-jawara-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Early Warning System</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Receive real-time alerts for potential disasters in Central Java, including floods, earthquakes, and landslides.
                </p>
                <Link
                  to="/disaster-monitoring"
                  className="text-jawara-blue hover:text-jawara-blue/80 font-medium inline-flex items-center"
                >
                  View Alerts <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="glass-card rounded-xl p-6 transition-all hover:translate-y-[-5px]">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-5">
                  <FileWarning className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Disaster Monitoring</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Live updates on disaster status, affected areas, severity levels, and current conditions.
                </p>
                <Link
                  to="/disaster-monitoring"
                  className="text-jawara-blue hover:text-jawara-blue/80 font-medium inline-flex items-center"
                >
                  Monitor Disasters <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="glass-card rounded-xl p-6 transition-all hover:translate-y-[-5px]">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-5">
                  <Users className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Victim Tracking</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Track the number of affected people, missing individuals, and those in need of rescue.
                </p>
                <Link
                  to="/victim-tracking"
                  className="text-jawara-blue hover:text-jawara-blue/80 font-medium inline-flex items-center"
                >
                  View Victim Data <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="glass-card rounded-xl p-6 transition-all hover:translate-y-[-5px]">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-5">
                  <Package className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Aid Needs Monitoring</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Lists of required supplies such as food, medicine, and shelter to enable effective contributions.
                </p>
                <Link
                  to="/aid-monitoring"
                  className="text-jawara-blue hover:text-jawara-blue/80 font-medium inline-flex items-center"
                >
                  View Aid Needs <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="glass-card rounded-xl p-6 transition-all hover:translate-y-[-5px]">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-5">
                  <HandHelping className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Volunteer Registration</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Sign up as a volunteer and get assigned to disaster-affected areas based on your skills.
                </p>
                <Link
                  to="/volunteer"
                  className="text-jawara-blue hover:text-jawara-blue/80 font-medium inline-flex items-center"
                >
                  Register as Volunteer <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="glass-card rounded-xl p-6 transition-all hover:translate-y-[-5px]">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-5">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Emergency Resources</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Access to emergency contacts, evacuation routes, and disaster preparedness guides.
                </p>
                <Link
                  to="#"
                  className="text-jawara-blue hover:text-jawara-blue/80 font-medium inline-flex items-center"
                >
                  Access Resources <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-jawara-red/10 text-jawara-red border-none hover:bg-jawara-red/20">
                Get Involved
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Volunteer Network</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                Your skills and time can make a significant difference in disaster response and recovery efforts throughout Central Java.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-jawara-red hover:bg-jawara-red/90">
                  Register as Volunteer
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-jawara-blue/5 to-jawara-red/5 z-0"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
