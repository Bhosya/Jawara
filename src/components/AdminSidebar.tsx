import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "@/types/auth";
import { authApi } from "@/services/api";
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  Package,
  Heart,
  UserPlus,
  Settings,
  LogOut,
  UserCog,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const AdminSidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authApi.getUserInfo();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/admin",
    },
    {
      title: "Kelola Bencana",
      icon: <AlertTriangle className="w-5 h-5" />,
      path: "/admin/disaster-management",
    },
    {
      title: "Kelola Korban",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/victim-management",
    },
    {
      title: "Kelola Bantuan",
      icon: <Package className="w-5 h-5" />,
      path: "/admin/aid-management",
    },
    {
      title: "Kelola Relawan",
      icon: <Heart className="w-5 h-5" />,
      path: "/admin/volunteer-management",
    },
    {
      title: "Kebutuhan Operasional",
      icon: <Settings className="w-5 h-5" />,
      path: "/admin/operational-needs",
    },
    // Menu khusus SUPER_ADMIN
    ...(isSuperAdmin
      ? [
          {
            title: "Kelola Pengguna",
            icon: <UserCog className="w-5 h-5" />,
            path: "/admin/user-management",
          },
          {
            title: "Persetujuan Pengguna",
            icon: <UserCheck className="w-5 h-5" />,
            path: "/admin/user-approval",
          },
        ]
      : []),
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-800">Jawara</h1>
          <p className="text-sm text-slate-500">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.name}
              </p>
              <p className="text-sm text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

// Tailwind tambahan (di tailwind.config.js):
// drop-shadow-glow: '0 0 8px #a78bfa, 0 0 16px #f472b6',
