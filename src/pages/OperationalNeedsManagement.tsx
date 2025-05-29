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
import { kebutuhanApi, bencanaApi } from "@/services/api";
import { Kebutuhan, Bencana } from "@/types/models";
import { toast } from "sonner";

type KebutuhanInput = {
  id_bencana: string;
  jumlah_makanan: number;
  jumlah_max_makanan: number;
  jumlah_obat: number;
  jumlah_max_obat: number;
  jumlah_pakaian: number;
  jumlah_max_pakaian: number;
  jumlah_airbersih: number;
  jumlah_max_airbersih: number;
};

const OperationalNeedsManagement = () => {
  const [needs, setNeeds] = useState<Kebutuhan[]>([]);
  const [disasters, setDisasters] = useState<Bencana[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<KebutuhanInput>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [needToDelete, setNeedToDelete] = useState<Kebutuhan | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchNeeds();
    fetchDisasters();
  }, []);

  const fetchNeeds = async () => {
    try {
      const data = await kebutuhanApi.getAll();
      setNeeds(data);
    } catch (error) {
      console.error("Error fetching needs:", error);
      toast.error("Gagal mengambil data kebutuhan");
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
  const totalPages = Math.ceil(needs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNeeds = needs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (need: Kebutuhan) => {
    setFormData({
      id_bencana: need.id_bencana,
      jumlah_makanan: need.jumlah_makanan,
      jumlah_max_makanan: need.jumlah_max_makanan,
      jumlah_obat: need.jumlah_obat,
      jumlah_max_obat: need.jumlah_max_obat,
      jumlah_pakaian: need.jumlah_pakaian,
      jumlah_max_pakaian: need.jumlah_max_pakaian,
      jumlah_airbersih: need.jumlah_airbersih,
      jumlah_max_airbersih: need.jumlah_max_airbersih,
    });
    setEditingId(need.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.id_bencana) {
        toast.error("Mohon pilih bencana");
        return;
      }

      const needData: KebutuhanInput = {
        id_bencana: formData.id_bencana,
        jumlah_makanan: Number(formData.jumlah_makanan) || 0,
        jumlah_max_makanan: Number(formData.jumlah_max_makanan) || 0,
        jumlah_obat: Number(formData.jumlah_obat) || 0,
        jumlah_max_obat: Number(formData.jumlah_max_obat) || 0,
        jumlah_pakaian: Number(formData.jumlah_pakaian) || 0,
        jumlah_max_pakaian: Number(formData.jumlah_max_pakaian) || 0,
        jumlah_airbersih: Number(formData.jumlah_airbersih) || 0,
        jumlah_max_airbersih: Number(formData.jumlah_max_airbersih) || 0,
      };

      if (editingId) {
        await kebutuhanApi.update(editingId, needData);
        toast.success("Data kebutuhan berhasil diperbarui");
      } else {
        await kebutuhanApi.create(needData);
        toast.success("Data kebutuhan berhasil ditambahkan");
      }

      await fetchNeeds();
      setIsDialogOpen(false);
      setFormData({});
      setEditingId(null);
    } catch (error: any) {
      console.error("Error saving need:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menyimpan data kebutuhan";
      toast.error(errorMessage);
    }
  };

  const handleDelete = (need: Kebutuhan) => {
    setNeedToDelete(need);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!needToDelete) return;

    try {
      await kebutuhanApi.delete(needToDelete.id);
      await fetchNeeds();
      toast.success("Data kebutuhan berhasil dihapus");
      setDeleteDialogOpen(false);
      setNeedToDelete(null);
    } catch (error: any) {
      console.error("Error deleting need:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data kebutuhan";
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
                Kelola Kebutuhan Operasional
              </h1>
              <p className="text-slate-500">
                Pantau dan kelola seluruh kebutuhan operasional penanganan
                bencana
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
                      Bencana
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Lokasi
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Makanan
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Obat-obatan
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Pakaian
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Air Bersih
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
                      <TableCell>
                        {
                          disasters.find((d) => d.id === need.id_bencana)
                            ?.jenis_bencana
                        }
                      </TableCell>
                      <TableCell>
                        {
                          disasters.find((d) => d.id === need.id_bencana)
                            ?.lokasi?.nama_kecamatan
                        }
                      </TableCell>
                      <TableCell>
                        {need.jumlah_makanan} / {need.jumlah_max_makanan}
                      </TableCell>
                      <TableCell>
                        {need.jumlah_obat} / {need.jumlah_max_obat}
                      </TableCell>
                      <TableCell>
                        {need.jumlah_pakaian} / {need.jumlah_max_pakaian}
                      </TableCell>
                      <TableCell>
                        {need.jumlah_airbersih} / {need.jumlah_max_airbersih}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            className="bg-blue-500 hover:bg-blue-600"
                            size="sm"
                            onClick={() => handleEdit(need)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(need)}
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
                  {editingId
                    ? "Edit Kebutuhan Operasional"
                    : "Tambah Kebutuhan Operasional"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    disabled={!!editingId}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jumlah_makanan">Jumlah Makanan</Label>
                    <Input
                      id="jumlah_makanan"
                      type="number"
                      value={formData.jumlah_makanan || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jumlah_makanan: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jumlah_max_makanan">Maksimum Makanan</Label>
                    <Input
                      id="jumlah_max_makanan"
                      type="number"
                      value={formData.jumlah_max_makanan || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jumlah_max_makanan: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jumlah_obat">Jumlah Obat-obatan</Label>
                    <Input
                      id="jumlah_obat"
                      type="number"
                      value={formData.jumlah_obat || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jumlah_obat: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jumlah_max_obat">
                      Maksimum Obat-obatan
                    </Label>
                    <Input
                      id="jumlah_max_obat"
                      type="number"
                      value={formData.jumlah_max_obat || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jumlah_max_obat: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jumlah_pakaian">Jumlah Pakaian</Label>
                    <Input
                      id="jumlah_pakaian"
                      type="number"
                      value={formData.jumlah_pakaian || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jumlah_pakaian: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jumlah_max_pakaian">Maksimum Pakaian</Label>
                    <Input
                      id="jumlah_max_pakaian"
                      type="number"
                      value={formData.jumlah_max_pakaian || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jumlah_max_pakaian: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jumlah_airbersih">Jumlah Air Bersih</Label>
                    <Input
                      id="jumlah_airbersih"
                      type="number"
                      value={formData.jumlah_airbersih || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jumlah_airbersih: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jumlah_max_airbersih">
                      Maksimum Air Bersih
                    </Label>
                    <Input
                      id="jumlah_max_airbersih"
                      type="number"
                      value={formData.jumlah_max_airbersih || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jumlah_max_airbersih: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
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
                  Apakah kamu yakin menghapus data kebutuhan operasional untuk
                  bencana{" "}
                  {
                    disasters.find((d) => d.id === needToDelete?.id_bencana)
                      ?.jenis_bencana
                  }
                  ?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center gap-2">
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDeleteDialogOpen(false);
                      setNeedToDelete(null);
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

export default OperationalNeedsManagement;
