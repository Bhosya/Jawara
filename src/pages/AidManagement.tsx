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
import { donasiApi, bencanaApi } from "@/services/api";
import { Donasi, Bencana } from "@/types/models";
import { toast } from "sonner";

type DonasiInput = {
  nama_donatur: string;
  nominal: number;
  metode_pembayaran: string;
  tanggal_donasi: string;
  id_bencana: string;
};

const AidManagement = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donasi[]>([]);
  const [disasters, setDisasters] = useState<Bencana[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<DonasiInput>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState<Donasi | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donasi | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchDonations();
    fetchDisasters();
  }, []);

  const fetchDonations = async () => {
    try {
      const data = await donasiApi.getAll();
      setDonations(data);
    } catch (error) {
      console.error("Error fetching donations:", error);
      toast.error("Gagal mengambil data donasi");
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
  const totalPages = Math.ceil(donations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = donations.slice(startIndex, endIndex);

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
        !formData.nama_donatur ||
        !formData.nominal ||
        !formData.metode_pembayaran ||
        !formData.tanggal_donasi ||
        !formData.id_bencana
      ) {
        toast.error("Mohon lengkapi semua field yang diperlukan");
        return;
      }

      // Format the date to ISO string with timezone
      const formattedDate = new Date(formData.tanggal_donasi).toISOString();

      const donationData: DonasiInput = {
        nama_donatur: formData.nama_donatur,
        nominal: Number(formData.nominal),
        metode_pembayaran: formData.metode_pembayaran,
        tanggal_donasi: formattedDate,
        id_bencana: formData.id_bencana,
      };

      if (isEditing) {
        await donasiApi.update(editingId, donationData);
        toast.success("Data donasi berhasil diperbarui");
      } else {
        await donasiApi.create(donationData);
        toast.success("Data donasi berhasil ditambahkan");
      }

      await fetchDonations();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Error saving donation:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menyimpan data donasi";
      toast.error(errorMessage);
    }
  };

  const handleEdit = (donation: Donasi) => {
    setFormData({
      nama_donatur: donation.nama_donatur,
      nominal: donation.nominal,
      metode_pembayaran: donation.metode_pembayaran,
      tanggal_donasi: donation.tanggal_donasi.split("T")[0],
      id_bencana: donation.id_bencana,
    });
    setIsEditing(true);
    setEditingId(donation.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (donation: Donasi) => {
    setDonationToDelete(donation);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!donationToDelete) return;

    try {
      await donasiApi.delete(donationToDelete.id);
      await fetchDonations();
      toast.success("Data donasi berhasil dihapus");
      setDeleteDialogOpen(false);
      setDonationToDelete(null);
    } catch (error: any) {
      console.error("Error deleting donation:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data donasi";
      toast.error(errorMessage);
    }
  };

  const handleDetail = (donation: Donasi) => {
    setSelectedDonation(donation);
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
                Kelola Data Donasi
              </h1>
              <p className="text-slate-500">
                Pantau dan kelola seluruh data donasi yang tercatat di sistem
              </p>
            </div>
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="h-12 px-6 text-base font-semibold"
            >
              Tambah Donasi
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
                      Nama Donatur
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Nominal
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Metode Pembayaran
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Tanggal Donasi
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
                  {currentDonations.map((donation, index) => (
                    <TableRow key={donation.id}>
                      <TableCell className="text-slate-600">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {donation.nama_donatur}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        Rp {donation.nominal.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {donation.metode_pembayaran}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {new Date(donation.tanggal_donasi).toLocaleDateString(
                          "id-ID"
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {
                          disasters.find((d) => d.id === donation.id_bencana)
                            ?.jenis_bencana
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            className="bg-yellow-500 text-white hover:bg-yellow-600"
                            size="sm"
                            onClick={() => handleDetail(donation)}
                          >
                            Detail
                          </Button>
                          <Button
                            variant="destructive"
                            className="bg-blue-500 text-white hover:bg-blue-600"
                            size="sm"
                            onClick={() => handleEdit(donation)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(donation)}
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
              {isEditing ? "Edit Data Donasi" : "Tambah Data Donasi"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Ubah informasi donasi yang ada di bawah ini"
                : "Isi informasi donasi di bawah ini"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama_donatur">Nama Donatur</Label>
              <Input
                id="nama_donatur"
                value={formData.nama_donatur || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nama_donatur: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nominal">Nominal</Label>
              <Input
                id="nominal"
                type="number"
                value={formData.nominal || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nominal: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metode_pembayaran">Metode Pembayaran</Label>
              <Select
                value={formData.metode_pembayaran}
                onValueChange={(value) =>
                  setFormData({ ...formData, metode_pembayaran: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Metode Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Transfer Bank">Transfer Bank</SelectItem>
                  <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanggal_donasi">Tanggal Donasi</Label>
              <Input
                id="tanggal_donasi"
                type="date"
                value={formData.tanggal_donasi || ""}
                onChange={(e) =>
                  setFormData({ ...formData, tanggal_donasi: e.target.value })
                }
                required
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
                {isEditing ? "Simpan Perubahan" : "Tambah Donasi"}
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
              Apakah kamu yakin menghapus data donasi dari{" "}
              {donationToDelete?.nama_donatur}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2">
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setDonationToDelete(null);
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
              Detail Donasi
            </DialogTitle>
          </DialogHeader>

          {selectedDonation && (
            <div className="space-y-6 py-4">
              {/* Main Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-500">Nama Donatur</Label>
                  <p className="font-medium">{selectedDonation.nama_donatur}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500">Nominal</Label>
                  <p className="font-medium">
                    Rp {selectedDonation.nominal.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500">Metode Pembayaran</Label>
                  <p className="font-medium">
                    {selectedDonation.metode_pembayaran}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500">Tanggal Donasi</Label>
                  <p className="font-medium">
                    {new Date(
                      selectedDonation.tanggal_donasi
                    ).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Disaster Info */}
              <div className="space-y-2">
                <Label className="text-slate-500">Bencana</Label>
                <p className="font-medium">
                  {
                    disasters.find((d) => d.id === selectedDonation.id_bencana)
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

export default AidManagement;
