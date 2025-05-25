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
import { Badge } from "@/components/ui/badge";

interface Aid {
  id: string;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  disasterId: string;
  donor: string;
  status: string;
  notes: string;
}

const AidManagement = () => {
  const navigate = useNavigate();
  const [aids, setAids] = useState<Aid[]>([
    {
      id: "1",
      name: "Bantuan Makanan Pokok",
      type: "Makanan",
      quantity: 100,
      unit: "Paket",
      disasterId: "1",
      donor: "PT Sejahtera",
      status: "Pending",
      notes: "Akan dikirim dalam 2 hari",
    },
    {
      id: "2",
      name: "Selimut",
      type: "Pakaian",
      quantity: 50,
      unit: "Buah",
      disasterId: "2",
      donor: "Yayasan Peduli",
      status: "Received",
      notes: "Sudah diterima di posko",
    },
    {
      id: "3",
      name: "Air Mineral",
      type: "Minuman",
      quantity: 200,
      unit: "Kardus",
      disasterId: "3",
      donor: "PT Aqua",
      status: "Distributed",
      notes: "Sudah didistribusikan ke pengungsi",
    },
    {
      id: "4",
      name: "Obat-obatan",
      type: "Kesehatan",
      quantity: 30,
      unit: "Paket",
      disasterId: "4",
      donor: "RS Medika",
      status: "Pending",
      notes: "Dalam proses pengiriman",
    },
    {
      id: "5",
      name: "Tenda Pengungsian",
      type: "Shelter",
      quantity: 10,
      unit: "Unit",
      disasterId: "5",
      donor: "PMI",
      status: "Received",
      notes: "Sudah dipasang di lokasi",
    },
    {
      id: "6",
      name: "Pakaian Layak Pakai",
      type: "Pakaian",
      quantity: 150,
      unit: "Paket",
      disasterId: "6",
      donor: "Komunitas Peduli",
      status: "Distributed",
      notes: "Sudah didistribusikan",
    },
    {
      id: "7",
      name: "Makanan Instan",
      type: "Makanan",
      quantity: 300,
      unit: "Paket",
      disasterId: "7",
      donor: "PT Indofood",
      status: "Pending",
      notes: "Akan dikirim minggu depan",
    },
    {
      id: "8",
      name: "Alat Masak",
      type: "Perlengkapan",
      quantity: 20,
      unit: "Set",
      disasterId: "8",
      donor: "Yayasan Bantuan",
      status: "Received",
      notes: "Sudah diterima di posko",
    },
    {
      id: "9",
      name: "Air Bersih",
      type: "Minuman",
      quantity: 1000,
      unit: "Liter",
      disasterId: "9",
      donor: "PDAM",
      status: "Distributed",
      notes: "Sudah didistribusikan",
    },
    {
      id: "10",
      name: "Obat-obatan",
      type: "Kesehatan",
      quantity: 25,
      unit: "Paket",
      disasterId: "10",
      donor: "Klinik Sehat",
      status: "Pending",
      notes: "Dalam proses pengiriman",
    },
    {
      id: "11",
      name: "Selimut",
      type: "Pakaian",
      quantity: 75,
      unit: "Buah",
      disasterId: "11",
      donor: "PT Tekstil",
      status: "Received",
      notes: "Sudah diterima di posko",
    },
    {
      id: "12",
      name: "Makanan Pokok",
      type: "Makanan",
      quantity: 150,
      unit: "Paket",
      disasterId: "12",
      donor: "PT Sumber Pangan",
      status: "Distributed",
      notes: "Sudah didistribusikan",
    },
    {
      id: "13",
      name: "Tenda Pengungsian",
      type: "Shelter",
      quantity: 5,
      unit: "Unit",
      disasterId: "13",
      donor: "Badan Nasional Penanggulangan Bencana",
      status: "Pending",
      notes: "Akan dikirim dalam 3 hari",
    },
    {
      id: "14",
      name: "Air Mineral",
      type: "Minuman",
      quantity: 150,
      unit: "Kardus",
      disasterId: "14",
      donor: "PT Tirta",
      status: "Received",
      notes: "Sudah diterima di posko",
    },
    {
      id: "15",
      name: "Pakaian Layak Pakai",
      type: "Pakaian",
      quantity: 100,
      unit: "Paket",
      disasterId: "15",
      donor: "Komunitas Peduli",
      status: "Distributed",
      notes: "Sudah didistribusikan",
    },
    {
      id: "16",
      name: "Obat-obatan",
      type: "Kesehatan",
      quantity: 20,
      unit: "Paket",
      disasterId: "16",
      donor: "RS Sejahtera",
      status: "Pending",
      notes: "Dalam proses pengiriman",
    },
    {
      id: "17",
      name: "Alat Masak",
      type: "Perlengkapan",
      quantity: 15,
      unit: "Set",
      disasterId: "17",
      donor: "Yayasan Bantuan",
      status: "Received",
      notes: "Sudah diterima di posko",
    },
    {
      id: "18",
      name: "Makanan Instan",
      type: "Makanan",
      quantity: 200,
      unit: "Paket",
      disasterId: "18",
      donor: "PT Indofood",
      status: "Distributed",
      notes: "Sudah didistribusikan",
    },
    {
      id: "19",
      name: "Air Bersih",
      type: "Minuman",
      quantity: 800,
      unit: "Liter",
      disasterId: "19",
      donor: "PDAM",
      status: "Pending",
      notes: "Akan dikirim besok",
    },
    {
      id: "20",
      name: "Selimut",
      type: "Pakaian",
      quantity: 60,
      unit: "Buah",
      disasterId: "20",
      donor: "PT Tekstil",
      status: "Received",
      notes: "Sudah diterima di posko",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Aid>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(aids.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAids = aids.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAid: Aid = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || "",
      type: formData.type || "",
      quantity: Number(formData.quantity) || 0,
      unit: formData.unit || "",
      disasterId: formData.disasterId || "",
      donor: formData.donor || "",
      status: formData.status || "Pending",
      notes: formData.notes || "",
    };
    setAids([...aids, newAid]);
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
                Kelola Data Bantuan
              </h1>
              <p className="text-slate-500">
                Pantau dan kelola seluruh data bantuan dan distribusi
              </p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="h-12 px-6 text-base font-semibold"
            >
              Tambah Bantuan
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
                      Nama Bantuan
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Jenis
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Jumlah
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Satuan
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      ID Bencana
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Donatur
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
                  {currentAids.map((aid, index) => (
                    <TableRow key={aid.id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{aid.name}</TableCell>
                      <TableCell>{aid.type}</TableCell>
                      <TableCell>{aid.quantity}</TableCell>
                      <TableCell>{aid.unit}</TableCell>
                      <TableCell>{aid.disasterId}</TableCell>
                      <TableCell>{aid.donor}</TableCell>
                      <TableCell>
                        <Badge
                          className={`
                            ${
                              aid.status === "Pending"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                : aid.status === "Received"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : aid.status === "Distributed"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400"
                            } 
                            border-none font-medium`}
                        >
                          {aid.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{aid.notes}</TableCell>
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

          {/* Dialog Tambah Bantuan */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Data Bantuan</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Bantuan</Label>
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
                  <Label htmlFor="type">Jenis Bantuan</Label>
                  <select
                    id="type"
                    className="w-full p-2 border rounded-md"
                    value={formData.type || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    required
                  >
                    <option value="">Pilih Jenis Bantuan</option>
                    <option value="Makanan">Makanan</option>
                    <option value="Pakaian">Pakaian</option>
                    <option value="Obat-obatan">Obat-obatan</option>
                    <option value="Tenda">Tenda</option>
                    <option value="Uang">Uang</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Jumlah</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quantity: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Satuan</Label>
                    <Input
                      id="unit"
                      value={formData.unit || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, unit: e.target.value })
                      }
                      required
                    />
                  </div>
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
                  <Label htmlFor="donor">Donatur</Label>
                  <Input
                    id="donor"
                    value={formData.donor || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, donor: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="w-full p-2 border rounded-md"
                    value={formData.status || "Pending"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    required
                  >
                    <option value="Pending" className="text-amber-700">
                      Pending
                    </option>
                    <option value="Received" className="text-blue-700">
                      Received
                    </option>
                    <option value="Distributed" className="text-green-700">
                      Distributed
                    </option>
                    <option value="Completed" className="text-slate-700">
                      Completed
                    </option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="notes">Catatan</Label>
                  <Textarea
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

export default AidManagement;
