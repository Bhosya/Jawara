import { useEffect, useState } from "react";
import { userApi } from "@/services/api";
import { User } from "@/types/auth";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Pagination from "@/components/Pagination";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

const UserApproval = () => {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const itemsPerPage = 5;
  const { toast: useToastToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.getPendingUsers();
      setPendingUsers(data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("Anda tidak memiliki akses ke halaman ini");
        navigate("/login");
      } else {
        setError(
          error.response?.data?.message || "Gagal mengambil data pengguna"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(pendingUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = pendingUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApprove = async (id: string) => {
    try {
      await userApi.approve(id);
      toast.success("Pengguna berhasil disetujui");
      fetchPendingUsers();
      setApproveDialogOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menyetujui pengguna");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await userApi.reject(id);
      toast.success("Pengguna berhasil ditolak");
      fetchPendingUsers();
      setRejectDialogOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menolak pengguna");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => fetchPendingUsers()}>Coba Lagi</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        <main className="flex-1 py-10 px-6 md:px-12 lg:px-16 bg-transparent">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">
                Persetujuan Pengguna
              </h1>
              <p className="text-slate-500">
                Kelola permintaan pendaftaran pengguna baru
              </p>
            </div>
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
                      Email
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Role
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Tanggal Daftar
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold uppercase tracking-wide">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          className={`
                            ${
                              user.role === "SUPER_ADMIN"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            } 
                            border-none font-medium`}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.createdAt
                          ? format(new Date(user.createdAt), "dd MMMM yyyy", {
                              locale: id,
                            })
                          : "-"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="bg-green-500 hover:bg-green-600 hover:text-white text-white"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setApproveDialogOpen(true);
                            }}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Setujui
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 hover:text-white text-white"
                            onClick={() => {
                              setSelectedUser(user);
                              setRejectDialogOpen(true);
                            }}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Tolak
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
          {/* Approve Confirmation Dialog */}
          <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <DialogTitle className="text-center">
                  Konfirmasi Persetujuan
                </DialogTitle>
                <DialogDescription className="text-center">
                  Apakah Anda yakin ingin menyetujui pendaftaran{" "}
                  {selectedUser?.name}?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center gap-2">
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setApproveDialogOpen(false);
                      setSelectedUser(null);
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() =>
                      selectedUser && handleApprove(selectedUser.id)
                    }
                  >
                    Ya, Setujui
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
          {/* Reject Confirmation Dialog */}
          <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <X className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <DialogTitle className="text-center">
                  Konfirmasi Penolakan
                </DialogTitle>
                <DialogDescription className="text-center">
                  Apakah Anda yakin ingin menolak pendaftaran{" "}
                  {selectedUser?.name}?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center gap-2">
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRejectDialogOpen(false);
                      setSelectedUser(null);
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      selectedUser && handleReject(selectedUser.id)
                    }
                  >
                    Ya, Tolak
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

export default UserApproval;
