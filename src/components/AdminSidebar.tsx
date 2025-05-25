import { NavLink, Link } from "react-router-dom";
import {
  Home,
  Activity,
  Users,
  Box,
  Heart,
  ClipboardList,
  LogOut,
  AlertTriangle,
} from "lucide-react";
// Jika ada file logo, import di sini, contoh:
// import JawaraLogo from "@/assets/jawara-logo.svg";

const menu = [
  { label: "Dashboard", icon: <Home size={20} />, to: "/admin", end: true },
  {
    label: "Data Bencana",
    icon: <Activity size={20} />,
    to: "/admin/disaster-management",
  },
  {
    label: "Data Korban",
    icon: <Users size={20} />,
    to: "/admin/victim-management",
  },
  {
    label: "Data Bantuan",
    icon: <Box size={20} />,
    to: "/admin/aid-management",
  },
  {
    label: "Data Relawan",
    icon: <Heart size={20} />,
    to: "/admin/volunteer-management",
  },
  {
    label: "Kebutuhan Operasional",
    icon: <ClipboardList size={20} />,
    to: "/admin/operational-needs",
  },
];

const AdminSidebar = () => {
  return (
    <aside className="h-screen w-64 bg-white border-r border-slate-200 shadow-md flex flex-col justify-between fixed z-30">
      <div>
        <div className="flex items-center gap-2 px-8 py-8 border-b border-slate-100">
          <Link to="/" className="flex items-center space-x-2 group">
            <AlertTriangle className="w-6 h-6 text-jawara-red group-hover:animate-pulse-soft transition-all" />
            <span className="text-xl font-medium tracking-tight text-slate-800 transition-all group-hover:text-jawara-blue">
              JAWARA
            </span>
          </Link>
        </div>
        <nav className="mt-6 flex flex-col gap-1 px-2">
          {menu.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              {...(item.end ? { end: true } : {})}
              className={({ isActive }) =>
                `flex items-center gap-3 px-8 py-3 rounded-lg font-medium text-base transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mb-8 px-8">
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

// Tailwind tambahan (di tailwind.config.js):
// drop-shadow-glow: '0 0 8px #a78bfa, 0 0 16px #f472b6',
