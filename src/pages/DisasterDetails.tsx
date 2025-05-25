import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  AlertTriangle,
  FileWarning,
  AlertCircle,
  Waves,
  Users,
  Package,
  HandHelping,
  MapPin,
  ArrowLeft,
  Clock,
  Calendar,
  Phone,
  Mail,
  Building2,
  Heart,
  Shield,
  AlertOctagon,
  UserCircle,
  Package2,
  Users2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import L from "leaflet";

// Custom marker icon
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px ${color}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

// Mock data - in real app, this would come from an API
const disasterData = {
  id: 1,
  type: "Banjir",
  location: "Area Pesisir Semarang",
  status: "Berlangsung",
  severity: "Tinggi",
  affected: 1250,
  lastUpdate: "10 menit yang lalu",
  description:
    "Curah hujan tinggi menyebabkan potensi banjir di daerah dataran rendah Semarang. Beberapa area permukiman terdampak dengan ketinggian air mencapai 1,5 meter di beberapa lokasi.",
  coordinates: [-6.9667, 110.4167] as [number, number],
  markerColor: "#ef4444",
  startDate: "2024-03-15T08:00:00",
  evacuationCenters: [
    { name: "SDN 1 Semarang", capacity: 500, currentOccupants: 320 },
    { name: "SMPN 2 Semarang", capacity: 400, currentOccupants: 280 },
    { name: "SMAN 1 Semarang", capacity: 600, currentOccupants: 450 },
  ],
  responseTeams: [
    { name: "BPBD Semarang", members: 25, status: "Aktif" },
    { name: "SAR Semarang", members: 15, status: "Aktif" },
    { name: "PMI Semarang", members: 30, status: "Aktif" },
  ],
  resources: {
    food: { needed: 2000, received: 1500 },
    water: { needed: 3000, received: 2500 },
    medicine: { needed: 500, received: 300 },
    blankets: { needed: 1000, received: 800 },
  },
  contactInfo: {
    emergency: "112",
    email: "emergency@semarang.go.id",
  },
  updates: [
    {
      time: "10 menit yang lalu",
      message: "Ketinggian air terus meningkat di area utara",
    },
    {
      time: "30 menit yang lalu",
      message: "Pusat evakuasi tambahan telah dibuka",
    },
    {
      time: "1 jam yang lalu",
      message: "Tim tanggap darurat telah dikerahkan",
    },
  ],
};

const DisasterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-20 hero-gradient overflow-hidden relative">
          <div className="container mx-auto px-4 md:px-6">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Pemantauan
            </Button>

            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-2/3">
                <Badge className="mb-4 bg-jawara-blue/10 text-jawara-blue border-none hover:bg-jawara-blue/20">
                  {disasterData.status}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  {disasterData.type} di {disasterData.location}
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">
                  {disasterData.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Badge className="bg-red-500 text-white border-none">
                    Tingkat Keparahan {disasterData.severity}
                  </Badge>
                  <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none">
                    {disasterData.affected.toLocaleString()} Orang Terdampak
                  </Badge>
                  <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none">
                    Terakhir Diperbarui: {disasterData.lastUpdate}
                  </Badge>
                </div>
              </div>

              <div className="md:w-1/3">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertOctagon className="w-5 h-5 text-red-500" />
                      Kontak Darurat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span>{disasterData.contactInfo.emergency}</span>
                        <Badge className="ml-auto bg-red-500 text-white">
                          Darurat
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span>{disasterData.contactInfo.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Lokasi</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Lokasi tepat bencana
              </p>
            </div>
            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <MapContainer
                center={disasterData.coordinates}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={disasterData.coordinates}
                  icon={createCustomIcon(disasterData.markerColor)}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold">{disasterData.type}</h3>
                      <p className="text-sm">{disasterData.location}</p>
                      <p className="text-sm text-slate-500">
                        {disasterData.description}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="victims"
                  className="flex items-center gap-2"
                >
                  <UserCircle className="w-4 h-4" />
                  Korban
                </TabsTrigger>
                <TabsTrigger value="aid" className="flex items-center gap-2">
                  <Package2 className="w-4 h-4" />
                  Bantuan
                </TabsTrigger>
                <TabsTrigger
                  value="volunteers"
                  className="flex items-center gap-2"
                >
                  <Users2 className="w-4 h-4" />
                  Relawan
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                {/* Resources Section */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                    <Package className="w-8 h-8 text-blue-500" />
                    Status Sumber Daya
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 bg-orange-50 dark:bg-orange-950/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-400">
                              Makanan
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-orange-600 dark:text-orange-300">
                                Terdapat
                              </span>
                              <span className="font-medium text-orange-700 dark:text-orange-400">
                                1,500 paket
                              </span>
                            </div>
                            <Progress
                              value={75}
                              className="h-2 bg-orange-100 dark:bg-orange-900/30"
                            />
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-orange-600 dark:text-orange-300">
                                Dibutuhkan
                              </span>
                              <span className="font-medium text-orange-700 dark:text-orange-400">
                                2,000 paket
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 bg-blue-50 dark:bg-blue-950/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                              Obat-obatan
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-blue-600 dark:text-blue-300">
                                Terdapat
                              </span>
                              <span className="font-medium text-blue-700 dark:text-blue-400">
                                300 paket
                              </span>
                            </div>
                            <Progress
                              value={60}
                              className="h-2 bg-blue-100 dark:bg-blue-900/30"
                            />
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-blue-600 dark:text-blue-300">
                                Dibutuhkan
                              </span>
                              <span className="font-medium text-blue-700 dark:text-blue-400">
                                500 paket
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 bg-purple-50 dark:bg-purple-950/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400">
                              Pakaian
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-purple-600 dark:text-purple-300">
                                Terdapat
                              </span>
                              <span className="font-medium text-purple-700 dark:text-purple-400">
                                800 paket
                              </span>
                            </div>
                            <Progress
                              value={80}
                              className="h-2 bg-purple-100 dark:bg-purple-900/30"
                            />
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-purple-600 dark:text-purple-300">
                                Dibutuhkan
                              </span>
                              <span className="font-medium text-purple-700 dark:text-purple-400">
                                1,000 paket
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 bg-cyan-50 dark:bg-cyan-950/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-cyan-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-400">
                              Air Bersih
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-cyan-600 dark:text-cyan-300">
                                Terdapat
                              </span>
                              <span className="font-medium text-cyan-700 dark:text-cyan-400">
                                2,500 galon
                              </span>
                            </div>
                            <Progress
                              value={83}
                              className="h-2 bg-cyan-100 dark:bg-cyan-900/30"
                            />
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-cyan-600 dark:text-cyan-300">
                                Dibutuhkan
                              </span>
                              <span className="font-medium text-cyan-700 dark:text-cyan-400">
                                3,000 galon
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Evacuation Centers */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-green-500" />
                    Pusat Evakuasi
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {disasterData.evacuationCenters.map((center) => (
                      <Card
                        key={center.name}
                        className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-0">
                          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-green-500" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                                  {center.name}
                                </h3>
                                <p className="text-sm text-green-600 dark:text-green-300">
                                  Pusat Evakuasi
                                </p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-green-600 dark:text-green-300">
                                  Kapasitas
                                </span>
                                <span className="font-medium text-green-700 dark:text-green-400">
                                  {center.capacity.toLocaleString()}
                                </span>
                              </div>
                              <Progress
                                value={
                                  (center.currentOccupants / center.capacity) *
                                  100
                                }
                                className="h-2 bg-green-100 dark:bg-green-900/30"
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-green-600 dark:text-green-300">
                                  Pengungsi
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-green-700 dark:text-green-400">
                                    {center.currentOccupants.toLocaleString()}
                                  </span>
                                  <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-none">
                                    {Math.round(
                                      (center.currentOccupants /
                                        center.capacity) *
                                        100
                                    )}
                                    %
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Response Teams */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                    <Users className="w-8 h-8 text-amber-500" />
                    Tim Tanggap Darurat
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {disasterData.responseTeams.map((team) => (
                      <Card
                        key={team.name}
                        className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-0">
                          <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                                <Users className="w-6 h-6 text-amber-500" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400">
                                  {team.name}
                                </h3>
                                <p className="text-sm text-amber-600 dark:text-amber-300">
                                  Tim Tanggap Darurat
                                </p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-amber-600 dark:text-amber-300">
                                  Anggota
                                </span>
                                <span className="font-medium text-amber-700 dark:text-amber-400">
                                  {team.members.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="victims">
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Data Korban
                    </h2>
                  </div>

                  <Card>
                    <CardContent className="p-8">
                      <div className="space-y-8">
                        <div className="flex flex-col items-center text-center">
                          <h3 className="text-2xl font-semibold mb-3">
                            Total Korban
                          </h3>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-jawara-blue/10 flex items-center justify-center">
                              <Users className="w-6 h-6 text-jawara-blue" />
                            </div>
                            <p className="text-5xl font-bold text-jawara-blue">
                              {disasterData.affected.toLocaleString()}
                            </p>
                          </div>
                          <p className="text-sm text-slate-500 mt-2">
                            Total korban terdampak
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-6 border-t">
                          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-green-500" />
                              </div>
                              <p className="text-2xl font-bold text-green-500">
                                1,100
                              </p>
                            </div>
                            <p className="text-sm font-medium text-green-600 dark:text-green-400">
                              Selamat
                            </p>
                          </div>

                          <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                              </div>
                              <p className="text-2xl font-bold text-red-500">
                                150
                              </p>
                            </div>
                            <p className="text-sm font-medium text-red-600 dark:text-red-400">
                              Meninggal
                            </p>
                          </div>

                          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                              </div>
                              <p className="text-2xl font-bold text-amber-500">
                                0
                              </p>
                            </div>
                            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                              Hilang
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="aid">
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Manajemen Bantuan
                    </h2>
                    <Button>+ Tambah Bantuan</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 bg-orange-50 dark:bg-orange-950/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-400">
                              Makanan
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-orange-600 dark:text-orange-300">
                                Terdapat
                              </span>
                              <span className="font-medium text-orange-700 dark:text-orange-400">
                                1,500 paket
                              </span>
                            </div>
                            <Progress
                              value={75}
                              className="h-2 bg-orange-100 dark:bg-orange-900/30"
                            />
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-orange-600 dark:text-orange-300">
                                Dibutuhkan
                              </span>
                              <span className="font-medium text-orange-700 dark:text-orange-400">
                                2,000 paket
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 bg-blue-50 dark:bg-blue-950/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                              Obat-obatan
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-blue-600 dark:text-blue-300">
                                Terdapat
                              </span>
                              <span className="font-medium text-blue-700 dark:text-blue-400">
                                300 paket
                              </span>
                            </div>
                            <Progress
                              value={60}
                              className="h-2 bg-blue-100 dark:bg-blue-900/30"
                            />
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-blue-600 dark:text-blue-300">
                                Dibutuhkan
                              </span>
                              <span className="font-medium text-blue-700 dark:text-blue-400">
                                500 paket
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 bg-purple-50 dark:bg-purple-950/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400">
                              Pakaian
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-purple-600 dark:text-purple-300">
                                Terdapat
                              </span>
                              <span className="font-medium text-purple-700 dark:text-purple-400">
                                800 paket
                              </span>
                            </div>
                            <Progress
                              value={80}
                              className="h-2 bg-purple-100 dark:bg-purple-900/30"
                            />
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-purple-600 dark:text-purple-300">
                                Dibutuhkan
                              </span>
                              <span className="font-medium text-purple-700 dark:text-purple-400">
                                1,000 paket
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 bg-cyan-50 dark:bg-cyan-950/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-cyan-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-400">
                              Air Bersih
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-cyan-600 dark:text-cyan-300">
                                Terdapat
                              </span>
                              <span className="font-medium text-cyan-700 dark:text-cyan-400">
                                2,500 galon
                              </span>
                            </div>
                            <Progress
                              value={83}
                              className="h-2 bg-cyan-100 dark:bg-cyan-900/30"
                            />
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-cyan-600 dark:text-cyan-300">
                                Dibutuhkan
                              </span>
                              <span className="font-medium text-cyan-700 dark:text-cyan-400">
                                3,000 galon
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Add aid distribution table here */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Distribusi Bantuan
                      </h3>
                      <div className="border rounded-lg">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-slate-50 dark:bg-slate-800">
                              <th className="p-4 text-left font-medium text-slate-600 dark:text-slate-300">
                                Nama Donatur
                              </th>
                              <th className="p-4 text-left font-medium text-slate-600 dark:text-slate-300">
                                Nominal
                              </th>
                              <th className="p-4 text-left font-medium text-slate-600 dark:text-slate-300">
                                Tanggal Donasi
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-4">PT Maju Bersama</td>
                              <td className="p-4">Rp 50.000.000</td>
                              <td className="p-4">15 Mar 2024</td>
                            </tr>
                            <tr className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-4">Yayasan Peduli Indonesia</td>
                              <td className="p-4">Rp 25.000.000</td>
                              <td className="p-4">14 Mar 2024</td>
                            </tr>
                            <tr className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-4">CV Sejahtera Abadi</td>
                              <td className="p-4">Rp 15.000.000</td>
                              <td className="p-4">13 Mar 2024</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-4">Budi Santoso</td>
                              <td className="p-4">Rp 5.000.000</td>
                              <td className="p-4">12 Mar 2024</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="volunteers">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Manajemen Relawan
                    </h2>
                  </div>

                  <Card className="border-none shadow-md">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center mb-8">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-full bg-jawara-blue/10 flex items-center justify-center">
                            <Users2 className="w-6 h-6 text-jawara-blue" />
                          </div>
                          <p className="text-4xl font-bold text-jawara-blue">
                            150
                          </p>
                        </div>
                        <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                          Total Relawan Aktif
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <Heart className="w-5 h-5 text-emerald-500" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-emerald-700 dark:text-emerald-400">
                                  Medical Assistance
                                </h3>
                                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
                                  45
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400">
                              Tim medis dan paramedis
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-950/20">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-blue-500" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-blue-700 dark:text-blue-400">
                                  Search and Rescue
                                </h3>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                                  35
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              Tim pencarian dan penyelamatan
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm bg-purple-50 dark:bg-purple-950/20">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-purple-500" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-purple-700 dark:text-purple-400">
                                  Shelter Management
                                </h3>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                                  25
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-purple-600 dark:text-purple-400">
                              Pengelola tempat pengungsian
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm bg-amber-50 dark:bg-amber-950/20">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                                <Heart className="w-5 h-5 text-amber-500" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-amber-700 dark:text-amber-400">
                                  Healthcare Support
                                </h3>
                                <p className="text-2xl font-bold text-amber-600 dark:text-amber-300">
                                  30
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-amber-600 dark:text-amber-400">
                              Dukungan kesehatan
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm bg-rose-50 dark:bg-rose-950/20">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                                <Heart className="w-5 h-5 text-rose-500" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-rose-700 dark:text-rose-400">
                                  Emotional Support
                                </h3>
                                <p className="text-2xl font-bold text-rose-600 dark:text-rose-300">
                                  15
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-rose-600 dark:text-rose-400">
                              Dukungan psikologis
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DisasterDetails;
