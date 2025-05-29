import { useState, useEffect } from "react";
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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { relawanApi, bencanaApi } from "@/services/api";
import { Relawan, Bencana } from "@/types/models";
import { toast } from "sonner";

type RelawanInput = {
  nama: string;
  jenis_relawan: string;
  nomor_hp: string;
  email: string;
  id_bencana: string;
};

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState<Relawan[]>([]);
  const [disasters, setDisasters] = useState<Bencana[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<RelawanInput>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState<Relawan | null>(
    null
  );
  const itemsPerPage = 5;

  useEffect(() => {
    fetchVolunteers();
    fetchDisasters();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const data = await relawanApi.getAll();
      setVolunteers(data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      toast.error("Gagal mengambil data relawan");
    }
  };

  const fetchDisasters = async () => {
    try {
      const data = await bencanaApi.getAll();
      setDisasters(data);
    } catch (error) {
      console.error("Error fetching disasters:", error);
      toast.error("Gagal mengambil data bencana");
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(volunteers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVolunteers = volunteers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formData.nama ||
        !formData.jenis_relawan ||
        !formData.nomor_hp ||
        !formData.email ||
        !formData.id_bencana
      ) {
        toast.error("Mohon lengkapi semua field yang diperlukan");
        return;
      }

      const volunteerData: RelawanInput = {
        nama: formData.nama,
        jenis_relawan: formData.jenis_relawan,
        nomor_hp: formData.nomor_hp,
        email: formData.email,
        id_bencana: formData.id_bencana,
      };

      if (editingId) {
        await relawanApi.update(editingId, volunteerData);
        toast.success("Data relawan berhasil diperbarui");
      } else {
        await relawanApi.create(volunteerData);
        toast.success("Data relawan berhasil ditambahkan");
      }

      await fetchVolunteers();
      setIsDialogOpen(false);
      setFormData({});
      setEditingId(null);
    } catch (error: any) {
      console.error("Error saving volunteer:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menyimpan data relawan";
      toast.error(errorMessage);
    }
  };

  const handleEdit = (volunteer: Relawan) => {
    setFormData({
      nama: volunteer.nama,
      jenis_relawan: volunteer.jenis_relawan,
      nomor_hp: volunteer.nomor_hp,
      email: volunteer.email,
      id_bencana: volunteer.id_bencana,
    });
    setEditingId(volunteer.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (volunteer: Relawan) => {
    setVolunteerToDelete(volunteer);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!volunteerToDelete) return;

    try {
      await relawanApi.delete(volunteerToDelete.id);
      await fetchVolunteers();
      toast.success("Data relawan berhasil dihapus");
      setDeleteDialogOpen(false);
      setVolunteerToDelete(null);
    } catch (error: any) {
      console.error("Error deleting volunteer:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data relawan";
      toast.error(errorMessage);
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
                      Email
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Keahlian
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Bencana
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
                      <TableCell>{vol.nama}</TableCell>
                      <TableCell>{vol.nomor_hp}</TableCell>
                      <TableCell>{vol.email}</TableCell>
                      <TableCell>{vol.jenis_relawan}</TableCell>
                      <TableCell>
                        {
                          disasters.find((d) => d.id === vol.id_bencana)
                            ?.jenis_bencana
                        }
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            className="bg-blue-500 hover:bg-blue-600"
                            size="sm"
                            onClick={() => handleEdit(vol)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(vol)}
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
                  <Label htmlFor="nama">Nama</Label>
                  <Input
                    id="nama"
                    value={formData.nama || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, nama: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nomor_hp">Nomor HP</Label>
                  <Input
                    id="nomor_hp"
                    value={formData.nomor_hp || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, nomor_hp: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="jenis_relawan">Keahlian</Label>
                  <select
                    id="jenis_relawan"
                    className="w-full p-2 border rounded-md"
                    value={formData.jenis_relawan || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jenis_relawan: e.target.value,
                      })
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
                  <Label htmlFor="id_bencana">Bencana</Label>
                  <select
                    id="id_bencana"
                    className="w-full p-2 border rounded-md"
                    value={formData.id_bencana || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, id_bencana: e.target.value })
                    }
                    required
                  >
                    <option value="">Pilih Bencana</option>
                    {disasters.map((disaster) => (
                      <option key={disaster.id} value={disaster.id}>
                        {disaster.jenis_bencana} -{" "}
                        {disaster.lokasi?.nama_kecamatan}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="w-full">
                  {editingId ? "Update" : "Simpan"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <Trash2 className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <DialogTitle className="text-center">
                  Konfirmasi Hapus
                </DialogTitle>
                <DialogDescription className="text-center">
                  Apakah kamu yakin menghapus data relawan{" "}
                  {volunteerToDelete?.nama}?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center gap-2">
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDeleteDialogOpen(false);
                      setVolunteerToDelete(null);
                    }}
                  >
                    Batal
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete}>
                    Ya, Hapus
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default VolunteerManagement;
