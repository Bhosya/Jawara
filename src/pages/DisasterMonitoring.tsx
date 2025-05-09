import React, { useState } from "react";
import {
  AlertTriangle,
  FileWarning,
  AlertCircle,
  Waves,
  CloudLightning,
  Loader,
  ArrowRight,
  Users,
  Package,
  HandHelping,
  MapPin,
  Filter,
  Search,
  SlidersHorizontal,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

// Fix for default marker icons in Leaflet
const iconRetinaUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";
const iconUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px ${color}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

// Add custom CSS for marker colors
const style = document.createElement("style");
style.textContent = `
  .custom-marker-red .leaflet-marker-icon {
    filter: hue-rotate(0deg) saturate(2) brightness(0.8);
  }
  .custom-marker-amber .leaflet-marker-icon {
    filter: hue-rotate(40deg) saturate(2) brightness(0.9);
  }
  .custom-marker-blue .leaflet-marker-icon {
    filter: hue-rotate(200deg) saturate(2) brightness(0.9);
  }
`;
document.head.appendChild(style);

// Mock data
const disasterData = [
  {
    id: 1,
    type: "Banjir",
    location: "Area Pesisir Semarang",
    status: "Berlangsung",
    severity: "Tinggi",
    affected: 1250,
    lastUpdate: "10 menit yang lalu",
    description:
      "Curah hujan tinggi menyebabkan potensi banjir di daerah dataran rendah Semarang.",
    icon: Waves,
    color: "bg-blue-500",
    coordinates: [-6.9667, 110.4167] as [number, number],
    markerColor: "#ef4444", // red
  },
  {
    id: 2,
    type: "Longsor",
    location: "Pegunungan Temanggung",
    status: "Pemantauan",
    severity: "Sedang",
    affected: 342,
    lastUpdate: "30 menit yang lalu",
    description:
      "Ketidakstabilan tanah terbaru di lereng bukit dekat Magelang. Warga diharapkan waspada.",
    icon: FileWarning,
    color: "bg-amber-500",
    coordinates: [-7.3167, 110.1833] as [number, number],
    markerColor: "#f59e0b", // amber
  },
  {
    id: 3,
    type: "Aktivitas Gunung Berapi",
    location: "Gunung Merapi",
    status: "Peringatan",
    severity: "Tinggi",
    affected: 520,
    lastUpdate: "1 jam yang lalu",
    description:
      "Peningkatan aktivitas vulkanik terdeteksi. Prosedur evakuasi telah dimulai.",
    icon: AlertCircle,
    color: "bg-red-500",
    coordinates: [-7.54, 110.4467] as [number, number],
    markerColor: "#ef4444", // red
  },
  {
    id: 4,
    type: "Banjir",
    location: "Kota Pekalongan",
    status: "Berlangsung",
    severity: "Sedang",
    affected: 800,
    lastUpdate: "15 menit yang lalu",
    description: "Luapan sungai di Pekalongan menyebabkan banjir sedang.",
    icon: Waves,
    color: "bg-blue-500",
    coordinates: [-6.8883, 109.6753] as [number, number],
    markerColor: "#f59e0b", // amber
  },
  {
    id: 5,
    type: "Gempa Bumi",
    location: "Wonosobo",
    status: "Peringatan",
    severity: "Tinggi",
    affected: 1200,
    lastUpdate: "5 menit yang lalu",
    description: "Gempa bumi berkekuatan 5.2 SR terdeteksi di area Wonosobo.",
    icon: AlertCircle,
    color: "bg-red-500",
    coordinates: [-7.363, 109.9] as [number, number],
    markerColor: "#ef4444", // red
  },
  {
    id: 6,
    type: "Banjir",
    location: "Kota Tegal",
    status: "Pemantauan",
    severity: "Rendah",
    affected: 300,
    lastUpdate: "1 jam yang lalu",
    description: "Banjir ringan di area pesisir Tegal.",
    icon: Waves,
    color: "bg-blue-500",
    coordinates: [-6.8667, 109.1333] as [number, number],
    markerColor: "#3b82f6", // blue
  },
  {
    id: 7,
    type: "Longsor",
    location: "Purworejo",
    status: "Peringatan",
    severity: "Tinggi",
    affected: 600,
    lastUpdate: "20 menit yang lalu",
    description: "Longsor besar dilaporkan di perbukitan Purworejo.",
    icon: AlertCircle,
    color: "bg-red-500",
    coordinates: [-7.7, 110.0167] as [number, number],
    markerColor: "#ef4444", // red
  },
  {
    id: 8,
    type: "Banjir",
    location: "Kendal",
    status: "Pemantauan",
    severity: "Rendah",
    affected: 250,
    lastUpdate: "45 menit yang lalu",
    description: "Banjir ringan di area permukiman Kendal.",
    icon: Waves,
    color: "bg-blue-500",
    coordinates: [-6.9167, 110.2] as [number, number],
    markerColor: "#3b82f6", // blue
  },
  {
    id: 9,
    type: "Longsor",
    location: "Magelang",
    status: "Pemantauan",
    severity: "Sedang",
    affected: 400,
    lastUpdate: "30 menit yang lalu",
    description: "Risiko longsor sedang di perbukitan Magelang.",
    icon: FileWarning,
    color: "bg-amber-500",
    coordinates: [-7.4667, 110.1833] as [number, number],
    markerColor: "#f59e0b", // amber
  },
  {
    id: 10,
    type: "Banjir",
    location: "Salatiga",
    status: "Pemantauan",
    severity: "Rendah",
    affected: 200,
    lastUpdate: "1 jam yang lalu",
    description: "Banjir ringan di area perkotaan Salatiga.",
    icon: Waves,
    color: "bg-blue-500",
    coordinates: [-7.3333, 110.5] as [number, number],
    markerColor: "#3b82f6", // blue
  },
];

const statsData = [
  {
    label: "Bencana Aktif",
    value: 3,
    icon: AlertTriangle,
    color: "text-jawara-red",
  },
  {
    label: "Korban Terdampak",
    value: 2112,
    icon: Users,
    color: "text-jawara-blue",
  },
  {
    label: "Area Berisiko Tinggi",
    value: 5,
    icon: MapPin,
    color: "text-amber-500",
  },
  {
    label: "Tim Tanggap",
    value: 12,
    icon: HandHelping,
    color: "text-green-500",
  },
];

const DisasterMonitoring = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
                  Pemantauan Real-time
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
                  Dashboard <span className="text-jawara-blue">Pemantauan</span>{" "}
                  Bencana
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl mb-8 max-w-xl">
                  Pantau bencana aktif, area terdampak, dan upaya penanganan
                  secara real-time.
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
                <Card
                  key={index}
                  className="victim-card border-none shadow-md overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <stat.icon className={`w-10 h-10 mb-4 ${stat.color}`} />
                      <h3 className="text-3xl font-bold mb-1">
                        {stat.value.toLocaleString()}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Peta Bencana
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Visualisasi lokasi bencana secara real-time
              </p>
            </div>
            <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
              <MapContainer
                center={[-7.27, 110.42]} // Central Java coordinates
                zoom={8}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {disasterData.map((disaster) => (
                  <Marker
                    key={disaster.id}
                    position={disaster.coordinates}
                    icon={createCustomIcon(disaster.markerColor)}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold">{disaster.type}</h3>
                        <p className="text-sm">{disaster.location}</p>
                        <p className="text-sm text-slate-500">
                          {disaster.description}
                        </p>
                        <div className="mt-2">
                          <Badge
                            className={`${
                              disaster.status === "Berlangsung"
                                ? "bg-red-500"
                                : disaster.status === "Pemantauan"
                                ? "bg-amber-500"
                                : "bg-orange-500"
                            } 
                            text-white border-none`}
                          >
                            {disaster.status}
                          </Badge>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-20 bg-slate-50 dark:bg-jawara-dark/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Bencana Aktif
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Pembaruan real-time tentang situasi bencana yang sedang
                  berlangsung
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Cari bencana..."
                    className="pl-10 w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Ekspor</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {disasterData.map((disaster) => (
                <Card
                  key={disaster.id}
                  className="disaster-card glass-card overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${disaster.color}`}
                        >
                          <disaster.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">
                            {disaster.type}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {disaster.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge
                          className={`
                          ${
                            disaster.status === "Berlangsung"
                              ? "bg-red-500"
                              : disaster.status === "Pemantauan"
                              ? "bg-amber-500"
                              : "bg-orange-500"
                          } 
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
                      <Button
                        variant="outline"
                        className="text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10"
                        onClick={() =>
                          navigate(`/disaster-monitoring/${disaster.id}`)
                        }
                      >
                        Lihat Detail
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
