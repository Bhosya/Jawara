import React, { useEffect, useState } from "react";
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
  Heart,
  Shield,
  Star,
  Bell,
  MapPin,
  ClipboardList,
  Gift,
  Phone,
  Image,
  Syringe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GalleryModal from "@/components/GalleryModal";

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Mock data for early warnings
const alertData = [
  {
    id: 1,
    type: "Banjir",
    location: "Semarang",
    level: "Tinggi",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    description:
      "Curah hujan tinggi menyebabkan potensi banjir di daerah dataran rendah Semarang.",
    icon: Waves,
    color: "bg-blue-500",
  },
  {
    id: 2,
    type: "Longsor",
    location: "Magelang",
    level: "Sedang",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    description:
      "Ketidakstabilan tanah terbaru di lereng bukit dekat Magelang. Warga diharapkan waspada.",
    icon: FileWarning,
    color: "bg-amber-500",
  },
  {
    id: 3,
    type: "Badai Petir",
    location: "Surakarta",
    level: "Sedang",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    description:
      "Badai petir parah diperkirakan terjadi di wilayah Surakarta dalam 6 jam ke depan.",
    icon: CloudLightning,
    color: "bg-purple-500",
  },
];

// Mock data for current disasters with detailed impact data
const disasterData = [
  {
    id: 1,
    name: "Banjir",
    location: "Area Pesisir Semarang",
    status: "Berlangsung",
    severity: "Tinggi",
    affected: 1250,
    icon: Waves,
    color: "bg-blue-500",
    coordinates: [-6.9667, 110.4167] as [number, number],
    impact: {
      "Kecamatan Semarang Utara": 450,
      "Kecamatan Semarang Timur": 380,
      "Kecamatan Semarang Barat": 420,
    },
  },
  {
    id: 2,
    name: "Longsor",
    location: "Pegunungan Temanggung",
    status: "Pemantauan",
    severity: "Sedang",
    affected: 342,
    icon: FileWarning,
    color: "bg-amber-500",
    coordinates: [-7.3167, 110.1833] as [number, number],
    impact: {
      "Kecamatan Temanggung": 120,
      "Kecamatan Parakan": 142,
      "Kecamatan Tretep": 80,
    },
  },
  {
    id: 3,
    name: "Aktivitas Gunung Berapi",
    location: "Gunung Merapi",
    status: "Peringatan",
    severity: "Sedang",
    affected: 520,
    icon: AlertCircle,
    color: "bg-red-500",
    coordinates: [-7.5417, 110.4417] as [number, number],
    impact: {
      "Kecamatan Cangkringan": 200,
      "Kecamatan Pakem": 180,
      "Kecamatan Turi": 140,
    },
  },
];

