import { useState, useEffect } from "react";
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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import AdminSidebar from "@/components/AdminSidebar";
import { Badge } from "@/components/ui/badge";
import { korbanHilangApi, bencanaApi } from "@/services/api";
import { KorbanHilang, Bencana } from "@/types/models";
import { toast } from "sonner";

type KorbanHilangInput = {
  nama: string;
  deskripsi: string;
  Foto: string;
  kontak_keluarga: string;
  id_bencana: string;
};

const VictimManagement = () => {
  const navigate = useNavigate();
  const [korbanHilang, setKorbanHilang] = useState<KorbanHilang[]>([]);
  const [disasters, setDisasters] = useState<Bencana[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<KorbanHilangInput>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [korbanToDelete, setKorbanToDelete] = useState<KorbanHilang | null>(
    null
  );
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedKorban, setSelectedKorban] = useState<KorbanHilang | null>(
    null
  );
  const itemsPerPage = 5;

  useEffect(() => {
    fetchKorbanHilang();
    fetchDisasters();
  }, []);

  const fetchKorbanHilang = async () => {
    try {
      const data = await korbanHilangApi.getAll();
      setKorbanHilang(data);
    } catch (error) {
      console.error("Error fetching missing victims:", error);
      toast.error("Gagal mengambil data korban hilang");
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
  const totalPages = Math.ceil(korbanHilang.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentKorbanHilang = korbanHilang.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetForm = () => {
    setFormData({});
    setIsEditing(false);
    setEditingId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formData.nama ||
        !formData.deskripsi ||
        !formData.kontak_keluarga ||
        !formData.id_bencana
      ) {
        toast.error("Mohon lengkapi semua field yang diperlukan");
        return;
      }

      const korbanData: KorbanHilangInput = {
        nama: formData.nama,
        deskripsi: formData.deskripsi,
        Foto: formData.Foto || "",
        kontak_keluarga: formData.kontak_keluarga,
        id_bencana: formData.id_bencana,
      };

      if (isEditing) {
        await korbanHilangApi.update(editingId, korbanData);
        toast.success("Data korban hilang berhasil diperbarui");
      } else {
        await korbanHilangApi.create(korbanData);
        toast.success("Data korban hilang berhasil ditambahkan");
      }

      await fetchKorbanHilang();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Error saving missing victim:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menyimpan data korban hilang";
      toast.error(errorMessage);
    }
  };

  const handleEdit = (korban: KorbanHilang) => {
    setFormData({
      nama: korban.nama,
      deskripsi: korban.deskripsi,
      Foto: korban.Foto,
      kontak_keluarga: korban.kontak_keluarga,
      id_bencana: korban.id_bencana,
    });
    setIsEditing(true);
    setEditingId(korban.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (korban: KorbanHilang) => {
    setKorbanToDelete(korban);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!korbanToDelete) return;

    try {
      await korbanHilangApi.delete(korbanToDelete.id);
      await fetchKorbanHilang();
      toast.success("Data korban hilang berhasil dihapus");
      setDeleteDialogOpen(false);
      setKorbanToDelete(null);
    } catch (error: any) {
      console.error("Error deleting missing victim:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data korban hilang";
      toast.error(errorMessage);
    }
  };

  const handleDetail = (korban: KorbanHilang) => {
    setSelectedKorban(korban);
    setDetailDialogOpen(true);
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
                Kelola Data Korban Hilang
              </h1>
              <p className="text-slate-500">
                Pantau dan kelola seluruh data korban hilang yang tercatat di
                sistem
              </p>
            </div>
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="h-12 px-6 text-base font-semibold"
            >
              Tambah Korban Hilang
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
                      Deskripsi
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Kontak Keluarga
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
                  {currentKorbanHilang.map((korban, index) => (
                    <TableRow key={korban.id}>
                      <TableCell className="text-slate-600">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {korban.nama}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {korban.deskripsi}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {korban.kontak_keluarga}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {
                          disasters.find((d) => d.id === korban.id_bencana)
                            ?.jenis_bencana
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            className="bg-yellow-500 text-white hover:bg-yellow-600"
                            size="sm"
                            onClick={() => handleDetail(korban)}
                          >
                            Detail
                          </Button>
                          <Button
                            variant="destructive"
                            className="bg-blue-500 text-white hover:bg-blue-600"
                            size="sm"
                            onClick={() => handleEdit(korban)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(korban)}
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

            {/* Pagination */}
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing
                ? "Edit Data Korban Hilang"
                : "Tambah Data Korban Hilang"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Ubah informasi korban hilang yang ada di bawah ini"
                : "Isi informasi korban hilang di bawah ini"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi || ""}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kontak_keluarga">Kontak Keluarga</Label>
              <Input
                id="kontak_keluarga"
                value={formData.kontak_keluarga || ""}
                onChange={(e) =>
                  setFormData({ ...formData, kontak_keluarga: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Foto">URL Foto</Label>
              <Input
                id="Foto"
                value={formData.Foto || ""}
                onChange={(e) =>
                  setFormData({ ...formData, Foto: e.target.value })
                }
                placeholder="Masukkan URL foto (opsional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="id_bencana">Bencana</Label>
              <Select
                value={formData.id_bencana}
                onValueChange={(value) =>
                  setFormData({ ...formData, id_bencana: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Bencana" />
                </SelectTrigger>
                <SelectContent>
                  {disasters.map((disaster) => (
                    <SelectItem key={disaster.id} value={disaster.id}>
                      {disaster.jenis_bencana} -{" "}
                      {disaster.lokasi?.nama_kecamatan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
              >
                Batal
              </Button>
              <Button type="submit">
                {isEditing ? "Simpan Perubahan" : "Tambah Korban Hilang"}
              </Button>
            </div>
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
            <DialogTitle className="text-center">Konfirmasi Hapus</DialogTitle>
            <DialogDescription className="text-center">
              Apakah kamu yakin menghapus data korban hilang{" "}
              {korbanToDelete?.nama}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2">
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setKorbanToDelete(null);
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

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Detail Korban Hilang
            </DialogTitle>
          </DialogHeader>

          {selectedKorban && (
            <div className="space-y-6 py-4">
              {/* Main Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-500">Nama</Label>
                  <p className="font-medium">{selectedKorban.nama}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500">Kontak Keluarga</Label>
                  <p className="font-medium">
                    {selectedKorban.kontak_keluarga}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-slate-500">Deskripsi</Label>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">
                  {selectedKorban.deskripsi}
                </p>
              </div>

              {/* Photo */}
              {selectedKorban.Foto && (
                <div className="space-y-2">
                  <Label className="text-slate-500">Foto</Label>
                  <img
                    src={selectedKorban.Foto}
                    alt={selectedKorban.nama}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Disaster Info */}
              <div className="space-y-2">
                <Label className="text-slate-500">Bencana</Label>
                <p className="font-medium">
                  {
                    disasters.find((d) => d.id === selectedKorban.id_bencana)
                      ?.jenis_bencana
                  }
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="sticky -bottom-6 bg-white py-4">
            <Button
              variant="destructive"
              className="bg-blue-500 text-white hover:bg-blue-600 w-full"
              onClick={() => setDetailDialogOpen(false)}
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VictimManagement;
