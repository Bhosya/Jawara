import React from "react";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
    commandCenter: "024-1234567",
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
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span>{disasterData.contactInfo.commandCenter}</span>
                        <Badge className="ml-auto">Pusat Komando</Badge>
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

        {/* Resources Section */}
        <section className="py-12 md:py-20 bg-slate-50 dark:bg-jawara-dark/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Status Sumber Daya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(disasterData.resources).map(
                ([resource, data]) => (
                  <Card key={resource} className="border-none shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 capitalize">
                        {resource === "food"
                          ? "Makanan"
                          : resource === "water"
                          ? "Air"
                          : resource === "medicine"
                          ? "Obat-obatan"
                          : resource === "blankets"
                          ? "Selimut"
                          : resource}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Terdapat</span>
                          <span>{data.received.toLocaleString()}</span>
                        </div>
                        <Progress
                          value={(data.received / data.needed) * 100}
                          className="h-2"
                        />
                        <div className="flex justify-between text-sm text-slate-500">
                          <span>Dibutuhkan</span>
                          <span>{data.needed.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </section>

        {/* Evacuation Centers Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Pusat Evakuasi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {disasterData.evacuationCenters.map((center, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="w-5 h-5 text-jawara-blue" />
                      <h3 className="font-semibold">{center.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Penghuni Saat Ini</span>
                        <span>{center.currentOccupants.toLocaleString()}</span>
                      </div>
                      <Progress
                        value={
                          (center.currentOccupants / center.capacity) * 100
                        }
                        className="h-2"
                      />
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Kapasitas</span>
                        <span>{center.capacity.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Response Teams Section */}
        <section className="py-12 md:py-20 bg-slate-50 dark:bg-jawara-dark/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Tim Tanggap</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {disasterData.responseTeams.map((team, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-5 h-5 text-jawara-blue" />
                      <h3 className="font-semibold">{team.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Anggota</span>
                        <span>{team.members}</span>
                      </div>
                      <Badge
                        className={`${
                          team.status === "Aktif"
                            ? "bg-green-500"
                            : "bg-amber-500"
                        } text-white`}
                      >
                        {team.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Updates Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Pembaruan Terbaru
            </h2>
            <div className="space-y-4">
              {disasterData.updates.map((update, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-slate-500 mt-1" />
                      <div>
                        <p className="text-slate-600 dark:text-slate-300">
                          {update.message}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          {update.time}
                        </p>
                      </div>
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

export default DisasterDetails;
