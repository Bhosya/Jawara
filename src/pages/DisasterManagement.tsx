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
import {
  ArrowLeft,
  Trash2,
  Info,
  MapPin,
  Phone,
  Building2,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import AdminSidebar from "@/components/AdminSidebar";
import {
  bencanaApi,
  kabupatenApi,
  lokasiApi,
  kontakDaruratApi,
  pusatEvakuasiApi,
} from "@/services/api";
import {
  Bencana,
  Lokasi,
  KontakDarurat,
  PusatEvakuasi,
  Kabupaten,
} from "@/types/models";
import { toast } from "sonner";

type BencanaInput = {
  jenis_bencana: string;
  tanggal_bencana: string;
  deskripsi: string;
  status: string;
  tingkat_peringatan: string;
  id_lokasi: string;
  id_kontak_darurat: string;
  id_pusat_evakuasi: string;
};

const DisasterManagement = () => {
  const navigate = useNavigate();
  const [selectedRegency, setSelectedRegency] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [kabupatenList, setKabupatenList] = useState<Kabupaten[]>([]);
  const [kecamatanList, setKecamatanList] = useState<Lokasi[]>([]);
  const [formData, setFormData] = useState<Partial<Bencana>>({
    jenis_bencana: "",
    tanggal_bencana: "",
    deskripsi: "",
    status: "AKTIF",
    tingkat_peringatan: "RINGAN",
    id_lokasi: "",
    id_kontak_darurat: "",
    id_pusat_evakuasi: "",
  });
  const [disasters, setDisasters] = useState<Bencana[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const itemsPerPage = 5;
  const [kontakDaruratList, setKontakDaruratList] = useState<KontakDarurat[]>(
    []
  );
  const [pusatEvakuasiList, setPusatEvakuasiList] = useState<PusatEvakuasi[]>(
    []
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [disasterToDelete, setDisasterToDelete] = useState<Bencana | null>(
    null
  );
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState<Bencana | null>(
    null
  );

  useEffect(() => {
    fetchDisasters();
    fetchKabupaten();
    fetchKontakDarurat();
    fetchPusatEvakuasi();
  }, []);

  useEffect(() => {
    if (selectedRegency) {
      fetchKecamatan(selectedRegency);
    } else {
      setKecamatanList([]);
    }
  }, [selectedRegency]);

  const fetchKabupaten = async () => {
    try {
      const data = await kabupatenApi.getAll();
      setKabupatenList(data);
    } catch (error) {
      console.error("Error fetching kabupaten:", error);
      toast.error("Gagal mengambil data kabupaten");
    }
  };

  const fetchKecamatan = async (kabupatenId: string) => {
    try {
      const allLokasi = await lokasiApi.getAll();
      const filteredKecamatan = allLokasi.filter(
        (lokasi) => lokasi.id_kabupaten === kabupatenId
      );
      setKecamatanList(filteredKecamatan);
    } catch (error) {
      console.error("Error fetching kecamatan:", error);
      toast.error("Gagal mengambil data kecamatan");
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

  const fetchKontakDarurat = async () => {
    try {
      const data = await kontakDaruratApi.getAll();
      setKontakDaruratList(data);
    } catch (error) {
      console.error("Error fetching kontak darurat:", error);
      toast.error("Gagal mengambil data kontak darurat");
    }
  };

  const fetchPusatEvakuasi = async () => {
    try {
      const data = await pusatEvakuasiApi.getAll();
      setPusatEvakuasiList(data);
    } catch (error) {
      console.error("Error fetching pusat evakuasi:", error);
      toast.error("Gagal mengambil data pusat evakuasi");
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(disasters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDisasters = disasters.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetForm = () => {
    setFormData({
      jenis_bencana: "",
      tanggal_bencana: "",
      deskripsi: "",
      status: "AKTIF",
      tingkat_peringatan: "RINGAN",
      id_lokasi: "",
      id_kontak_darurat: "",
      id_pusat_evakuasi: "",
    });
    setSelectedRegency("");
    setSelectedDistrict("");
    setIsEditing(false);
    setEditingId("");
  };

  const handleKabupatenChange = (value: string) => {
    setSelectedRegency(value);
    setSelectedDistrict("");
    setFormData((prev) => ({ ...prev, id_lokasi: "" }));
  };

  const handleKecamatanChange = (value: string) => {
    setSelectedDistrict(value);
    setFormData((prev) => ({ ...prev, id_lokasi: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validasi data sebelum dikirim
      if (
        !formData.jenis_bencana ||
        !formData.tanggal_bencana ||
        !formData.deskripsi ||
        !formData.id_lokasi ||
        !formData.id_kontak_darurat ||
        !formData.id_pusat_evakuasi
      ) {
        toast.error("Mohon lengkapi semua field yang diperlukan");
        return;
      }

      // Format tanggal ke ISO string
      const formattedDate = formData.tanggal_bencana
        ? new Date(formData.tanggal_bencana).toISOString()
        : new Date().toISOString();

      // Log data yang akan dikirim
      console.log("Data yang akan dikirim:", {
        jenis_bencana: formData.jenis_bencana,
        tanggal_bencana: formattedDate,
        deskripsi: formData.deskripsi,
        status: formData.status,
        tingkat_peringatan: formData.tingkat_peringatan,
        id_lokasi: formData.id_lokasi,
        id_kontak_darurat: formData.id_kontak_darurat,
        id_pusat_evakuasi: formData.id_pusat_evakuasi,
      });

      // Pastikan semua field required terisi
      const disasterData: BencanaInput = {
        jenis_bencana: formData.jenis_bencana,
        tanggal_bencana: formattedDate,
        deskripsi: formData.deskripsi,
        status: formData.status || "AKTIF",
        tingkat_peringatan: formData.tingkat_peringatan || "RINGAN",
        id_lokasi: formData.id_lokasi,
        id_kontak_darurat: formData.id_kontak_darurat,
        id_pusat_evakuasi: formData.id_pusat_evakuasi,
      };

      if (isEditing) {
        await bencanaApi.update(editingId, disasterData);
        toast.success("Data bencana berhasil diperbarui");
      } else {
        await bencanaApi.create(disasterData as any); // Type assertion as temporary fix
        toast.success("Data bencana berhasil ditambahkan");
      }

      await fetchDisasters();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Error saving disaster:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error headers:", error.response?.headers);
      console.error("Full error object:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Gagal menyimpan data bencana";
      toast.error(errorMessage);
    }
  };

  const handleEdit = (disaster: Bencana) => {
    setFormData({
      jenis_bencana: disaster.jenis_bencana,
      tanggal_bencana: disaster.tanggal_bencana.split("T")[0], // Format tanggal untuk input type="date"
      deskripsi: disaster.deskripsi,
      status: disaster.status,
      tingkat_peringatan: disaster.tingkat_peringatan,
      id_lokasi: disaster.id_lokasi,
      id_kontak_darurat: disaster.id_kontak_darurat,
      id_pusat_evakuasi: disaster.id_pusat_evakuasi,
    });
    if (disaster.lokasi) {
      setSelectedRegency(disaster.lokasi.id_kabupaten);
      setSelectedDistrict(disaster.id_lokasi);
    }
    setIsEditing(true);
    setEditingId(disaster.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (disaster: Bencana) => {
    setDisasterToDelete(disaster);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!disasterToDelete) return;

    try {
      await bencanaApi.delete(disasterToDelete.id);
      await fetchDisasters();
      toast.success("Data bencana berhasil dihapus");
      setDeleteDialogOpen(false);
      setDisasterToDelete(null);
    } catch (error: any) {
      console.error("Error deleting disaster:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data bencana";
      toast.error(errorMessage);
    }
  };

  const handleDetail = (disaster: Bencana) => {
    setSelectedDisaster(disaster);
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
                Kelola Data Bencana
              </h1>
              <p className="text-slate-500">
                Pantau dan kelola seluruh data bencana yang tercatat di sistem
              </p>
            </div>
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
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
                      Jenis Bencana
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
                      Tingkat Peringatan
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDisasters.map((disaster, index) => (
                    <TableRow key={disaster.id}>
                      <TableCell className="text-slate-600">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {disaster.jenis_bencana}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {disaster.lokasi?.nama_kecamatan}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {new Date(disaster.tanggal_bencana).toLocaleDateString(
                          "id-ID"
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            disaster.status === "AKTIF"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {disaster.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            disaster.tingkat_peringatan === "BERAT"
                              ? "bg-red-100 text-red-700"
                              : disaster.tingkat_peringatan === "SEDANG"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {disaster.tingkat_peringatan}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            className="bg-yellow-500 text-white hover:bg-yellow-600"
                            size="sm"
                            onClick={() => handleDetail(disaster)}
                          >
                            Detail
                          </Button>
                          <Button
                            variant="destructive"
                            className="bg-blue-500 text-white hover:bg-blue-600"
                            size="sm"
                            onClick={() => handleEdit(disaster)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(disaster)}
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
              {isEditing ? "Edit Data Bencana" : "Tambah Data Bencana"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Ubah informasi bencana yang ada di bawah ini"
                : "Isi informasi bencana di bawah ini"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jenis_bencana">Jenis Bencana</Label>
                <Select
                  value={formData.jenis_bencana}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      jenis_bencana: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis Bencana" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Banjir">Banjir</SelectItem>
                    <SelectItem value="Banjir Bandang">
                      Banjir Bandang
                    </SelectItem>
                    <SelectItem value="Longsor">Longsor</SelectItem>
                    <SelectItem value="Gempa Bumi">Gempa Bumi</SelectItem>
                    <SelectItem value="Tsunami">Tsunami</SelectItem>
                    <SelectItem value="Gunung Berapi">Gunung Berapi</SelectItem>
                    <SelectItem value="Kebakaran Hutan">
                      Kebakaran Hutan
                    </SelectItem>
                    <SelectItem value="Angin Kencang">Angin Kencang</SelectItem>
                    <SelectItem value="Angin Puting Beliung">
                      Angin Puting Beliung
                    </SelectItem>
                    <SelectItem value="Kebakaran">Kebakaran</SelectItem>
                    <SelectItem value="Kekeringan">Kekeringan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggal_bencana">Tanggal Bencana</Label>
                <Input
                  id="tanggal_bencana"
                  type="date"
                  value={formData.tanggal_bencana}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tanggal_bencana: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kabupaten">Kabupaten</Label>
                <Select
                  value={selectedRegency}
                  onValueChange={handleKabupatenChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kabupaten" />
                  </SelectTrigger>
                  <SelectContent>
                    {kabupatenList.map((kabupaten) => (
                      <SelectItem key={kabupaten.id} value={kabupaten.id}>
                        {kabupaten.nama_kabupaten}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kecamatan">Kecamatan</Label>
                <Select
                  value={selectedDistrict}
                  onValueChange={handleKecamatanChange}
                  disabled={!selectedRegency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kecamatan" />
                  </SelectTrigger>
                  <SelectContent>
                    {kecamatanList.map((kecamatan) => (
                      <SelectItem key={kecamatan.id} value={kecamatan.id}>
                        {kecamatan.nama_kecamatan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    deskripsi: e.target.value,
                  }))
                }
                placeholder="Masukkan deskripsi bencana"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AKTIF">Aktif</SelectItem>
                    <SelectItem value="SELESAI">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tingkat_peringatan">Tingkat Peringatan</Label>
                <Select
                  value={formData.tingkat_peringatan}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      tingkat_peringatan: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Tingkat Peringatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RINGAN">Ringan</SelectItem>
                    <SelectItem value="SEDANG">Sedang</SelectItem>
                    <SelectItem value="BERAT">Berat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kontak_darurat">Kontak Darurat</Label>
                <Select
                  value={formData.id_kontak_darurat}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      id_kontak_darurat: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kontak Darurat" />
                  </SelectTrigger>
                  <SelectContent>
                    {kontakDaruratList.map((kontak) => (
                      <SelectItem key={kontak.id} value={kontak.id}>
                        {kontak.nama_instansi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pusat_evakuasi">Pusat Evakuasi</Label>
                <Select
                  value={formData.id_pusat_evakuasi}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      id_pusat_evakuasi: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Pusat Evakuasi" />
                  </SelectTrigger>
                  <SelectContent>
                    {pusatEvakuasiList.map((pusat) => (
                      <SelectItem key={pusat.id} value={pusat.id}>
                        {pusat.nama_lokasi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                {isEditing ? "Simpan Perubahan" : "Tambah Bencana"}
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
              Apakah kamu yakin menghapus data {disasterToDelete?.jenis_bencana}{" "}
              di {disasterToDelete?.lokasi?.nama_kecamatan}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2">
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setDisasterToDelete(null);
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
              Detail Bencana
            </DialogTitle>
          </DialogHeader>

          {selectedDisaster && (
            <div className="space-y-6 py-4">
              {/* Header with Icon */}
              <div className="flex items-center justify-center mb-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    selectedDisaster.tingkat_peringatan === "BERAT"
                      ? "bg-red-100"
                      : selectedDisaster.tingkat_peringatan === "SEDANG"
                      ? "bg-amber-100"
                      : "bg-blue-100"
                  }`}
                >
                  <AlertTriangle
                    className={`w-8 h-8 ${
                      selectedDisaster.tingkat_peringatan === "BERAT"
                        ? "text-red-500"
                        : selectedDisaster.tingkat_peringatan === "SEDANG"
                        ? "text-amber-500"
                        : "text-blue-500"
                    }`}
                  />
                </div>
              </div>

              {/* Main Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-500">Jenis Bencana</Label>
                  <p className="font-medium">
                    {selectedDisaster.jenis_bencana}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500">Status</Label>
                  <p
                    className={`font-medium ${
                      selectedDisaster.status === "AKTIF"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {selectedDisaster.status}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500">Tanggal Bencana</Label>
                  <p className="font-medium">
                    {new Date(
                      selectedDisaster.tanggal_bencana
                    ).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500">Tingkat Peringatan</Label>
                  <p
                    className={`font-medium ${
                      selectedDisaster.tingkat_peringatan === "BERAT"
                        ? "text-red-500"
                        : selectedDisaster.tingkat_peringatan === "SEDANG"
                        ? "text-amber-500"
                        : "text-blue-500"
                    }`}
                  >
                    {selectedDisaster.tingkat_peringatan}
                  </p>
                </div>
              </div>

              {/* Location Info */}
              <div className="space-y-2">
                <Label className="text-slate-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Lokasi
                </Label>
                <p className="font-medium">
                  {selectedDisaster.lokasi?.nama_kecamatan}
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-slate-500">Deskripsi</Label>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">
                  {selectedDisaster.deskripsi}
                </p>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-2">
                <Label className="text-slate-500 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Kontak Darurat
                </Label>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium">
                    {selectedDisaster.kontak_darurat?.nama_instansi}
                  </p>
                  <p className="text-slate-600">
                    {selectedDisaster.kontak_darurat?.no_telp}
                  </p>
                </div>
              </div>

              {/* Evacuation Center */}
              <div className="space-y-2">
                <Label className="text-slate-500 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Pusat Evakuasi
                </Label>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium">
                    {selectedDisaster.pusat_evakuasi?.nama_lokasi}
                  </p>
                  <p className="text-slate-600">
                    {selectedDisaster.pusat_evakuasi?.alamat}
                  </p>
                </div>
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

export default DisasterManagement;
