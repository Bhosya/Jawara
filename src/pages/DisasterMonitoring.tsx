import React, { useState, useEffect } from "react";
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
  Mountain,
  Triangle,
  Activity,
  TreePine,
  Wind,
  Flame,
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
import { useNavigate } from "react-router-dom";
import "@/styles/animations.css";
import { getAllBencana, getAllJumlahKorban, getAllRelawan } from "@/lib/api";
import type { Bencana, JumlahKorban, Relawan } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

const getAlertColor = (tingkat_peringatan: string) => {
  switch (tingkat_peringatan?.toLowerCase()) {
    case "berat":
      return "bg-red-500";
    case "sedang":
      return "bg-amber-500";
    default:
      return "bg-blue-500";
  }
};

const DisasterMonitoring = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bencanaData, setBencanaData] = useState<Bencana[]>([]);
  const [jumlahKorbanData, setJumlahKorbanData] = useState<JumlahKorban[]>([]);
  const [relawanData, setRelawanData] = useState<Relawan[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    jenisBencana: "all",
    status: "all",
    tingkatPeringatan: "all",
    kecamatan: "all",
  });
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bencana, jumlahKorban, relawan] = await Promise.all([
          getAllBencana(),
          getAllJumlahKorban(),
          getAllRelawan(),
        ]);

        setBencanaData(bencana);
        setJumlahKorbanData(jumlahKorban);
        setRelawanData(relawan);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Update stats labels to Indonesian
  const statsData = [
    {
      label: "Bencana Aktif",
      value: bencanaData.filter((b) => b.status === "AKTIF").length,
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor:
        "from-red-500/10 via-red-400/5 to-red-300/10 dark:from-red-500/20 dark:via-red-400/10 dark:to-red-300/20",
      iconBg: "bg-red-500/20",
    },
    {
      label: "Korban Terdampak",
      value: jumlahKorbanData.reduce(
        (total, korban) =>
          total +
          korban.jumlah_selamat +
          korban.jumlah_meninggal +
          korban.jumlah_hilang,
        0
      ),
      icon: Users,
      color: "text-blue-500",
      bgColor:
        "from-blue-500/10 via-blue-400/5 to-blue-300/10 dark:from-blue-500/20 dark:via-blue-400/10 dark:to-blue-300/20",
      iconBg: "bg-blue-500/20",
    },
    {
      label: "Area Berisiko Tinggi",
      value: bencanaData.filter((b) => b.tingkat_peringatan === "BERAT").length,
      icon: MapPin,
      color: "text-amber-500",
      bgColor:
        "from-amber-500/10 via-amber-400/5 to-amber-300/10 dark:from-amber-500/20 dark:via-amber-400/10 dark:to-amber-300/20",
      iconBg: "bg-amber-500/20",
    },
    {
      label: "Tim Tanggap",
      value: relawanData.length,
      icon: HandHelping,
      color: "text-green-500",
      bgColor:
        "from-green-500/10 via-green-400/5 to-green-300/10 dark:from-green-500/20 dark:via-green-400/10 dark:to-green-300/20",
      iconBg: "bg-green-500/20",
    },
  ];

  const getUniqueValues = (data: Bencana[], key: keyof Bencana): string[] => {
    const values = new Set(data.map((item) => String(item[key])));
    return Array.from(values).filter(Boolean);
  };

  const getFilteredData = (data: Bencana[]) => {
    return data.filter((bencana) => {
      const bencanaDate = bencana.tanggal_bencana
        ? new Date(bencana.tanggal_bencana)
        : null;
      const isInDateRange =
        !dateRange.from || !dateRange.to || !bencanaDate
          ? true
          : bencanaDate >= dateRange.from && bencanaDate <= dateRange.to;

      return (
        (filters.jenisBencana === "all" ||
          bencana.jenis_bencana === filters.jenisBencana) &&
        (filters.status === "all" || bencana.status === filters.status) &&
        (filters.tingkatPeringatan === "all" ||
          bencana.tingkat_peringatan === filters.tingkatPeringatan) &&
        (filters.kecamatan === "all" ||
          bencana.lokasi?.nama_kecamatan === filters.kecamatan) &&
        isInDateRange
      );
    });
  };

  const filteredData = getFilteredData(bencanaData);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredData.length / cardsPerPage);

  const isAnyFilterActive = () => {
    return (
      Object.values(filters).some((value) => value !== "all") ||
      dateRange.from !== undefined ||
      dateRange.to !== undefined
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-20 hero-gradient overflow-hidden relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center z-10 animate-fade-in">
              <Badge className="mb-6 text-base px-4 py-1.5 bg-jawara-blue/10 text-jawara-blue border-none">
                Pemantauan Real-time
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6 leading-tight">
                Dashboard <span className="text-jawara-blue">Pemantauan</span>{" "}
                Bencana
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
                Pantau bencana aktif, area terdampak, dan upaya penanganan
                secara real-time.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${stat.bgColor}`}
                >
                  <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/10"></div>
                  <div className="relative p-8">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl ${stat.iconBg} flex items-center justify-center mb-5`}
                      >
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <h3 className="text-4xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                        {stat.value.toLocaleString()}
                      </h3>
                      <p className="text-base text-slate-600 dark:text-slate-300">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
                <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 relative"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Saring</span>
                      {isAnyFilterActive() && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-jawara-blue rounded-full" />
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Filter Bencana</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Jenis Bencana
                        </label>
                        <Select
                          value={filters.jenisBencana}
                          onValueChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              jenisBencana: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis bencana" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Semua</SelectItem>
                            {getUniqueValues(bencanaData, "jenis_bencana").map(
                              (jenis) => (
                                <SelectItem key={jenis} value={jenis}>
                                  {jenis}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Status</label>
                        <Select
                          value={filters.status}
                          onValueChange={(value) =>
                            setFilters((prev) => ({ ...prev, status: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Semua</SelectItem>
                            {getUniqueValues(bencanaData, "status").map(
                              (status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Tingkat Peringatan
                        </label>
                        <Select
                          value={filters.tingkatPeringatan}
                          onValueChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              tingkatPeringatan: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tingkat peringatan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Semua</SelectItem>
                            {getUniqueValues(
                              bencanaData,
                              "tingkat_peringatan"
                            ).map((tingkat) => (
                              <SelectItem key={tingkat} value={tingkat}>
                                {tingkat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Kecamatan</label>
                        <Select
                          value={filters.kecamatan}
                          onValueChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              kecamatan: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kecamatan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Semua</SelectItem>
                            {bencanaData
                              .map((b) => b.lokasi?.nama_kecamatan)
                              .filter((kecamatan): kecamatan is string =>
                                Boolean(kecamatan)
                              )
                              .filter(
                                (value, index, self) =>
                                  self.indexOf(value) === index
                              )
                              .map((kecamatan) => (
                                <SelectItem key={kecamatan} value={kecamatan}>
                                  {kecamatan}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Rentang Tanggal
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "justify-start text-left font-normal",
                                  !dateRange.from && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.from ? (
                                  format(dateRange.from, "PPP", { locale: id })
                                ) : (
                                  <span>Dari</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={dateRange.from}
                                onSelect={(date) =>
                                  setDateRange((prev) => ({
                                    ...prev,
                                    from: date,
                                  }))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "justify-start text-left font-normal",
                                  !dateRange.to && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.to ? (
                                  format(dateRange.to, "PPP", { locale: id })
                                ) : (
                                  <span>Sampai</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={dateRange.to}
                                onSelect={(date) =>
                                  setDateRange((prev) => ({
                                    ...prev,
                                    to: date,
                                  }))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFilters({
                            jenisBencana: "all",
                            status: "all",
                            tingkatPeringatan: "all",
                            kecamatan: "all",
                          });
                          setDateRange({ from: undefined, to: undefined });
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        onClick={() => setIsFilterOpen(false)}
                        className="bg-jawara-blue text-white hover:bg-jawara-blue/90"
                      >
                        Terapkan
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredData.length > 0 ? (
                currentCards.map((bencana) => {
                  const totalKorban =
                    bencana.jumlah_korban?.reduce(
                      (total, korban) =>
                        total +
                        korban.jumlah_selamat +
                        korban.jumlah_meninggal +
                        korban.jumlah_hilang,
                      0
                    ) || 0;

                  return (
                    <Card
                      key={bencana.id}
                      className="disaster-card glass-card overflow-hidden"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${getAlertColor(
                                bencana.tingkat_peringatan
                              )}`}
                            >
                              {React.createElement(
                                getIconByJenisBencana(
                                  bencana.jenis_bencana
                                ) as React.ComponentType<
                                  React.SVGProps<SVGSVGElement>
                                >,
                                {
                                  className: "w-6 h-6 text-white",
                                }
                              )}
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">
                                {bencana.jenis_bencana}
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {bencana.lokasi?.nama_kecamatan}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge
                              className={`
                          ${
                            bencana.status === "AKTIF"
                              ? "bg-red-500"
                              : "bg-green-500"
                          } 
                          text-white border-none`}
                            >
                              {bencana.status}
                            </Badge>
                            <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none">
                              Tingkat {bencana.tingkat_peringatan.toLowerCase()}
                            </Badge>
                            <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none">
                              {totalKorban.toLocaleString()} Terdampak
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-slate-600 dark:text-slate-300">
                            {bencana.deskripsi}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            Terakhir diperbarui:{" "}
                            {new Date(bencana.tanggal_bencana).toLocaleString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button
                            variant="outline"
                            className="text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10"
                            onClick={() =>
                              navigate(`/disaster-monitoring/${bencana.id}`)
                            }
                          >
                            Lihat Detail
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Tidak Ada Data
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                    Tidak ditemukan bencana yang sesuai dengan filter yang
                    dipilih. Silakan coba filter yang berbeda.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10"
                    onClick={() => {
                      setFilters({
                        jenisBencana: "all",
                        status: "all",
                        tingkatPeringatan: "all",
                        kecamatan: "all",
                      });
                      setIsFilterOpen(false);
                    }}
                  >
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>

            {filteredData.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10"
                >
                  Sebelumnya
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        onClick={() => setCurrentPage(pageNum)}
                        className={
                          currentPage === pageNum
                            ? "bg-jawara-blue text-white"
                            : "text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10"
                        }
                      >
                        {pageNum}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10"
                >
                  Selanjutnya
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DisasterMonitoring;
