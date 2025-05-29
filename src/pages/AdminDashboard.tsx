import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
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
  BarChart3,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Box,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import AdminSidebar from "@/components/AdminSidebar";
import {
  bencanaApi,
  jumlahKorbanApi,
  kebutuhanApi,
  donasiApi,
} from "@/services/api";
import { Bencana, JumlahKorban, Kebutuhan, Donasi } from "@/types/models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState("disaster");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [timeFilter, setTimeFilter] = useState("weekly");

  // Form states
  const [disasterForm, setDisasterForm] = useState({
    name: "",
    type: "",
    location: "",
    severity: "",
    description: "",
    affected: "",
  });

  const [victimForm, setVictimForm] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    needs: "",
    contact: "",
  });

  const [aidForm, setAidForm] = useState({
    type: "",
    quantity: "",
    priority: "",
    location: "",
    description: "",
  });

  const [disasterStats, setDisasterStats] = useState({
    total: 0,
    active: 0,
    resolved: 0,
    ongoing: 0,
  });
  const [victimStats, setVictimStats] = useState({
    total: 0,
    evacuated: 0,
    missing: 0,
    active: 0,
    deceased: 0,
  });
  const [aidStats, setAidStats] = useState({
    total: 0,
    pending: 0,
    received: 0,
    distributed: 0,
    completed: 0,
  });

  const [bencanaData, setBencanaData] = useState<Bencana[]>([]);
  const [jumlahKorbanData, setJumlahKorbanData] = useState<JumlahKorban[]>([]);
  const [kebutuhanData, setKebutuhanData] = useState<Kebutuhan[]>([]);
  const [donasiData, setDonasiData] = useState<Donasi[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bencana, jumlahKorban, kebutuhan, donasi] = await Promise.all([
          bencanaApi.getAll(),
          jumlahKorbanApi.getAll(),
          kebutuhanApi.getAll(),
          donasiApi.getAll(),
        ]);
        setBencanaData(bencana);
        setJumlahKorbanData(jumlahKorban);
        setKebutuhanData(kebutuhan);
        setDonasiData(donasi);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Process data for charts
  const jenisBencanaData = bencanaData.reduce((acc: any[], curr) => {
    const existing = acc.find((item) => item.name === curr.jenis_bencana);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: curr.jenis_bencana, value: 1 });
    }
    return acc;
  }, []);

  const korbanData = jumlahKorbanData.map((korban) => ({
    name:
      bencanaData.find((b) => b.id === korban.id_bencana)?.jenis_bencana ||
      "Unknown",
    selamat: korban.jumlah_selamat,
    meninggal: korban.jumlah_meninggal,
    hilang: korban.jumlah_hilang,
  }));

  const kebutuhanDataProcessed = kebutuhanData.map((kebutuhan) => ({
    name:
      bencanaData.find((b) => b.id === kebutuhan.id_bencana)?.jenis_bencana ||
      "Unknown",
    makanan: (kebutuhan.jumlah_makanan / kebutuhan.jumlah_max_makanan) * 100,
    obat: (kebutuhan.jumlah_obat / kebutuhan.jumlah_max_obat) * 100,
    pakaian: (kebutuhan.jumlah_pakaian / kebutuhan.jumlah_max_pakaian) * 100,
    airbersih:
      (kebutuhan.jumlah_airbersih / kebutuhan.jumlah_max_airbersih) * 100,
  }));

  const donasiDataProcessed = donasiData.reduce((acc: any[], curr) => {
    const existing = acc.find((item) => item.name === curr.metode_pembayaran);
    if (existing) {
      existing.value += curr.nominal;
    } else {
      acc.push({ name: curr.metode_pembayaran, value: curr.nominal });
    }
    return acc;
  }, []);

  // Process data for additional charts
  const bencanaTrendData = bencanaData
    .reduce((acc: any[], curr) => {
      const month = new Date(curr.tanggal_bencana).toLocaleString("id-ID", {
        month: "short",
      });
      const existing = acc.find((item) => item.month === month);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ month, count: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

  const tingkatPeringatanData = bencanaData.reduce((acc: any[], curr) => {
    const existing = acc.find((item) => item.name === curr.tingkat_peringatan);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: curr.tingkat_peringatan, value: 1 });
    }
    return acc;
  }, []);

  const donasiTrendData = donasiData
    .reduce((acc: any[], curr) => {
      const month = new Date(curr.tanggal_donasi).toLocaleString("id-ID", {
        month: "short",
      });
      const existing = acc.find((item) => item.month === month);
      if (existing) {
        existing.amount += curr.nominal;
      } else {
        acc.push({ month, amount: curr.nominal });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

  const statusBencanaData = bencanaData.reduce((acc: any[], curr) => {
    const existing = acc.find((item) => item.name === curr.status);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: curr.status, value: 1 });
    }
    return acc;
  }, []);

  const kebutuhanPerBencanaData = kebutuhanData.map((kebutuhan) => {
    const bencana = bencanaData.find((b) => b.id === kebutuhan.id_bencana);
    return {
      name: bencana?.jenis_bencana || "Unknown",
      total:
        kebutuhan.jumlah_makanan +
        kebutuhan.jumlah_obat +
        kebutuhan.jumlah_pakaian +
        kebutuhan.jumlah_airbersih,
      max:
        kebutuhan.jumlah_max_makanan +
        kebutuhan.jumlah_max_obat +
        kebutuhan.jumlah_max_pakaian +
        kebutuhan.jumlah_max_airbersih,
    };
  });

  // Add new data processing for donation by disaster type
  const donasiPerBencanaData = donasiData.reduce((acc: any[], curr) => {
    const bencana = bencanaData.find((b) => b.id === curr.id_bencana);
    const bencanaName = bencana?.jenis_bencana || "Unknown";
    const existing = acc.find((item) => item.name === bencanaName);
    if (existing) {
      existing.value += curr.nominal;
    } else {
      acc.push({ name: bencanaName, value: curr.nominal });
    }
    return acc;
  }, []);

  // Add new data processing for needs analysis
  const kebutuhanPerJenisData = kebutuhanData.reduce((acc: any[], curr) => {
    const bencana = bencanaData.find((b) => b.id === curr.id_bencana);
    const bencanaName = bencana?.jenis_bencana || "Unknown";
    const existing = acc.find((item) => item.name === bencanaName);
    if (existing) {
      existing.makanan += curr.jumlah_makanan;
      existing.obat += curr.jumlah_obat;
      existing.pakaian += curr.jumlah_pakaian;
      existing.airbersih += curr.jumlah_airbersih;
    } else {
      acc.push({
        name: bencanaName,
        makanan: curr.jumlah_makanan,
        obat: curr.jumlah_obat,
        pakaian: curr.jumlah_pakaian,
        airbersih: curr.jumlah_airbersih,
      });
    }
    return acc;
  }, []);

  const kebutuhanTrendData = kebutuhanData
    .reduce((acc: any[], curr) => {
      const bencana = bencanaData.find((b) => b.id === curr.id_bencana);
      const month = new Date(
        bencana?.tanggal_bencana || new Date()
      ).toLocaleString("id-ID", { month: "short" });
      const existing = acc.find((item) => item.month === month);
      if (existing) {
        existing.makanan += curr.jumlah_makanan;
        existing.obat += curr.jumlah_obat;
        existing.pakaian += curr.jumlah_pakaian;
        existing.airbersih += curr.jumlah_airbersih;
      } else {
        acc.push({
          month,
          makanan: curr.jumlah_makanan,
          obat: curr.jumlah_obat,
          pakaian: curr.jumlah_pakaian,
          airbersih: curr.jumlah_airbersih,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

  const handleDisasterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle disaster form submission
    console.log("Disaster form submitted:", disasterForm);
    setShowAddModal(false);
  };

  const handleVictimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle victim form submission
    console.log("Victim form submitted:", victimForm);
    setShowAddModal(false);
  };

  const handleAidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle aid form submission
    console.log("Aid form submitted:", aidForm);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        <main className="flex-1 py-10 px-6 md:px-12 lg:px-16 bg-transparent">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="korban">Korban</TabsTrigger>
              <TabsTrigger value="kebutuhan">Kebutuhan</TabsTrigger>
              <TabsTrigger value="donasi">Donasi</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Bencana
                    </CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {bencanaData.length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Korban
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {jumlahKorbanData.reduce(
                        (acc, curr) =>
                          acc +
                          curr.jumlah_selamat +
                          curr.jumlah_meninggal +
                          curr.jumlah_hilang,
                        0
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Relawan
                    </CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {bencanaData.reduce(
                        (acc, curr) => acc + curr.relawan.length,
                        0
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Donasi
                    </CardTitle>
                    <Box className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      Rp{" "}
                      {donasiData
                        .reduce((acc, curr) => acc + curr.nominal, 0)
                        .toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Distribusi Jenis Bencana</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={jenisBencanaData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {jenisBencanaData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Statistik Korban</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={korbanData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="selamat" name="Selamat" fill="#00C49F" />
                        <Bar
                          dataKey="meninggal"
                          name="Meninggal"
                          fill="#FF8042"
                        />
                        <Bar dataKey="hilang" name="Hilang" fill="#FFBB28" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tren Bencana per Bulan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={bencanaTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#8884d8"
                          name="Jumlah Bencana"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Distribusi Tingkat Peringatan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={tingkatPeringatanData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {tingkatPeringatanData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="korban" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Detail Statistik Korban</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={korbanData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="selamat" name="Selamat" fill="#00C49F" />
                      <Bar
                        dataKey="meninggal"
                        name="Meninggal"
                        fill="#FF8042"
                      />
                      <Bar dataKey="hilang" name="Hilang" fill="#FFBB28" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Status Bencana</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={statusBencanaData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statusBencanaData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Kebutuhan per Bencana</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={kebutuhanPerBencanaData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="total"
                          name="Kebutuhan Saat Ini"
                          fill="#8884d8"
                        />
                        <Bar
                          dataKey="max"
                          name="Kapasitas Maksimum"
                          fill="#82ca9d"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="kebutuhan" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Status Pemenuhan Kebutuhan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={kebutuhanDataProcessed}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="makanan" name="Makanan" fill="#0088FE" />
                      <Bar dataKey="obat" name="Obat" fill="#00C49F" />
                      <Bar dataKey="pakaian" name="Pakaian" fill="#FFBB28" />
                      <Bar
                        dataKey="airbersih"
                        name="Air Bersih"
                        fill="#FF8042"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Distribusi Kebutuhan per Jenis Bencana
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={kebutuhanPerJenisData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="makanan" name="Makanan" fill="#0088FE" />
                        <Bar dataKey="obat" name="Obat" fill="#00C49F" />
                        <Bar dataKey="pakaian" name="Pakaian" fill="#FFBB28" />
                        <Bar
                          dataKey="airbersih"
                          name="Air Bersih"
                          fill="#FF8042"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tren Kebutuhan per Bulan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={kebutuhanTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="makanan"
                          name="Makanan"
                          stroke="#0088FE"
                        />
                        <Line
                          type="monotone"
                          dataKey="obat"
                          name="Obat"
                          stroke="#00C49F"
                        />
                        <Line
                          type="monotone"
                          dataKey="pakaian"
                          name="Pakaian"
                          stroke="#FFBB28"
                        />
                        <Line
                          type="monotone"
                          dataKey="airbersih"
                          name="Air Bersih"
                          stroke="#FF8042"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="donasi" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Metode Pembayaran Donasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={donasiDataProcessed}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {donasiDataProcessed.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `Rp ${Number(value).toLocaleString()}`,
                          "Jumlah Donasi",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tren Donasi per Bulan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={donasiTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis
                          tickFormatter={(value) =>
                            `Rp ${(value / 1000000).toFixed(1)}M`
                          }
                        />
                        <Tooltip
                          formatter={(value) => [
                            `Rp ${Number(value).toLocaleString()}`,
                            "Jumlah Donasi",
                          ]}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#8884d8"
                          name="Total Donasi"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Distribusi Donasi per Jenis Bencana</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={donasiPerBencanaData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                          tickFormatter={(value) =>
                            `Rp ${(value / 1000000).toFixed(1)}M`
                          }
                        />
                        <Tooltip
                          formatter={(value) => [
                            `Rp ${Number(value).toLocaleString()}`,
                            "Total Donasi",
                          ]}
                        />
                        <Legend />
                        <Bar
                          dataKey="value"
                          name="Total Donasi"
                          fill="#8884d8"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
