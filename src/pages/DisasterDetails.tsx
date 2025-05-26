import React, { useState, useEffect } from "react";
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
  Mountain,
  Activity,
  Wind,
  Flame,
  TreePine,
  Triangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import L from "leaflet";
import { getBencanaById } from "@/lib/api";
import type { Bencana } from "@/lib/types";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import ReactDOMServer from "react-dom/server";

// Custom marker icon
const getIconByJenisBencana = (jenis_bencana: string) => {
  switch (jenis_bencana?.toLowerCase()) {
    case "banjir":
      return Waves;
    case "longsor":
    case "tanah longsor":
      return Mountain;
    case "gunung berapi":
    case "erupsi":
      return Triangle;
    case "gempa bumi":
      return Activity;
    case "kebakaran hutan":
      return TreePine;
    case "angin kencang":
    case "angin puting beliung":
      return Wind;
    case "kebakaran":
      return Flame;
    default:
      return AlertTriangle;
  }
};

// Add this helper function before the DisasterDetails component
const getIconPath = (jenis_bencana: string): string => {
  switch (jenis_bencana?.toLowerCase()) {
    case "banjir":
      return '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><path d="M7 12l2-2 2 2 2-2 2 2"/>';
    case "longsor":
    case "tanah longsor":
      return '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>';
    case "gunung berapi":
    case "erupsi":
      return '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>';
    case "gempa bumi":
      return '<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="4"/>';
    case "kebakaran hutan":
      return '<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="4"/>';
    case "angin kencang":
    case "angin puting beliung":
      return '<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="4"/>';
    case "kebakaran":
      return '<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="4"/>';
    default:
      return '<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="4"/>';
  }
};

const DisasterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [disasterData, setDisasterData] = useState<Bencana | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await getBencanaById(id);
          setDisasterData(data);
        }
      } catch (error) {
        console.error("Error fetching disaster data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-jawara-blue"></div>
      </div>
    );
  }

  if (!disasterData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Data tidak ditemukan</h2>
          <Button onClick={() => navigate(-1)}>Kembali</Button>
        </div>
      </div>
    );
  }

  // Calculate total affected people
  const totalAffected =
    disasterData.jumlah_korban?.reduce(
      (total, korban) =>
        total +
        korban.jumlah_selamat +
        korban.jumlah_meninggal +
        korban.jumlah_hilang,
      0
    ) || 0;

  // Get latest update time
  const lastUpdate = disasterData.tanggal_bencana
    ? format(new Date(disasterData.tanggal_bencana), "dd MMM yyyy HH:mm", {
        locale: idLocale,
      })
    : "Tidak tersedia";

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
                  {disasterData.jenis_bencana} di{" "}
                  {disasterData.lokasi?.nama_kecamatan}
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">
                  {disasterData.deskripsi}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Badge className="bg-red-500 text-white border-none">
                    Tingkat Keparahan{" "}
                    {disasterData.tingkat_peringatan.toLowerCase()}
                  </Badge>
                  <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none">
                    {totalAffected.toLocaleString()} Orang Terdampak
                  </Badge>
                  <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none">
                    Terakhir Diperbarui: {lastUpdate}
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
                        <span>{disasterData.kontak_darurat?.no_telp}</span>
                        <Badge className="ml-auto bg-red-500 text-white">
                          Darurat
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span>{disasterData.kontak_darurat?.email}</span>
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
                center={[-7.0, 110.0]}
                zoom={8}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {disasterData && (
                  <Marker
                    key={disasterData.id}
                    position={[
                      disasterData.lokasi?.latitude || 0,
                      disasterData.lokasi?.longitude || 0,
                    ]}
                    icon={L.divIcon({
                      className: `w-8 h-8 rounded-full flex items-center justify-center ${
                        disasterData.tingkat_peringatan === "BERAT"
                          ? "bg-red-500"
                          : disasterData.tingkat_peringatan === "SEDANG"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`,
                      html: `<div class="w-full h-full flex items-center justify-center">
                        ${ReactDOMServer.renderToString(
                          React.createElement(
                            getIconByJenisBencana(disasterData.jenis_bencana),
                            {
                              className: "w-4 h-4 text-white",
                              strokeWidth: 2,
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                            }
                          )
                        )}
                      </div>`,
                      iconSize: [32, 32],
                      iconAnchor: [16, 16],
                    })}
                  />
                )}
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
                    {disasterData.kebutuhan?.map((kebutuhan) => (
                      <Card
                        key={kebutuhan.id}
                        className="border-none shadow-md overflow-hidden"
                      >
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
                                  {kebutuhan.jumlah_makanan} paket
                                </span>
                              </div>
                              <Progress
                                value={
                                  (kebutuhan.jumlah_makanan /
                                    kebutuhan.jumlah_max_makanan) *
                                  100
                                }
                                className="h-2 bg-orange-100 dark:bg-orange-900/30"
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-orange-600 dark:text-orange-300">
                                  Dibutuhkan
                                </span>
                                <span className="font-medium text-orange-700 dark:text-orange-400">
                                  {kebutuhan.jumlah_max_makanan} paket
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {disasterData.kebutuhan?.map((kebutuhan) => (
                      <Card
                        key={`${kebutuhan.id}-pakaian`}
                        className="border-none shadow-md overflow-hidden"
                      >
                        <CardContent className="p-0">
                          <div className="p-6 bg-blue-50 dark:bg-blue-950/20">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Package className="w-6 h-6 text-blue-500" />
                              </div>
                              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                                Pakaian
                              </h3>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-blue-600 dark:text-blue-300">
                                  Terdapat
                                </span>
                                <span className="font-medium text-blue-700 dark:text-blue-400">
                                  {kebutuhan.jumlah_pakaian} paket
                                </span>
                              </div>
                              <Progress
                                value={
                                  (kebutuhan.jumlah_pakaian /
                                    kebutuhan.jumlah_max_pakaian) *
                                  100
                                }
                                className="h-2 bg-blue-100 dark:bg-blue-900/30"
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-blue-600 dark:text-blue-300">
                                  Dibutuhkan
                                </span>
                                <span className="font-medium text-blue-700 dark:text-blue-400">
                                  {kebutuhan.jumlah_max_pakaian} paket
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {disasterData.kebutuhan?.map((kebutuhan) => (
                      <Card
                        key={`${kebutuhan.id}-obat`}
                        className="border-none shadow-md overflow-hidden"
                      >
                        <CardContent className="p-0">
                          <div className="p-6 bg-green-50 dark:bg-green-950/20">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Package className="w-6 h-6 text-green-500" />
                              </div>
                              <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                                Obat
                              </h3>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-green-600 dark:text-green-300">
                                  Terdapat
                                </span>
                                <span className="font-medium text-green-700 dark:text-green-400">
                                  {kebutuhan.jumlah_obat} paket
                                </span>
                              </div>
                              <Progress
                                value={
                                  (kebutuhan.jumlah_obat /
                                    kebutuhan.jumlah_max_obat) *
                                  100
                                }
                                className="h-2 bg-green-100 dark:bg-green-900/30"
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-green-600 dark:text-green-300">
                                  Dibutuhkan
                                </span>
                                <span className="font-medium text-green-700 dark:text-green-400">
                                  {kebutuhan.jumlah_max_obat} paket
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {disasterData.kebutuhan?.map((kebutuhan) => (
                      <Card
                        key={`${kebutuhan.id}-air`}
                        className="border-none shadow-md overflow-hidden"
                      >
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
                                  {kebutuhan.jumlah_airbersih} liter
                                </span>
                              </div>
                              <Progress
                                value={
                                  (kebutuhan.jumlah_airbersih /
                                    kebutuhan.jumlah_max_airbersih) *
                                  100
                                }
                                className="h-2 bg-cyan-100 dark:bg-cyan-900/30"
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-cyan-600 dark:text-cyan-300">
                                  Dibutuhkan
                                </span>
                                <span className="font-medium text-cyan-700 dark:text-cyan-400">
                                  {kebutuhan.jumlah_max_airbersih} liter
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Evacuation Centers */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-green-500" />
                    Pusat Evakuasi
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {disasterData.pusat_evakuasi && (
                      <Card className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-green-500" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                                  {disasterData.pusat_evakuasi.nama_lokasi}
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
                                  {disasterData.pusat_evakuasi.kapasitas.toLocaleString()}
                                </span>
                              </div>
                              <Progress
                                value={
                                  (disasterData.pusat_evakuasi.pengungsi /
                                    disasterData.pusat_evakuasi.kapasitas) *
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
                                    {disasterData.pusat_evakuasi.pengungsi.toLocaleString()}
                                  </span>
                                  <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-none">
                                    {Math.round(
                                      (disasterData.pusat_evakuasi.pengungsi /
                                        disasterData.pusat_evakuasi.kapasitas) *
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
                    )}
                  </div>
                </div>

                {/* Response Teams */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                    <Users className="w-8 h-8 text-amber-500" />
                    Tim Tanggap Darurat
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {disasterData.relawan?.map((relawan) => (
                      <Card
                        key={relawan.id}
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
                                  {relawan.nama}
                                </h3>
                                <p className="text-sm text-amber-600 dark:text-amber-300">
                                  {relawan.jenis_relawan}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-amber-600 dark:text-amber-300">
                                  Kontak
                                </span>
                                <span className="font-medium text-amber-700 dark:text-amber-400">
                                  {relawan.nomor_hp}
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
                              {totalAffected.toLocaleString()}
                            </p>
                          </div>
                          <p className="text-sm text-slate-500 mt-2">
                            Total korban terdampak
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-6 border-t">
                          {disasterData.jumlah_korban?.map((korban) => [
                            <div
                              key={`${korban.id}-selamat`}
                              className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                  <Users className="w-5 h-5 text-green-500" />
                                </div>
                                <p className="text-2xl font-bold text-green-500">
                                  {korban.jumlah_selamat}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                Selamat
                              </p>
                            </div>,

                            <div
                              key={`${korban.id}-meninggal`}
                              className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                  <AlertCircle className="w-5 h-5 text-red-500" />
                                </div>
                                <p className="text-2xl font-bold text-red-500">
                                  {korban.jumlah_meninggal}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                                Meninggal
                              </p>
                            </div>,

                            <div
                              key={`${korban.id}-hilang`}
                              className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                                </div>
                                <p className="text-2xl font-bold text-amber-500">
                                  {korban.jumlah_hilang}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                                Hilang
                              </p>
                            </div>,
                          ])}
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
                    {disasterData.kebutuhan?.map((kebutuhan) => (
                      <Card
                        key={kebutuhan.id}
                        className="border-none shadow-md overflow-hidden"
                      >
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
                                  {kebutuhan.jumlah_makanan} paket
                                </span>
                              </div>
                              <Progress
                                value={
                                  (kebutuhan.jumlah_makanan /
                                    kebutuhan.jumlah_max_makanan) *
                                  100
                                }
                                className="h-2 bg-orange-100 dark:bg-orange-900/30"
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-orange-600 dark:text-orange-300">
                                  Dibutuhkan
                                </span>
                                <span className="font-medium text-orange-700 dark:text-orange-400">
                                  {kebutuhan.jumlah_max_makanan} paket
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {disasterData.kebutuhan?.map((kebutuhan) => (
                      <Card
                        key={`${kebutuhan.id}-pakaian`}
                        className="border-none shadow-md overflow-hidden"
                      >
                        <CardContent className="p-0">
                          <div className="p-6 bg-blue-50 dark:bg-blue-950/20">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Package className="w-6 h-6 text-blue-500" />
                              </div>
                              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                                Pakaian
                              </h3>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-blue-600 dark:text-blue-300">
                                  Terdapat
                                </span>
                                <span className="font-medium text-blue-700 dark:text-blue-400">
                                  {kebutuhan.jumlah_pakaian} paket
                                </span>
                              </div>
                              <Progress
                                value={
                                  (kebutuhan.jumlah_pakaian /
                                    kebutuhan.jumlah_max_pakaian) *
                                  100
                                }
                                className="h-2 bg-blue-100 dark:bg-blue-900/30"
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-blue-600 dark:text-blue-300">
                                  Dibutuhkan
                                </span>
                                <span className="font-medium text-blue-700 dark:text-blue-400">
                                  {kebutuhan.jumlah_max_pakaian} paket
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {disasterData.kebutuhan?.map((kebutuhan) => (
                      <Card
                        key={`${kebutuhan.id}-obat`}
                        className="border-none shadow-md overflow-hidden"
                      >
                        <CardContent className="p-0">
                          <div className="p-6 bg-green-50 dark:bg-green-950/20">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Package className="w-6 h-6 text-green-500" />
                              </div>
                              <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                                Obat
                              </h3>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-green-600 dark:text-green-300">
                                  Terdapat
                                </span>
                                <span className="font-medium text-green-700 dark:text-green-400">
                                  {kebutuhan.jumlah_obat} paket
                                </span>
                              </div>
                              <Progress
                                value={
                                  (kebutuhan.jumlah_obat /
                                    kebutuhan.jumlah_max_obat) *
                                  100
                                }
                                className="h-2 bg-green-100 dark:bg-green-900/30"
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-green-600 dark:text-green-300">
                                  Dibutuhkan
                                </span>
                                <span className="font-medium text-green-700 dark:text-green-400">
                                  {kebutuhan.jumlah_max_obat} paket
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {disasterData.kebutuhan?.map((kebutuhan) => (
                      <Card
                        key={`${kebutuhan.id}-air`}
                        className="border-none shadow-md overflow-hidden"
                      >
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
                                  {kebutuhan.jumlah_airbersih} liter
                                </span>
                              </div>
                              <Progress
                                value={
                                  (kebutuhan.jumlah_airbersih /
                                    kebutuhan.jumlah_max_airbersih) *
                                  100
                                }
                                className="h-2 bg-cyan-100 dark:bg-cyan-900/30"
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-cyan-600 dark:text-cyan-300">
                                  Dibutuhkan
                                </span>
                                <span className="font-medium text-cyan-700 dark:text-cyan-400">
                                  {kebutuhan.jumlah_max_airbersih} liter
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
                            {disasterData.donasi?.map((donasi) => (
                              <tr
                                key={donasi.id}
                                className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50"
                              >
                                <td className="p-4">{donasi.nama_donatur}</td>
                                <td className="p-4">
                                  Rp {donasi.nominal.toLocaleString()}
                                </td>
                                <td className="p-4">
                                  {format(
                                    new Date(donasi.tanggal_donasi),
                                    "dd MMM yyyy",
                                    {
                                      locale: idLocale,
                                    }
                                  )}
                                </td>
                              </tr>
                            ))}
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
                            {disasterData.relawan?.length || 0}
                          </p>
                        </div>
                        <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                          Total Relawan Aktif
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {disasterData.relawan?.map((relawan) => (
                          <Card
                            key={relawan.id}
                            className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20"
                          >
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                  <Heart className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-emerald-700 dark:text-emerald-400">
                                    {relawan.nama}
                                  </h3>
                                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                    {relawan.jenis_relawan}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                  {relawan.email}
                                </p>
                                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                  {relawan.nomor_hp}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
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
