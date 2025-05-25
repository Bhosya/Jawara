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

interface Volunteer {
  id: string;
  name: string;
  contact: string;
  skill: string;
  status: string;
  notes: string;
}

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: "1",
      name: "Andi Wijaya",
      contact: "081234567890",
      skill: "Medis",
      status: "Aktif",
      notes: "Siap tugas lapangan",
    },
    {
      id: "2",
      name: "Budi Santoso",
      contact: "081234567891",
      skill: "Logistik",
      status: "Aktif",
      notes: "Koordinator logistik",
    },
    {
      id: "3",
      name: "Citra Dewi",
      contact: "081234567892",
      skill: "Psikososial",
      status: "Nonaktif",
      notes: "Cuti",
    },
    {
      id: "4",
      name: "Dewi Lestari",
      contact: "081234567893",
      skill: "Medis",
      status: "Aktif",
      notes: "",
    },
    {
      id: "5",
      name: "Eko Prasetyo",
      contact: "081234567894",
      skill: "Evakuasi",
      status: "Aktif",
      notes: "",
    },
    {
      id: "6",
      name: "Fajar Nugroho",
      contact: "081234567895",
      skill: "Logistik",
      status: "Nonaktif",
      notes: "",
    },
    {
      id: "7",
      name: "Gita Sari",
      contact: "081234567896",
      skill: "Medis",
      status: "Aktif",
      notes: "",
    },
    {
      id: "8",
      name: "Hadi Saputra",
      contact: "081234567897",
      skill: "Evakuasi",
      status: "Aktif",
      notes: "",
    },
    {
      id: "9",
      name: "Indah Permata",
      contact: "081234567898",
      skill: "Psikososial",
      status: "Aktif",
      notes: "",
    },
    {
      id: "10",
      name: "Joko Susilo",
      contact: "081234567899",
      skill: "Medis",
      status: "Nonaktif",
      notes: "",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Volunteer>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(volunteers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVolunteers = volunteers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update existing volunteer
      setVolunteers(
        volunteers.map((vol) =>
          vol.id === editingId
            ? {
                ...vol,
                name: formData.name || "",
                contact: formData.contact || "",
                skill: formData.skill || "",
                status: formData.status || "Aktif",
                notes: formData.notes || "",
              }
            : vol
        )
      );
    } else {
      // Add new volunteer
      const newVolunteer: Volunteer = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || "",
        contact: formData.contact || "",
        skill: formData.skill || "",
        status: formData.status || "Aktif",
        notes: formData.notes || "",
      };
      setVolunteers([...volunteers, newVolunteer]);
    }
    setIsDialogOpen(false);
    setFormData({});
    setEditingId(null);
  };

  const handleEdit = (volunteer: Volunteer) => {
    setFormData(volunteer);
    setEditingId(volunteer.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus relawan ini?")) {
      setVolunteers(volunteers.filter((vol) => vol.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        <main className="flex-1 py-10 px-6 md:px-12 lg:px-16 bg-transparent">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">
                Kelola Data Relawan
              </h1>
              <p className="text-slate-500">
                Pantau dan kelola seluruh data relawan yang terdaftar
              </p>
            </div>
            <Button
              onClick={() => {
                setFormData({});
                setEditingId(null);
                setIsDialogOpen(true);
              }}
              className="h-12 px-6 text-base font-semibold"
            >
              Tambah Relawan
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
                      Nama
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Kontak
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Keahlian
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
                  {currentVolunteers.map((vol, index) => (
                    <TableRow key={vol.id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{vol.name}</TableCell>
                      <TableCell>{vol.contact}</TableCell>
                      <TableCell>{vol.skill}</TableCell>
                      <TableCell>
                        <Badge
                          className={`
                            ${
                              vol.status === "Aktif"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400"
                            } 
                            border-none font-medium`}
                        >
                          {vol.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{vol.notes}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(vol)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(vol.id)}
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Data Relawan" : "Tambah Data Relawan"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama</Label>
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
                  <Label htmlFor="contact">Kontak</Label>
                  <Input
                    id="contact"
                    value={formData.contact || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="skill">Keahlian</Label>
                  <select
                    id="skill"
                    className="w-full p-2 border rounded-md"
                    value={formData.skill || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, skill: e.target.value })
                    }
                    required
                  >
                    <option value="">Pilih Keahlian</option>
                    <option value="Medis">Medis</option>
                    <option value="Logistik">Logistik</option>
                    <option value="Psikososial">Psikososial</option>
                    <option value="Evakuasi">Evakuasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="w-full p-2 border rounded-md"
                    value={formData.status || "Aktif"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    required
                  >
                    <option value="Aktif" className="text-green-700">
                      Aktif
                    </option>
                    <option value="Nonaktif" className="text-slate-700">
                      Nonaktif
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
                  {editingId ? "Update" : "Simpan"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default VolunteerManagement;
