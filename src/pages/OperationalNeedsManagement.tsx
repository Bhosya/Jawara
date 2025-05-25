import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";

interface OperationalNeed {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: string;
  notes: string;
}

const OperationalNeedsManagement = () => {
  const [needs, setNeeds] = useState<OperationalNeed[]>([
    {
      id: "1",
      name: "Tenda Darurat",
      category: "Perlengkapan",
      quantity: 10,
      unit: "unit",
      status: "Urgent",
      notes: "Untuk pengungsi baru",
    },
    {
      id: "2",
      name: "Masker",
      category: "Kesehatan",
      quantity: 500,
      unit: "pcs",
      status: "High",
      notes: "Distribusi harian",
    },
    {
      id: "3",
      name: "Air Bersih",
      category: "Logistik",
      quantity: 2000,
      unit: "liter",
      status: "Medium",
      notes: "Cadangan",
    },
    {
      id: "4",
      name: "Obat-obatan",
      category: "Kesehatan",
      quantity: 100,
      unit: "paket",
      status: "Urgent",
      notes: "Stok menipis",
    },
    {
      id: "5",
      name: "Selimut",
      category: "Perlengkapan",
      quantity: 150,
      unit: "pcs",
      status: "Medium",
      notes: "",
    },
    {
      id: "6",
      name: "Beras",
      category: "Logistik",
      quantity: 500,
      unit: "kg",
      status: "High",
      notes: "",
    },
    {
      id: "7",
      name: "Mie Instan",
      category: "Logistik",
      quantity: 1000,
      unit: "pcs",
      status: "Medium",
      notes: "",
    },
    {
      id: "8",
      name: "Susu Bubuk",
      category: "Logistik",
      quantity: 200,
      unit: "paket",
      status: "High",
      notes: "",
    },
    {
      id: "9",
      name: "Hand Sanitizer",
      category: "Kesehatan",
      quantity: 100,
      unit: "botol",
      status: "Urgent",
      notes: "",
    },
    {
      id: "10",
      name: "Lampu Emergency",
      category: "Perlengkapan",
      quantity: 20,
      unit: "unit",
      status: "Medium",
      notes: "",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<OperationalNeed>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(needs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNeeds = needs.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNeed: OperationalNeed = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || "",
      category: formData.category || "",
      quantity: Number(formData.quantity) || 0,
      unit: formData.unit || "",
      status: formData.status || "Medium",
      notes: formData.notes || "",
    };
    setNeeds([...needs, newNeed]);
    setIsDialogOpen(false);
    setFormData({});
  };
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        <main className="flex-1 py-10 px-6 md:px-12 lg:px-16 bg-transparent">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">
                Kelola Kebutuhan Operasional
              </h1>
              <p className="text-slate-500">
                Pantau dan kelola seluruh kebutuhan operasional penanganan
                bencana
              </p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="h-12 px-6 text-base font-semibold"
            >
              Tambah Kebutuhan
            </Button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="w-[50px] text-slate-700 font-semibold uppercase tracking-wide">
                      No
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Nama Kebutuhan
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Kategori
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Jumlah
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Satuan
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
                  {currentNeeds.map((need, index) => (
                    <TableRow key={need.id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{need.name}</TableCell>
                      <TableCell>{need.category}</TableCell>
                      <TableCell>{need.quantity}</TableCell>
                      <TableCell>{need.unit}</TableCell>
                      <TableCell>
                        <Badge
                          className={`
                            ${
                              need.status === "Urgent"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : need.status === "High"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            } 
                            border-none font-medium`}
                        >
                          {need.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{need.notes}</TableCell>
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Kebutuhan Operasional</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Kebutuhan</Label>
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
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    value={formData.category || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
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
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="w-full p-2 border rounded-md"
                    value={formData.status || "Medium"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    required
                  >
                    <option value="Urgent" className="text-red-700">
                      Urgent
                    </option>
                    <option value="High" className="text-amber-700">
                      High
                    </option>
                    <option value="Medium" className="text-blue-700">
                      Medium
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

export default OperationalNeedsManagement;
