import React, { useState } from "react";
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for statistics
const statsData = [
  {
    label: "Total Bencana",
    value: 12,
    change: "+2",
    trend: "up",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    label: "Korban Terdampak",
    value: 3456,
    change: "-120",
    trend: "down",
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Total Bantuan",
    value: 2345,
    change: "+450",
    trend: "up",
    icon: Package,
    color: "text-green-500",
  },
  {
    label: "Relawan Aktif",
    value: 325,
    change: "+25",
    trend: "up",
    icon: HandHelping,
    color: "text-amber-500",
  },
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "Bantuan",
    description: "Distribusi bantuan makanan di Semarang",
    location: "Semarang",
    timestamp: "2 jam yang lalu",
    status: "Selesai",
    icon: Package,
    color: "bg-green-500",
  },
  {
    id: 2,
    type: "Evakuasi",
    description: "Evakuasi korban banjir di Magelang",
    location: "Magelang",
    timestamp: "3 jam yang lalu",
    status: "Berlangsung",
    icon: Shield,
    color: "bg-blue-500",
  },
  {
    id: 3,
    type: "Peringatan",
    description: "Peringatan dini longsor di Temanggung",
    location: "Temanggung",
    timestamp: "5 jam yang lalu",
    status: "Aktif",
    icon: Bell,
    color: "bg-red-500",
  },
];

