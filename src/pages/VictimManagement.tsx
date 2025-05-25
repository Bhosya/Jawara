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
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import AdminSidebar from "@/components/AdminSidebar";
import { Badge } from "@/components/ui/badge";

interface Victim {
  id: string;
  name: string;
  age: number;
  gender: string;
  address: string;
  disasterId: string;
  status: string;
  notes: string;
}

const VictimManagement = () => {
  const navigate = useNavigate();
  const [victims, setVictims] = useState<Victim[]>([
    {
      id: "1",
      name: "Budi Santoso",
      age: 35,
      gender: "Laki-laki",
      address: "Jl. Merdeka No. 123, Semarang",
      disasterId: "1",
      status: "Active",
      notes: "Membutuhkan bantuan makanan",
    },
    {
      id: "2",
      name: "Siti Aminah",
      age: 28,
      gender: "Perempuan",
      address: "Jl. Sudirman No. 45, Magelang",
      disasterId: "2",
      status: "Evacuated",
      notes: "Sudah di evakuasi ke posko",
    },
    {
      id: "3",
      name: "Ahmad Rizki",
      age: 42,
      gender: "Laki-laki",
      address: "Jl. Pahlawan No. 67, Yogyakarta",
      disasterId: "3",
      status: "Missing",
      notes: "Terakhir terlihat di area bencana",
    },
    {
      id: "4",
      name: "Dewi Putri",
      age: 25,
      gender: "Perempuan",
      address: "Jl. Veteran No. 89, Solo",
      disasterId: "4",
      status: "Active",
      notes: "Membutuhkan bantuan medis",
    },
    {
      id: "5",
      name: "Rudi Hartono",
      age: 50,
      gender: "Laki-laki",
      address: "Jl. Diponegoro No. 12, Boyolali",
      disasterId: "5",
      status: "Evacuated",
      notes: "Sudah di evakuasi ke rumah sakit",
    },
    {
      id: "6",
      name: "Maya Sari",
      age: 31,
      gender: "Perempuan",
      address: "Jl. Gatot Subroto No. 34, Salatiga",
      disasterId: "6",
      status: "Active",
      notes: "Membutuhkan bantuan pakaian",
    },
    {
      id: "7",
      name: "Joko Widodo",
      age: 45,
      gender: "Laki-laki",
      address: "Jl. Ahmad Yani No. 56, Temanggung",
      disasterId: "7",
      status: "Missing",
      notes: "Pencarian masih dilakukan",
    },
    {
      id: "8",
      name: "Nina Wijaya",
      age: 29,
      gender: "Perempuan",
      address: "Jl. Pemuda No. 78, Kudus",
      disasterId: "8",
      status: "Evacuated",
      notes: "Sudah di evakuasi ke tenda pengungsian",
    },
    {
      id: "9",
      name: "Agus Setiawan",
      age: 38,
      gender: "Laki-laki",
      address: "Jl. Veteran No. 90, Demak",
      disasterId: "9",
      status: "Active",
      notes: "Membutuhkan bantuan air bersih",
    },
    {
      id: "10",
      name: "Rina Fitriani",
      age: 27,
      gender: "Perempuan",
      address: "Jl. Sudirman No. 23, Pekalongan",
      disasterId: "10",
      status: "Evacuated",
      notes: "Sudah di evakuasi ke posko",
    },
    {
      id: "11",
      name: "Dedi Kurniawan",
      age: 33,
      gender: "Laki-laki",
      address: "Jl. Merdeka No. 45, Yogyakarta",
      disasterId: "11",
      status: "Active",
      notes: "Membutuhkan bantuan makanan",
    },
    {
      id: "12",
      name: "Lina Wijaya",
      age: 24,
      gender: "Perempuan",
      address: "Jl. Pahlawan No. 67, Purworejo",
      disasterId: "12",
      status: "Missing",
      notes: "Pencarian masih dilakukan",
    },
    {
      id: "13",
      name: "Hadi Susanto",
      age: 41,
      gender: "Laki-laki",
      address: "Jl. Veteran No. 89, Wonosobo",
      disasterId: "13",
      status: "Evacuated",
      notes: "Sudah di evakuasi ke rumah sakit",
    },
    {
      id: "14",
      name: "Siti Nurhaliza",
      age: 26,
      gender: "Perempuan",
      address: "Jl. Diponegoro No. 12, Kendal",
      disasterId: "14",
      status: "Active",
      notes: "Membutuhkan bantuan medis",
    },
    {
      id: "15",
      name: "Bambang Sutrisno",
      age: 48,
      gender: "Laki-laki",
      address: "Jl. Gatot Subroto No. 34, Pati",
      disasterId: "15",
      status: "Evacuated",
      notes: "Sudah di evakuasi ke tenda pengungsian",
    },
    {
      id: "16",
      name: "Diana Putri",
      age: 30,
      gender: "Perempuan",
      address: "Jl. Ahmad Yani No. 56, Rembang",
      disasterId: "16",
      status: "Active",
      notes: "Membutuhkan bantuan pakaian",
    },
    {
      id: "17",
      name: "Eko Prasetyo",
      age: 36,
      gender: "Laki-laki",
      address: "Jl. Pemuda No. 78, Blora",
      disasterId: "17",
      status: "Missing",
      notes: "Pencarian masih dilakukan",
    },
    {
      id: "18",
      name: "Fitri Handayani",
      age: 23,
      gender: "Perempuan",
      address: "Jl. Veteran No. 90, Jepara",
      disasterId: "18",
      status: "Evacuated",
      notes: "Sudah di evakuasi ke posko",
    },
    {
      id: "19",
      name: "Gunawan Wibowo",
      age: 44,
      gender: "Laki-laki",
      address: "Jl. Sudirman No. 23, Grobogan",
      disasterId: "19",
      status: "Active",
      notes: "Membutuhkan bantuan air bersih",
    },
    {
      id: "20",
      name: "Hani Safitri",
      age: 32,
      gender: "Perempuan",
      address: "Jl. Merdeka No. 45, Sragen",
      disasterId: "20",
      status: "Evacuated",
      notes: "Sudah di evakuasi ke rumah sakit",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Victim>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(victims.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVictims = victims.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVictim: Victim = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || "",
      age: Number(formData.age) || 0,
      gender: formData.gender || "",
      address: formData.address || "",
      disasterId: formData.disasterId || "",
      status: formData.status || "Active",
      notes: formData.notes || "",
    };
    setVictims([...victims, newVictim]);
    setIsDialogOpen(false);
    setFormData({});
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
                Kelola Data Korban
              </h1>
              <p className="text-slate-500">
                Pantau dan kelola seluruh data korban terdampak bencana
              </p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="h-12 px-6 text-base font-semibold"
            >
              Tambah Korban
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
                      Nama
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Usia
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Jenis Kelamin
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Alamat
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      ID Bencana
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Status
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Catatan
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentVictims.map((victim, index) => (
                    <TableRow key={victim.id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{victim.name}</TableCell>
                      <TableCell>{victim.age}</TableCell>
                      <TableCell>{victim.gender}</TableCell>
                      <TableCell>{victim.address}</TableCell>
                      <TableCell>{victim.disasterId}</TableCell>
                      <TableCell>
                        <Badge
                          className={`
                            ${
                              victim.status === "Active"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : victim.status === "Evacuated"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : victim.status === "Missing"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400"
                            } 
                            border-none font-medium`}
                        >
                          {victim.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{victim.notes}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
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

          {/* Dialog Tambah Korban */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Data Korban</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
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
                  <Label htmlFor="age">Usia</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        age: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Jenis Kelamin</Label>
                  <select
                    id="gender"
                    className="w-full p-2 border rounded-md"
                    value={formData.gender || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="address">Alamat</Label>
                  <Input
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="disasterId">ID Bencana</Label>
                  <Input
                    id="disasterId"
                    value={formData.disasterId || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, disasterId: e.target.value })
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
                    <option value="Active" className="text-red-700">
                      Active
                    </option>
                    <option value="Evacuated" className="text-green-700">
                      Evacuated
                    </option>
                    <option value="Missing" className="text-amber-700">
                      Missing
                    </option>
                    <option value="Deceased" className="text-slate-700">
                      Deceased
                    </option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="notes">Catatan</Label>
                  <Input
                    id="notes"
                    value={formData.notes || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
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

export default VictimManagement;
