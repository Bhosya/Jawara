import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import AdminSidebar from "@/components/AdminSidebar";
import { jawaTengahLocations } from "@/data/locations";

interface Disaster {
  id: string;
  name: string;
  location: string;
  regency: string;
  district: string;
  date: string;
  description: string;
  status: string;
}

const DisasterManagement = () => {
  const navigate = useNavigate();
  const [selectedRegency, setSelectedRegency] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [formData, setFormData] = useState<Partial<Disaster>>({
    name: "",
    location: "",
    regency: "",
    district: "",
    date: "",
    description: "",
    status: "Active",
  });
  const [disasters, setDisasters] = useState<Disaster[]>([
    {
      id: "1",
      name: "Banjir Bandang",
      location: "Semarang",
      regency: "Kota Semarang",
      district: "Semarang Barat",
      date: "2024-03-01",
      description: "Banjir bandang akibat curah hujan tinggi",
      status: "Active",
    },
    {
      id: "2",
      name: "Longsor",
      location: "Magelang",
      regency: "Kabupaten Magelang",
      district: "Magelang",
      date: "2024-03-02",
      description: "Longsor di lereng gunung",
      status: "Ongoing",
    },
    {
      id: "3",
      name: "Gempa Bumi",
      location: "Yogyakarta",
      regency: "Kota Yogyakarta",
      district: "Sleman",
      date: "2024-03-03",
      description: "Gempa bumi dengan kekuatan 5.2 SR",
      status: "Resolved",
    },
    {
      id: "4",
      name: "Angin Kencang",
      location: "Solo",
      regency: "Kota Surakarta",
      district: "Surakarta",
      date: "2024-03-04",
      description: "Angin kencang merusak beberapa bangunan",
      status: "Active",
    },
    {
      id: "5",
      name: "Kebakaran Hutan",
      location: "Boyolali",
      regency: "Kabupaten Boyolali",
      district: "Boyolali",
      date: "2024-03-05",
      description: "Kebakaran hutan di area perkebunan",
      status: "Ongoing",
    },
    {
      id: "6",
      name: "Banjir",
      location: "Salatiga",
      regency: "Kabupaten Semarang",
      district: "Salatiga",
      date: "2024-03-06",
      description: "Banjir akibat luapan sungai",
      status: "Resolved",
    },
    {
      id: "7",
      name: "Tanah Longsor",
      location: "Temanggung",
      regency: "Kabupaten Temanggung",
      district: "Temanggung",
      date: "2024-03-07",
      description: "Longsor di area pertanian",
      status: "Active",
    },
    {
      id: "8",
      name: "Angin Puting Beliung",
      location: "Kudus",
      regency: "Kabupaten Kudus",
      district: "Kudus",
      date: "2024-03-08",
      description: "Angin puting beliung merusak pemukiman",
      status: "Resolved",
    },
    {
      id: "9",
      name: "Banjir Rob",
      location: "Demak",
      regency: "Kabupaten Demak",
      district: "Demak",
      date: "2024-03-09",
      description: "Banjir rob di pesisir pantai",
      status: "Ongoing",
    },
    {
      id: "10",
      name: "Kebakaran",
      location: "Pekalongan",
      regency: "Kabupaten Pekalongan",
      district: "Pekalongan",
      date: "2024-03-10",
      description: "Kebakaran di pasar tradisional",
      status: "Active",
    },
    {
      id: "11",
      name: "Gempa Susulan",
      location: "Yogyakarta",
      regency: "Kota Yogyakarta",
      district: "Sleman",
      date: "2024-03-11",
      description: "Gempa susulan dengan kekuatan 4.5 SR",
      status: "Resolved",
    },
    {
      id: "12",
      name: "Banjir Bandang",
      location: "Purworejo",
      regency: "Kabupaten Purworejo",
      district: "Purworejo",
      date: "2024-03-12",
      description: "Banjir bandang akibat hujan deras",
      status: "Ongoing",
    },
    {
      id: "13",
      name: "Longsor",
      location: "Wonosobo",
      regency: "Kabupaten Wonosobo",
      district: "Wonosobo",
      date: "2024-03-13",
      description: "Longsor di area perbukitan",
      status: "Active",
    },
    {
      id: "14",
      name: "Angin Kencang",
      location: "Kendal",
      regency: "Kabupaten Kendal",
      district: "Kendal",
      date: "2024-03-14",
      description: "Angin kencang merusak atap rumah",
      status: "Resolved",
    },
    {
      id: "15",
      name: "Banjir",
      location: "Pati",
      regency: "Kabupaten Pati",
      district: "Pati",
      date: "2024-03-15",
      description: "Banjir akibat luapan sungai",
      status: "Ongoing",
    },
    {
      id: "16",
      name: "Kebakaran Hutan",
      location: "Rembang",
      regency: "Kabupaten Rembang",
      district: "Rembang",
      date: "2024-03-16",
      description: "Kebakaran hutan di area konservasi",
      status: "Active",
    },
    {
      id: "17",
      name: "Gempa Bumi",
      location: "Blora",
      regency: "Kabupaten Blora",
      district: "Blora",
      date: "2024-03-17",
      description: "Gempa bumi dengan kekuatan 4.8 SR",
      status: "Resolved",
    },
    {
      id: "18",
      name: "Banjir Rob",
      location: "Jepara",
      regency: "Kabupaten Jepara",
      district: "Jepara",
      date: "2024-03-18",
      description: "Banjir rob di kawasan pesisir",
      status: "Ongoing",
    },
    {
      id: "19",
      name: "Angin Puting Beliung",
      location: "Grobogan",
      regency: "Kabupaten Grobogan",
      district: "Grobogan",
      date: "2024-03-19",
      description: "Angin puting beliung merusak infrastruktur",
      status: "Active",
    },
    {
      id: "20",
      name: "Longsor",
      location: "Sragen",
      regency: "Kabupaten Sragen",
      district: "Sragen",
      date: "2024-03-20",
      description: "Longsor di area pertambangan",
      status: "Resolved",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(disasters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDisasters = disasters.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDisaster: Disaster = {
      id: String(disasters.length + 1),
      name: formData.name || "",
      location: `${formData.district}, ${formData.regency}`,
      regency: formData.regency || "",
      district: formData.district || "",
      date: formData.date || "",
      description: formData.description || "",
      status: formData.status || "Active",
    };
    setDisasters([...disasters, newDisaster]);
    setIsDialogOpen(false);
    setFormData({
      name: "",
      location: "",
      regency: "",
      district: "",
      date: "",
      description: "",
      status: "Active",
    });
    setSelectedRegency("");
    setSelectedDistrict("");
  };

  const handleEdit = (disaster: Disaster) => {
    setFormData({
      name: disaster.name,
      location: disaster.location,
      regency: disaster.regency,
      district: disaster.district,
      date: disaster.date,
      description: disaster.description,
      status: disaster.status,
    });
    setSelectedRegency(disaster.regency);
    setSelectedDistrict(disaster.district);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data bencana ini?")) {
      setDisasters(disasters.filter((disaster) => disaster.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        <main className="flex-1 py-10 px-6 md:px-12 lg:px-16 bg-transparent">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">
                Kelola Data Bencana
              </h1>
              <p className="text-slate-500">
                Pantau dan kelola seluruh data bencana yang tercatat di sistem
              </p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="h-12 px-6 text-base font-semibold"
            >
              Tambah Bencana
            </Button>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="w-[50px] text-slate-700 font-semibold uppercase tracking-wide">
                      No
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Nama Bencana
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Kabupaten/Kota
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Kecamatan
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Tanggal
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Status
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Deskripsi
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disasters
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((disaster, index) => (
                      <TableRow key={disaster.id}>
                        <TableCell className="text-slate-600">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {disaster.name}
                        </TableCell>
                        <TableCell>{disaster.regency}</TableCell>
                        <TableCell>{disaster.district}</TableCell>
                        <TableCell>{disaster.date}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              disaster.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : disaster.status === "Ongoing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {disaster.status}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {disaster.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(disaster)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(disaster.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Dialog Tambah Bencana */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Data Bencana</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Bencana</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="regency">Kabupaten/Kota</Label>
                  <select
                    id="regency"
                    className="w-full p-2 border rounded-md"
                    value={selectedRegency}
                    onChange={(e) => {
                      setSelectedRegency(e.target.value);
                      setFormData({ ...formData, regency: e.target.value });
                      setSelectedDistrict("");
                      setFormData((prev) => ({ ...prev, district: "" }));
                    }}
                    required
                  >
                    <option value="">Pilih Kabupaten/Kota</option>
                    {Object.keys(jawaTengahLocations).map((regency) => (
                      <option key={regency} value={regency}>
                        {regency}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="district">Kecamatan</Label>
                  <select
                    id="district"
                    className="w-full p-2 border rounded-md"
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setFormData({ ...formData, district: e.target.value });
                    }}
                    required
                    disabled={!selectedRegency}
                  >
                    <option value="">Pilih Kecamatan</option>
                    {selectedRegency &&
                      jawaTengahLocations[selectedRegency].map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="date">Tanggal</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="w-full p-2 border rounded-md"
                    value={formData.status || "Active"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
                <Button type="submit" className="w-full">
                  Simpan
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default DisasterManagement;