// Mock data for resource distribution
const resourceData = [
  {
    item: "Makanan",
    total: 1000,
    distributed: 750,
    remaining: 250,
    priority: "High",
    color: "bg-green-500",
  },
  {
    item: "Air Bersih",
    total: 2000,
    distributed: 1500,
    remaining: 500,
    priority: "High",
    color: "bg-blue-500",
  },
  {
    item: "Obat-obatan",
    total: 500,
    distributed: 300,
    remaining: 200,
    priority: "Medium",
    color: "bg-amber-500",
  },
  {
    item: "Selimut",
    total: 800,
    distributed: 600,
    remaining: 200,
    priority: "Medium",
    color: "bg-purple-500",
  },
];

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState("disaster");

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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header Section */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Dashboard Admin
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Pantau dan kelola semua aktivitas penanganan bencana
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Hari Ini</span>
                </Button>
                <Button
                  className="flex items-center gap-2"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Data</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-6 md:py-10 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}
                      >
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <Badge
                        className={`${
                          stat.trend === "up" ? "bg-green-500" : "bg-red-500"
                        } text-white`}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activities and Resource Distribution */}
        <section className="py-6 md:py-10 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Aktivitas Terbaru</h2>
                  <Button variant="outline" size="sm">
                    Lihat Semua
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <Card key={activity.id} className="border-none shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}
                          >
                            <activity.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium">{activity.type}</h3>
                              <Badge
                                className={
                                  activity.status === "Selesai"
                                    ? "bg-green-500"
                                    : activity.status === "Berlangsung"
                                    ? "bg-blue-500"
                                    : "bg-red-500"
                                }
                              >
                                {activity.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <MapPin className="w-3 h-3" />
                              <span>{activity.location}</span>
                              <span>•</span>
                              <span>{activity.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Resource Distribution */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Distribusi Sumber Daya
                  </h2>
                  <Button variant="outline" size="sm">
                    Lihat Detail
                  </Button>
                </div>
                <div className="space-y-4">
                  {resourceData.map((resource, index) => (
                    <Card key={index} className="border-none shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{resource.item}</h3>
                          <Badge
                            className={
                              resource.priority === "High"
                                ? "bg-red-500"
                                : "bg-amber-500"
                            }
                          >
                            {resource.priority}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total: {resource.total}</span>
                            <span>Tersisa: {resource.remaining}</span>
                          </div>
                          <Progress
                            value={
                              (resource.distributed / resource.total) * 100
                            }
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>Terdistribusi: {resource.distributed}</span>
                            <span>
                              {Math.round(
                                (resource.distributed / resource.total) * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Management Section */}
        <section className="py-6 md:py-10 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold">Manajemen Data</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Cari data..."
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
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Data Bencana
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Kelola data bencana, peringatan dini, dan status penanganan
                  </p>
                  <Button className="w-full">Kelola Data</Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Data Korban
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Kelola data korban terdampak dan kebutuhan bantuan
                  </p>
                  <Button className="w-full">Kelola Data</Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-500" />
                    Data Bantuan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Kelola data bantuan, distribusi, dan inventori
                  </p>
                  <Button className="w-full">Kelola Data</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Add Data Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Tambah Data Baru</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddModal(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Data Type Selector */}
                <div className="flex gap-2 mb-6">
                  <Button
                    variant={
                      selectedDataType === "disaster" ? "default" : "outline"
                    }
                    onClick={() => setSelectedDataType("disaster")}
                    className="flex-1"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Data Bencana
                  </Button>
                  <Button
                    variant={
                      selectedDataType === "victim" ? "default" : "outline"
                    }
                    onClick={() => setSelectedDataType("victim")}
                    className="flex-1"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Data Korban
                  </Button>
                  <Button
                    variant={selectedDataType === "aid" ? "default" : "outline"}
                    onClick={() => setSelectedDataType("aid")}
                    className="flex-1"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Data Bantuan
                  </Button>
                </div>

                {/* Disaster Form */}
                {selectedDataType === "disaster" && (
                  <form onSubmit={handleDisasterSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Nama Bencana
                        </label>
                        <Input
                          placeholder="Contoh: Banjir Bandang"
                          value={disasterForm.name}
                          onChange={(e) =>
                            setDisasterForm({
                              ...disasterForm,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Tipe Bencana
                        </label>
                        <Select
                          value={disasterForm.type}
                          onValueChange={(value) =>
                            setDisasterForm({ ...disasterForm, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe bencana" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flood">Banjir</SelectItem>
                            <SelectItem value="landslide">Longsor</SelectItem>
                            <SelectItem value="earthquake">
                              Gempa Bumi
                            </SelectItem>
                            <SelectItem value="volcano">
                              Gunung Berapi
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lokasi</label>
                      <Input
                        placeholder="Contoh: Semarang, Jawa Tengah"
                        value={disasterForm.location}
                        onChange={(e) =>
                          setDisasterForm({
                            ...disasterForm,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Tingkat Keparahan
                        </label>
                        <Select
                          value={disasterForm.severity}
                          onValueChange={(value) =>
                            setDisasterForm({
                              ...disasterForm,
                              severity: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tingkat keparahan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Rendah</SelectItem>
                            <SelectItem value="medium">Sedang</SelectItem>
                            <SelectItem value="high">Tinggi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Jumlah Terdampak
                        </label>
                        <Input
                          type="number"
                          placeholder="Contoh: 1000"
                          value={disasterForm.affected}
                          onChange={(e) =>
                            setDisasterForm({
                              ...disasterForm,
                              affected: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Deskripsi</label>
                      <Textarea
                        placeholder="Deskripsikan detail bencana..."
                        value={disasterForm.description}
                        onChange={(e) =>
                          setDisasterForm({
                            ...disasterForm,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddModal(false)}
                      >
                        Batal
                      </Button>
                      <Button type="submit">Simpan Data</Button>
                    </div>
                  </form>
                )}

                {/* Victim Form */}
                {selectedDataType === "victim" && (
                  <form onSubmit={handleVictimSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Nama Lengkap
                        </label>
                        <Input
                          placeholder="Masukkan nama lengkap"
                          value={victimForm.name}
                          onChange={(e) =>
                            setVictimForm({
                              ...victimForm,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Usia</label>
                        <Input
                          type="number"
                          placeholder="Masukkan usia"
                          value={victimForm.age}
                          onChange={(e) =>
                            setVictimForm({
                              ...victimForm,
                              age: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Jenis Kelamin
                        </label>
                        <Select
                          value={victimForm.gender}
                          onValueChange={(value) =>
                            setVictimForm({ ...victimForm, gender: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Laki-laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Kontak</label>
                        <Input
                          placeholder="Nomor telepon"
                          value={victimForm.contact}
                          onChange={(e) =>
                            setVictimForm({
                              ...victimForm,
                              contact: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lokasi</label>
                      <Input
                        placeholder="Alamat lengkap"
                        value={victimForm.location}
                        onChange={(e) =>
                          setVictimForm({
                            ...victimForm,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Kebutuhan</label>
                      <Textarea
                        placeholder="Deskripsikan kebutuhan bantuan..."
                        value={victimForm.needs}
                        onChange={(e) =>
                          setVictimForm({
                            ...victimForm,
                            needs: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddModal(false)}
                      >
                        Batal
                      </Button>
                      <Button type="submit">Simpan Data</Button>
                    </div>
                  </form>
                )}

                {/* Aid Form */}
                {selectedDataType === "aid" && (
                  <form onSubmit={handleAidSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Jenis Bantuan
                        </label>
                        <Select
                          value={aidForm.type}
                          onValueChange={(value) =>
                            setAidForm({ ...aidForm, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis bantuan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="food">Makanan</SelectItem>
                            <SelectItem value="water">Air Bersih</SelectItem>
                            <SelectItem value="medicine">
                              Obat-obatan
                            </SelectItem>
                            <SelectItem value="clothing">Pakaian</SelectItem>
                            <SelectItem value="shelter">Tenda</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Jumlah</label>
                        <Input
                          type="number"
                          placeholder="Masukkan jumlah"
                          value={aidForm.quantity}
                          onChange={(e) =>
                            setAidForm({ ...aidForm, quantity: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Prioritas</label>
                        <Select
                          value={aidForm.priority}
                          onValueChange={(value) =>
                            setAidForm({ ...aidForm, priority: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih prioritas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">Tinggi</SelectItem>
                            <SelectItem value="medium">Sedang</SelectItem>
                            <SelectItem value="low">Rendah</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Lokasi Distribusi
                        </label>
                        <Input
                          placeholder="Lokasi pengiriman bantuan"
                          value={aidForm.location}
                          onChange={(e) =>
                            setAidForm({ ...aidForm, location: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Deskripsi</label>
                      <Textarea
                        placeholder="Deskripsikan detail bantuan..."
                        value={aidForm.description}
                        onChange={(e) =>
                          setAidForm({
                            ...aidForm,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddModal(false)}
                      >
                        Batal
                      </Button>
                      <Button type="submit">Simpan Data</Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