// Updated operational needs data with progress
const operationalNeeds = [
  {
    id: 1,
    disaster: "Banjir",
    location: "Kecamatan Semarang Utara",
    needs: [
      {
        item: "Selimut",
        quantity: 200,
        current: 120,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Air Bersih",
        quantity: 500,
        current: 300,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Obat-obatan",
        quantity: 100,
        current: 80,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: 2,
    disaster: "Longsor",
    location: "Kecamatan Temanggung",
    needs: [
      {
        item: "Tenda",
        quantity: 30,
        current: 15,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Makanan Instan",
        quantity: 200,
        current: 100,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Peralatan Evakuasi",
        quantity: 50,
        current: 20,
        priority: "Medium",
        color: "bg-amber-500",
      },
    ],
  },
  {
    id: 3,
    disaster: "Aktivitas Gunung Berapi",
    location: "Kecamatan Cangkringan",
    needs: [
      {
        item: "Masker",
        quantity: 1000,
        current: 600,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Tenda",
        quantity: 50,
        current: 30,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Air Bersih",
        quantity: 300,
        current: 150,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
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
    label: "Paket Bantuan",
    value: 1450,
    icon: Package,
    color: "text-green-500",
  },
  {
    label: "Relawan Aktif",
    value: 325,
    icon: HandHelping,
    color: "text-amber-500",
  },
];

// Add gallery images data
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1616416354008-3007299b4933?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Distribusi bantuan di lokasi bencana",
    title: "Distribusi Bantuan",
    date: "Semarang, 15 Maret 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1741081288260-877057e3fa27?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Tim relawan memberikan bantuan medis",
    title: "Bantuan Medis",
    date: "Magelang, 12 Maret 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1598953547052-edfed846f700?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pembangunan shelter darurat",
    title: "Pembangunan Shelter",
    date: "Temanggung, 10 Maret 2024",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1681995602372-f37dfb97dc95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pelatihan relawan baru",
    title: "Pelatihan Relawan",
    date: "Surakarta, 8 Maret 2024",
  },
  {
    src: "https://img.inews.co.id/media/822/files/inews_new/2021/01/26/bantuan_bencanajpg.jpg",
    alt: "Distribusi makanan untuk pengungsi",
    title: "Distribusi Makanan",
    date: "Boyolali, 5 Maret 2024",
  },
  {
    src: "https://www.insights.id/uploads/2021/02/601a3e738b8fd_1612332659.jpeg",
    alt: "Koordinasi tim relawan",
    title: "Koordinasi Tim",
    date: "Salatiga, 3 Maret 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pendistribusian air bersih",
    title: "Distribusi Air Bersih",
    date: "Kendal, 1 Maret 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pendistribusian obat-obatan",
    title: "Distribusi Obat-obatan",
    date: "Demak, 28 Februari 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pendistribusian pakaian",
    title: "Distribusi Pakaian",
    date: "Grobogan, 25 Februari 2024",
  },
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [currentVictimIndex, setCurrentVictimIndex] = useState(0);
  const [currentNeedIndex, setCurrentNeedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [victimProgress, setVictimProgress] = useState(0);
  const [needProgress, setNeedProgress] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

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

  // Auto-scroll for victim data
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVictimIndex((prev) => (prev + 1) % disasterData.length);
      setVictimProgress(0);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setVictimProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentVictimIndex]);

  // Auto-scroll for operational needs
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNeedIndex((prev) => (prev + 1) % operationalNeeds.length);
      setNeedProgress(0);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setNeedProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentNeedIndex]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-jawara-dark">
        <div className="flex flex-col items-center">
          <AlertTriangle className="w-12 h-12 text-jawara-red animate-pulse" />
          <h1 className="mt-4 text-2xl font-medium">JAWARA</h1>
          <div className="mt-6 flex items-center">
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            <span className="text-sm text-slate-500">
              Memuat data bencana...
            </span>
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
                  Sistem Peringatan Dini
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
                  Platform <span className="text-jawara-blue">Penanganan</span>{" "}
                  Bencana Jawa Tengah
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl mb-8 max-w-xl">
                  Pemantauan bencana real-time, pelacakan korban, dan koordinasi
                  bantuan untuk Jawa Tengah.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-jawara-blue hover:bg-jawara-blue/90"
                  >
                    Lihat Bencana Aktif
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-jawara-blue text-jawara-blue hover:bg-jawara-blue/10"
                  >
                    Daftar Sebagai Relawan
                  </Button>
                </div>
              </div>

              <div className="md:w-1/2 mt-12 md:mt-0 relative z-10 animate-scale-up">
                <div className="relative">
                  <div className="alert-card glass-card rounded-2xl p-6 md:p-8 shadow-lg mb-6 overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${alertData[currentAlertIndex].color} mr-4`}
                        >
                          {React.createElement(
                            alertData[currentAlertIndex].icon,
                            { className: "w-5 h-5 text-white" }
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg flex items-center">
                            Peringatan {alertData[currentAlertIndex].type}
                            <Badge className="ml-3 bg-red-500 text-white border-none">
                              {alertData[currentAlertIndex].level}
                            </Badge>
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {alertData[currentAlertIndex].location} •{" "}
                            {alertData[
                              currentAlertIndex
                            ].timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      {alertData[currentAlertIndex].description}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link
                        to="/disaster-monitoring"
                        className="text-jawara-blue hover:underline text-sm flex items-center"
                      >
                        Lihat detail <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                      <div className="flex items-center">
                        <div className="text-xs text-slate-500 mr-2">
                          Peringatan berikutnya dalam
                        </div>
                        <Progress value={progress} className="w-24 h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Current Disaster Status Section */}
        <section className="py-12 md:py-20 bg-slate-100 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 mb-8">
              <Bell className="w-6 h-6 text-jawara-blue" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Status Bencana Terkini
              </h2>
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {disasterData.map((disaster) => (
                  <div
                    key={disaster.id}
                    className="disaster-card glass-card p-4 rounded-xl shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${disaster.color} mr-3`}
                      >
                        {React.createElement(disaster.icon, {
                          className: "w-4 h-4 text-white",
                        })}
                      </div>
                      <h3 className="font-medium">{disaster.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      {disaster.location}
                    </p>
                    <div className="flex justify-between items-center">
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
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {disaster.affected} terdampak
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
                <MapContainer
                  center={[-7.0, 110.0]}
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
                      icon={L.divIcon({
                        className: `w-8 h-8 rounded-full flex items-center justify-center ${disaster.color}`,
                        html: `<div class="w-full h-full flex items-center justify-center">
                          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            ${
                              disaster.icon === Waves
                                ? '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />'
                                : disaster.icon === FileWarning
                                ? '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="12" y1="9" x2="12.01" y2="9" />'
                                : '<circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />'
                            }
                          </svg>
                        </div>`,
                        iconSize: [32, 32],
                        iconAnchor: [16, 16],
                      })}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{disaster.name}</h3>
                          <p className="text-sm text-slate-600">
                            {disaster.location}
                          </p>
                          <p className="text-sm text-slate-500">
                            Status: {disaster.status}
                          </p>
                          <p className="text-sm text-slate-500">
                            {disaster.affected} terdampak
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Combined Impact and Needs Section */}
        <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Syringe className="w-6 h-6 text-jawara-blue" />
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Status Korban & Kebutuhan
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-2 ml-8">
                  Data real-time korban terdampak dan kebutuhan operasional
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Impact Section */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-jawara-blue/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-jawara-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Korban Terdampak
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Berdasarkan wilayah terdampak
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(disasterData[currentVictimIndex].impact).map(
                    ([region, count]) => (
                      <div
                        key={region}
                        className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium text-slate-900 dark:text-white">
                            {region}
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-slate-50 dark:bg-slate-900"
                          >
                            {count.toLocaleString()} orang
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                              {Math.round(count * 0.8).toLocaleString()}
                            </div>
                            <div className="text-sm text-green-600/80 dark:text-green-400/80">
                              Dievakuasi
                            </div>
                          </div>
                          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                            <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                              {Math.round(count * 0.2).toLocaleString()}
                            </div>
                            <div className="text-sm text-red-600/80 dark:text-red-400/80">
                              Belum Dievakuasi
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Operational Needs Section */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-jawara-blue/10 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-jawara-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Kebutuhan Operasional
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Status pemenuhan kebutuhan darurat
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {operationalNeeds[currentNeedIndex].needs.map(
                    (need, index) => {
                      const percentage = Math.round(
                        (need.current / need.quantity) * 100
                      );
                      return (
                        <div
                          key={index}
                          className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900 dark:text-white">
                                {need.item}
                              </span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <AlertTriangle
                                      className={`w-4 h-4 ${need.color}`}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      {need.priority === "Urgent"
                                        ? "Kebutuhan mendesak"
                                        : need.priority === "High"
                                        ? "Prioritas tinggi"
                                        : "Prioritas sedang"}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <Badge className={need.color}>
                              {need.priority}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">
                                {need.current.toLocaleString()} /{" "}
                                {need.quantity.toLocaleString()}
                              </span>
                              <span className="font-medium text-slate-900 dark:text-white">
                                {percentage}%
                              </span>
                            </div>
                            <div className="relative">
                              <Progress
                                value={percentage}
                                className={`h-2 ${need.color}`}
                              />
                            </div>
                            <div className="text-xs text-slate-500 text-right">
                              {need.quantity - need.current} tersisa
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <div className="text-xs">Data diperbarui setiap 10 menit</div>
                <Progress value={victimProgress} className="w-24 h-1.5" />
              </div>
              <Link
                to="/disaster-monitoring"
                className="text-jawara-blue hover:underline text-sm flex items-center gap-1"
              >
                Lihat detail lengkap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Donation Center Section */}
        <section className="py-6 md:py-10 bg-slate-100 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 mb-8">
              <Gift className="w-6 h-6 text-jawara-blue" />
              <h2 className="text-2xl md:text-3xl font-bold">Pusat Donasi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Donasi Barang */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-300/10 dark:from-blue-500/20 dark:via-blue-400/10 dark:to-blue-300/20">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/10"></div>
                <div className="relative p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-100">
                        Donasi Barang
                      </h3>
                      <p className="text-blue-800/80 dark:text-blue-200/80 mb-4">
                        Kirim bantuan berupa barang yang dibutuhkan korban
                        bencana. Kami akan mendistribusikan bantuan Anda ke
                        lokasi yang tepat.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-blue-800/80 dark:text-blue-200/80">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-blue-500" />
                          </div>
                          <span>
                            Barang akan diverifikasi sebelum didistribusikan
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-800/80 dark:text-blue-200/80">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-blue-500" />
                          </div>
                          <span>
                            Pengiriman dapat dilakukan ke posko terdekat
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-500/90 text-white">
                    Donasi Sekarang
                  </Button>
                </div>
              </div>

              {/* Donasi Dana */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/10 via-green-400/5 to-green-300/10 dark:from-green-500/20 dark:via-green-400/10 dark:to-green-300/20">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/10"></div>
                <div className="relative p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-green-900 dark:text-green-100">
                        Donasi Dana
                      </h3>
                      <p className="text-green-800/80 dark:text-green-200/80 mb-4">
                        Bantuan finansial Anda akan digunakan untuk membeli
                        kebutuhan darurat dan mendukung operasi penanganan
                        bencana.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-green-800/80 dark:text-green-200/80">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Heart className="w-4 h-4 text-green-500" />
                          </div>
                          <span>Transparansi penggunaan dana</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-800/80 dark:text-green-200/80">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Star className="w-4 h-4 text-green-500" />
                          </div>
                          <span>Laporan penggunaan dana setiap minggu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-500/90 text-white">
                    Donasi Sekarang
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Section */}
        <section className="py-6 md:py-10 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 mb-8">
              <HandHelping className="w-6 h-6 text-jawara-blue" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Bergabung Sebagai Relawan
              </h2>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-amber-300/10 dark:from-amber-500/20 dark:via-amber-400/10 dark:to-amber-300/20">
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/10"></div>
              <div className="relative">
                <div className="container mx-auto px-4 md:px-6 py-16">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                          <Star className="w-6 h-6 text-amber-500" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100">
                          Bergabung Sebagai Relawan
                        </h2>
                      </div>
                      <p className="text-amber-800/80 dark:text-amber-200/80 text-lg mb-6">
                        Bersama kita bisa memberikan bantuan yang lebih efektif
                        dan terkoordinasi untuk korban bencana.
                      </p>
                      <div className="space-y-4 mb-8">
                        <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl">
                          <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-3">
                            Keuntungan Menjadi Relawan
                          </h4>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-amber-800/80 dark:text-amber-200/80">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-amber-500" />
                              </div>
                              <span>Pelatihan dasar penanganan bencana</span>
                            </li>
                            <li className="flex items-center gap-3 text-amber-800/80 dark:text-amber-200/80">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <Heart className="w-4 h-4 text-amber-500" />
                              </div>
                              <span>Asuransi relawan</span>
                            </li>
                            <li className="flex items-center gap-3 text-amber-800/80 dark:text-amber-200/80">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <Star className="w-4 h-4 text-amber-500" />
                              </div>
                              <span>Sertifikasi relawan</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          size="lg"
                          className="bg-amber-500 hover:bg-amber-500/90 text-white"
                        >
                          Daftar Sebagai Relawan
                        </Button>
                        <div className="flex items-center gap-2 text-amber-800/80 dark:text-amber-200/80">
                          <Phone className="w-4 h-4" />
                          <span>
                            Hubungi kami:{" "}
                            <span className="font-medium">0812-3456-7890</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-300/20 rounded-2xl transform rotate-3"></div>
                        <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-semibold mb-4">
                            Formulir Pendaftaran Relawan
                          </h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                  Nama Lengkap
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                                  placeholder="Masukkan nama lengkap"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                  No. Telepon
                                </label>
                                <input
                                  type="tel"
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                                  placeholder="08xxxxxxxxxx"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Email
                              </label>
                              <input
                                type="email"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                                placeholder="email@example.com"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Alamat
                              </label>
                              <textarea
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                                rows={3}
                                placeholder="Masukkan alamat lengkap"
                              ></textarea>
                            </div>
                            <Button className="w-full bg-amber-500 hover:bg-amber-500/90">
                              Kirim Pendaftaran
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 md:py-20 bg-slate-100 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 mb-8">
              <Image className="w-6 h-6 text-jawara-blue" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Galeri Dokumentasi
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
              Dokumentasi kegiatan penanganan bencana dan upaya bantuan yang
              telah dilakukan oleh tim relawan dan masyarakat.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.slice(0, 6).map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl h-[300px]"
                >
                  <div className="w-full h-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold mb-1">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-sm">{image.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="border-jawara-blue text-jawara-blue hover:bg-jawara-blue/10"
                onClick={() => setIsGalleryModalOpen(true)}
              >
                Lihat Semua Dokumentasi
              </Button>
            </div>
          </div>
        </section>

        <GalleryModal
          isOpen={isGalleryModalOpen}
          onClose={() => setIsGalleryModalOpen(false)}
          images={galleryImages}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
