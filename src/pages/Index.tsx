import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import {
  AlertTriangle,
  FileWarning,
  AlertCircle,
  Waves,
  CloudLightning,
  Loader,
  ArrowRight,
  Users,
  Package,
  HandHelping,
  Heart,
  Shield,
  Star,
  Bell,
  MapPin,
  ClipboardList,
  Gift,
  Phone,
  Image,
  Syringe,
  Mountain,
  Flame,
  Wind,
  Triangle,
  Zap,
  TreePine,
  Activity,
  Eye,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip as LeafletTooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import GalleryModal from "@/components/GalleryModal";
import "@/styles/animations.css";
import { bencanaApi } from "@/services/api";
import type { Bencana, Kebutuhan } from "@/types/models";

// Custom styles for the map tooltip
const customTooltipStyle = `
  .custom-tooltip {
    background: white !important;
    border: none !important;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
    border-radius: 0.5rem !important;
    padding: 0 !important;
  }
  .custom-tooltip::before {
    border-top-color: white !important;
  }
  .dark .custom-tooltip {
    background: rgb(30 41 59) !important;
  }
  .dark .custom-tooltip::before {
    border-top-color: rgb(30 41 59) !important;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

// Add the custom styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = customTooltipStyle;
document.head.appendChild(styleSheet);

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Mock data for current disasters with detailed impact data
const disasterData = [
  {
    id: 1,
    name: "Banjir",
    location: "Kecamatan Semarang Utara",
    status: "Berlangsung",
    severity: "Tinggi",
    affected: 1250,
    icon: Waves,
    color: "bg-blue-500",
    coordinates: [-6.9667, 110.4167] as [number, number],
    victimStatus: {
      total: 1250,
      safe: 1100,
      deceased: 150,
      missing: 0,
      evacuated: 850,
      inNeed: 400,
    },
    aidNeeds: [
      {
        item: "Selimut",
        quantity: 200,
        current: 120,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Air Bersih",
        quantity: 500,
        current: 300,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Obat-obatan",
        quantity: 100,
        current: 80,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: 2,
    name: "Longsor",
    location: "Kecamatan Temanggung",
    status: "Pemantauan",
    severity: "Sedang",
    affected: 342,
    icon: Mountain,
    color: "bg-amber-500",
    coordinates: [-7.3167, 110.1833] as [number, number],
    victimStatus: {
      total: 342,
      safe: 320,
      deceased: 20,
      missing: 2,
      evacuated: 290,
      inNeed: 50,
    },
    aidNeeds: [
      {
        item: "Tenda",
        quantity: 30,
        current: 15,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Makanan Instan",
        quantity: 200,
        current: 100,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Peralatan Evakuasi",
        quantity: 50,
        current: 20,
        priority: "Medium",
        color: "bg-amber-500",
      },
    ],
  },
  {
    id: 3,
    name: "Aktivitas Gunung Berapi",
    location: "Kecamatan Merapi",
    status: "Peringatan",
    severity: "Sedang",
    affected: 520,
    icon: Triangle,
    color: "bg-red-500",
    coordinates: [-7.5417, 110.4417] as [number, number],
    victimStatus: {
      total: 520,
      safe: 480,
      deceased: 40,
      missing: 0,
      evacuated: 460,
      inNeed: 60,
    },
    aidNeeds: [
      {
        item: "Masker",
        quantity: 1000,
        current: 600,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Tenda",
        quantity: 50,
        current: 30,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Air Bersih",
        quantity: 300,
        current: 150,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: 4,
    name: "Banjir",
    location: "Kecamatan Demak",
    status: "Berlangsung",
    severity: "Tinggi",
    affected: 890,
    icon: Waves,
    color: "bg-blue-500",
    coordinates: [-6.8833, 110.6333] as [number, number],
    victimStatus: {
      total: 890,
      safe: 800,
      deceased: 90,
      missing: 0,
      evacuated: 750,
      inNeed: 140,
    },
    aidNeeds: [
      {
        item: "Selimut",
        quantity: 200,
        current: 120,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Air Bersih",
        quantity: 500,
        current: 300,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Obat-obatan",
        quantity: 100,
        current: 80,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: 5,
    name: "Kebakaran Hutan",
    location: "Kecamatan Ambarawa",
    status: "Berlangsung",
    severity: "Tinggi",
    affected: 156,
    icon: TreePine,
    color: "bg-orange-500",
    coordinates: [-7.2667, 110.4167] as [number, number],
    victimStatus: {
      total: 156,
      safe: 140,
      deceased: 16,
      missing: 0,
      evacuated: 120,
      inNeed: 36,
    },
    aidNeeds: [
      {
        item: "Selimut",
        quantity: 200,
        current: 120,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Air Bersih",
        quantity: 500,
        current: 300,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Obat-obatan",
        quantity: 100,
        current: 80,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: 6,
    name: "Gempa Bumi",
    location: "Kecamatan Purworejo",
    status: "Pemantauan",
    severity: "Sedang",
    affected: 723,
    icon: Activity,
    color: "bg-red-500",
    coordinates: [-7.7167, 110.0167] as [number, number],
    victimStatus: {
      total: 723,
      safe: 650,
      deceased: 73,
      missing: 0,
      evacuated: 600,
      inNeed: 123,
    },
    aidNeeds: [
      {
        item: "Selimut",
        quantity: 200,
        current: 120,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Air Bersih",
        quantity: 500,
        current: 300,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Obat-obatan",
        quantity: 100,
        current: 80,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: 7,
    name: "Angin Kencang",
    location: "Kecamatan Boyolali",
    status: "Peringatan",
    severity: "Sedang",
    affected: 245,
    icon: Wind,
    color: "bg-purple-500",
    coordinates: [-7.5333, 110.6] as [number, number],
    victimStatus: {
      total: 245,
      safe: 220,
      deceased: 25,
      missing: 0,
      evacuated: 200,
      inNeed: 45,
    },
    aidNeeds: [
      {
        item: "Selimut",
        quantity: 200,
        current: 120,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Air Bersih",
        quantity: 500,
        current: 300,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Obat-obatan",
        quantity: 100,
        current: 80,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: 8,
    name: "Banjir",
    location: "Kecamatan Kendal",
    status: "Berlangsung",
    severity: "Tinggi",
    affected: 678,
    icon: Waves,
    color: "bg-blue-500",
    coordinates: [-6.9167, 110.2] as [number, number],
    victimStatus: {
      total: 678,
      safe: 600,
      deceased: 78,
      missing: 0,
      evacuated: 550,
      inNeed: 128,
    },
    aidNeeds: [
      {
        item: "Selimut",
        quantity: 200,
        current: 120,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Air Bersih",
        quantity: 500,
        current: 300,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Obat-obatan",
        quantity: 100,
        current: 80,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: 9,
    name: "Longsor",
    location: "Kecamatan Wonosobo",
    status: "Pemantauan",
    severity: "Sedang",
    affected: 189,
    icon: Mountain,
    color: "bg-amber-500",
    coordinates: [-7.3667, 109.9] as [number, number],
    victimStatus: {
      total: 189,
      safe: 170,
      deceased: 19,
      missing: 0,
      evacuated: 150,
      inNeed: 39,
    },
    aidNeeds: [
      {
        item: "Selimut",
        quantity: 200,
        current: 120,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Air Bersih",
        quantity: 500,
        current: 300,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Obat-obatan",
        quantity: 100,
        current: 80,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: 10,
    name: "Kebakaran",
    location: "Kecamatan Salatiga",
    status: "Berlangsung",
    severity: "Tinggi",
    affected: 156,
    icon: Flame,
    color: "bg-orange-500",
    coordinates: [-7.3333, 110.5] as [number, number],
    victimStatus: {
      total: 156,
      safe: 140,
      deceased: 16,
      missing: 0,
      evacuated: 120,
      inNeed: 36,
    },
    aidNeeds: [
      {
        item: "Selimut",
        quantity: 200,
        current: 120,
        priority: "Urgent",
        color: "bg-red-500",
      },
      {
        item: "Air Bersih",
        quantity: 500,
        current: 300,
        priority: "High",
        color: "bg-orange-500",
      },
      {
        item: "Obat-obatan",
        quantity: 100,
        current: 80,
        priority: "High",
        color: "bg-orange-500",
      },
    ],
  },
];

// Add gallery images data
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1616416354008-3007299b4933?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Distribusi bantuan di lokasi bencana",
    title: "Distribusi Bantuan",
    date: "Semarang, 15 Maret 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1741081288260-877057e3fa27?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Tim relawan memberikan bantuan medis",
    title: "Bantuan Medis",
    date: "Magelang, 12 Maret 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1598953547052-edfed846f700?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pembangunan shelter darurat",
    title: "Pembangunan Shelter",
    date: "Temanggung, 10 Maret 2024",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1681995602372-f37dfb97dc95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pelatihan relawan baru",
    title: "Pelatihan Relawan",
    date: "Surakarta, 8 Maret 2024",
  },
  {
    src: "https://img.inews.co.id/media/822/files/inews_new/2021/01/26/bantuan_bencanajpg.jpg",
    alt: "Distribusi makanan untuk pengungsi",
    title: "Distribusi Makanan",
    date: "Boyolali, 5 Maret 2024",
  },
  {
    src: "https://www.insights.id/uploads/2021/02/601a3e738b8fd_1612332659.jpeg",
    alt: "Koordinasi tim relawan",
    title: "Koordinasi Tim",
    date: "Salatiga, 3 Maret 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pendistribusian air bersih",
    title: "Distribusi Air Bersih",
    date: "Kendal, 1 Maret 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pendistribusian obat-obatan",
    title: "Distribusi Obat-obatan",
    date: "Demak, 28 Februari 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pendistribusian pakaian",
    title: "Distribusi Pakaian",
    date: "Grobogan, 25 Februari 2024",
  },
];

const getKebutuhanLabels = (kebutuhan: Kebutuhan) => {
  const getLevelAndColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage <= 50) return { level: "Urgent", color: "bg-red-500" };
    if (percentage <= 60) return { level: "High", color: "bg-orange-500" };
    if (percentage <= 70) return { level: "Medium", color: "bg-blue-500" };
    return { level: "Normal", color: "bg-green-500" };
  };

  return [
    {
      key: "makanan",
      label: "Makanan",
      value: kebutuhan.jumlah_makanan,
      max: kebutuhan.jumlah_max_makanan,
      ...getLevelAndColor(
        kebutuhan.jumlah_makanan,
        kebutuhan.jumlah_max_makanan
      ),
    },
    {
      key: "obat",
      label: "Obat-obatan",
      value: kebutuhan.jumlah_obat,
      max: kebutuhan.jumlah_max_obat,
      ...getLevelAndColor(kebutuhan.jumlah_obat, kebutuhan.jumlah_max_obat),
    },
    {
      key: "pakaian",
      label: "Pakaian",
      value: kebutuhan.jumlah_pakaian,
      max: kebutuhan.jumlah_max_pakaian,
      ...getLevelAndColor(
        kebutuhan.jumlah_pakaian,
        kebutuhan.jumlah_max_pakaian
      ),
    },
    {
      key: "airbersih",
      label: "Air Bersih",
      value: kebutuhan.jumlah_airbersih,
      max: kebutuhan.jumlah_max_airbersih,
      ...getLevelAndColor(
        kebutuhan.jumlah_airbersih,
        kebutuhan.jumlah_max_airbersih
      ),
    },
  ];
};

// Add this function before the Index component
const getIconPath = (icon: any) => {
  switch (icon) {
    case Waves:
      return '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>';
    case Mountain:
      return '<path d="M12 2L4 12h16L12 2z"/>';
    case Triangle:
      return '<path d="M12 2L4 12h16L12 2z"/>';
    case Activity:
      return '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>';
    case TreePine:
      return '<path d="M12 2v16M8 6l4-4 4 4M8 10l4-4 4 4M8 14l4-4 4 4"/>';
    case Wind:
      return '<path d="M4 12c4-4 8-4 12 0M4 16c4-4 8-4 12 0M4 8c4-4 8-4 12 0"/>';
    case Flame:
      return '<path d="M12 2c-1.5 2-4 3-4 6s2 4 4 6c2-2 4-3 4-6s-2.5-4-4-6z"/>';
    default:
      return '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>';
  }
};

const getIconByJenisBencana = (jenis_bencana: string) => {
  switch (jenis_bencana?.toLowerCase()) {
    case "banjir":
      return Waves;
    case "longsor":
    case "tanah longsor":
      return Mountain;
    case "gunung berapi":
    case "erupsi":
      return Triangle;
    case "gempa bumi":
      return Activity;
    case "kebakaran hutan":
      return TreePine;
    case "angin kencang":
    case "angin puting beliung":
      return Wind;
    case "kebakaran":
      return Flame;
    default:
      return AlertTriangle;
  }
};

const Index = () => {
  const [bencanaData, setBencanaData] = useState<Bencana[]>([]);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedDisasterType, setSelectedDisasterType] = useState<
    string | null
  >(null);
  const [hoveredDisaster, setHoveredDisaster] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const navigate = useNavigate();

  const fetchBencana = async () => {
    try {
      const data = await bencanaApi.getAll();
      // Filter data dengan status AKTIF dan urutkan berdasarkan tanggal terbaru
      const filteredData = data
        .filter((bencana) => bencana.status.toUpperCase() === "AKTIF")
        .sort(
          (a, b) =>
            new Date(b.tanggal_bencana).getTime() -
            new Date(a.tanggal_bencana).getTime()
        )
        .slice(0, 10); // Ambil 10 data teratas
      setBencanaData(filteredData);
    } catch (error) {
      console.error("Error fetching bencana data:", error);
    }
  };

  useEffect(() => {
    fetchBencana();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentAlertIndex((prev) => (prev + 1) % bencanaData.length);
          return 0;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [bencanaData.length]);

  const getAlertLevel = (tingkat_peringatan: string) => {
    switch (tingkat_peringatan?.toLowerCase()) {
      case "berat":
        return "Tinggi";
      case "sedang":
        return "Sedang";
      case "ringan":
        return "Ringan";
      default:
        return "Ringan";
    }
  };

  const getAlertColor = (tingkat_peringatan: string) => {
    switch (tingkat_peringatan.toLowerCase()) {
      case "berat":
        return "bg-red-500";
      case "sedang":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const renderDisasterTooltip = (bencana: Bencana) => {
    return (
      <div className="p-3 max-w-[280px]">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              bencana.status === "AKTIF"
                ? "bg-red-500"
                : bencana.status === "PEMANTAUAN"
                ? "bg-amber-500"
                : "bg-orange-500"
            }`}
          >
            {React.createElement(
              bencana.status === "AKTIF"
                ? AlertTriangle
                : bencana.status === "PEMANTAUAN"
                ? Eye
                : AlertCircle,
              { className: "w-4 h-4 text-white" }
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {bencana.jenis_bencana}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {bencana.lokasi?.nama_kecamatan}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Status:
            </span>
            <Badge
              className={`
              ${
                bencana.status === "AKTIF"
                  ? "bg-red-500"
                  : bencana.status === "PEMANTAUAN"
                  ? "bg-amber-500"
                  : "bg-orange-500"
              } 
              text-white border-none`}
            >
              {bencana.status}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Tingkat Peringatan:
            </span>
            <Badge
              className={`
              ${
                bencana.tingkat_peringatan === "TINGGI"
                  ? "bg-red-500"
                  : bencana.tingkat_peringatan === "SEDANG"
                  ? "bg-amber-500"
                  : "bg-orange-500"
              } 
              text-white border-none`}
            >
              {bencana.tingkat_peringatan}
            </Badge>
          </div>
        </div>
      </div>
    );
  };

  const handleMarkerClick = (disasterId: number) => {
    navigate(`/disaster/${disasterId}`);
  };

  // Calculate pagination values
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = bencanaData.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(bencanaData.length / cardsPerPage);

  if (bencanaData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-12 lg:pt-24 lg:pb-16 lg:pt-28 lg:pb-20 hero-gradient overflow-hidden relative">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 z-10 animate-fade-in text-center lg:text-left">
                <Badge className="mb-4 bg-jawara-blue/10 text-jawara-blue border-none hover:bg-jawara-blue/20">
                  Sistem Peringatan Dini
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
                  <span className="text-jawara-blue">JAWARA</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0">
                  "Tanggap Darurat, Tangguh Bersama"
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-jawara-blue hover:bg-jawara-blue/90 w-full sm:w-auto"
                  >
                    Lihat Bencana Aktif
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-jawara-blue text-jawara-blue hover:bg-jawara-blue/10 w-full sm:w-auto"
                    onClick={() => {
                      const volunteerSection =
                        document.getElementById("volunteer-section");
                      if (volunteerSection) {
                        volunteerSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Daftar Sebagai Relawan
                  </Button>
                </div>
              </div>

              <div className="lg:w-1/2 mt-8 lg:mt-0 relative z-10 animate-scale-up w-full">
                <div className="relative">
                  <div
                    className={`alert-card glass-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg mb-6 overflow-hidden relative ${
                      getAlertLevel(
                        bencanaData[currentAlertIndex].tingkat_peringatan
                      ) === "Tinggi"
                        ? "border border-red-500/50"
                        : ""
                    }`}
                  >
                    {getAlertLevel(
                      bencanaData[currentAlertIndex].tingkat_peringatan
                    ) === "Tinggi" && (
                      <>
                        <div className="absolute inset-0 bg-red-500/10 animate-pulse-glow"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 animate-shimmer"></div>
                      </>
                    )}
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${getAlertColor(
                              bencanaData[currentAlertIndex].tingkat_peringatan
                            )} mr-4 ${
                              getAlertLevel(
                                bencanaData[currentAlertIndex]
                                  .tingkat_peringatan
                              ) === "Tinggi"
                                ? "shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                                : ""
                            }`}
                          >
                            {React.createElement(
                              getIconByJenisBencana(
                                bencanaData[currentAlertIndex].jenis_bencana
                              ) as React.ComponentType<
                                React.SVGProps<SVGSVGElement>
                              >,
                              {
                                className: "w-5 h-5 text-white",
                                strokeWidth: 2,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                              }
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg flex items-center">
                              Peringatan{" "}
                              {bencanaData[currentAlertIndex].jenis_bencana}
                              <Badge
                                className={`ml-3 ${
                                  getAlertLevel(
                                    bencanaData[currentAlertIndex]
                                      .tingkat_peringatan
                                  ) === "Tinggi"
                                    ? "bg-red-500 text-white border-none shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                                    : "bg-red-500 text-white border-none"
                                }`}
                              >
                                {getAlertLevel(
                                  bencanaData[currentAlertIndex]
                                    .tingkat_peringatan
                                )}
                              </Badge>
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {
                                bencanaData[currentAlertIndex].lokasi
                                  ?.nama_kecamatan
                              }{" "}
                              •{" "}
                              {new Date(
                                bencanaData[currentAlertIndex].tanggal_bencana
                              ).toLocaleString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-4">
                        {bencanaData[currentAlertIndex].deskripsi}
                      </p>
                      <div className="flex justify-between items-center">
                        <Link
                          to={`/disaster-monitoring/${bencanaData[currentAlertIndex].id}`}
                          className="text-jawara-blue hover:underline text-sm flex items-center"
                        >
                          Lihat detail <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                        <div className="flex items-center">
                          <div className="text-xs text-slate-500 mr-2">
                            Peringatan berikutnya dalam
                          </div>
                          <Progress value={progress} className="w-24 h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Current Disaster Status Section */}
        <section className="py-8 lg:py-12 lg:py-20 bg-slate-100 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-2 mb-6 lg:mb-8">
              <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-jawara-blue" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Status Bencana Terkini
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="relative">
              <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
                <Button
                  variant={
                    selectedDisasterType === null ? "default" : "outline"
                  }
                  className={`${
                    selectedDisasterType === null
                      ? "bg-jawara-blue hover:bg-jawara-blue/90"
                      : ""
                  } whitespace-nowrap flex-none`}
                  onClick={() => setSelectedDisasterType(null)}
                >
                  Semua
                </Button>
                {Array.from(
                  new Set(bencanaData.map((bencana) => bencana.jenis_bencana))
                ).map((type) => (
                  <Button
                    key={type}
                    variant={
                      selectedDisasterType === type ? "default" : "outline"
                    }
                    className={`${
                      selectedDisasterType === type
                        ? "bg-jawara-blue hover:bg-jawara-blue/90"
                        : ""
                    } whitespace-nowrap flex-none`}
                    onClick={() => setSelectedDisasterType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
              {/* Scroll indicator */}
              <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-slate-100 dark:from-slate-900/50 pointer-events-none"></div>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <div className="relative">
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide cursor-pointer">
                  {bencanaData
                    .filter(
                      (bencana) =>
                        selectedDisasterType === null ||
                        bencana.jenis_bencana === selectedDisasterType
                    )
                    .map((bencana) => (
                      <div
                        key={bencana.id}
                        className="disaster-card glass-card p-4 rounded-xl shadow-sm hover:shadow-lg flex-none w-[280px] transition-all duration-200 hover:scale-105"
                        onClick={() =>
                          navigate(`/disaster-monitoring/${bencana.id}`)
                        }
                      >
                        <div className="flex items-center mb-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${getAlertColor(
                              bencana.tingkat_peringatan
                            )} mr-3`}
                          >
                            {React.createElement(
                              getIconByJenisBencana(
                                bencana.jenis_bencana
                              ) as React.ComponentType<
                                React.SVGProps<SVGSVGElement>
                              >,
                              {
                                className: "w-4 h-4 text-white",
                              }
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {bencana.jenis_bencana}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {bencana.lokasi?.nama_kecamatan}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge
                            className={`
                            ${
                              bencana.status === "AKTIF"
                                ? "bg-red-500"
                                : bencana.status === "PEMANTAUAN"
                                ? "bg-amber-500"
                                : "bg-orange-500"
                            } 
                            text-white border-none`}
                          >
                            {bencana.status}
                          </Badge>
                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            {new Date(
                              bencana.tanggal_bencana
                            ).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
                {/* Scroll indicator */}
                <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-slate-100 dark:from-slate-900/50 pointer-events-none"></div>
              </div>

              {/* Remove map section since we don't have coordinates */}
              <div className="h-[300px] sm:h-[350px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <MapContainer
                  center={[-7.0, 110.0]}
                  zoom={8}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {bencanaData
                    .filter(
                      (bencana) =>
                        selectedDisasterType === null ||
                        bencana.jenis_bencana === selectedDisasterType
                    )
                    .map((bencana) => (
                      <Marker
                        key={bencana.id}
                        position={[
                          bencana.lokasi?.latitude,
                          bencana.lokasi?.longitude,
                        ]}
                        icon={L.divIcon({
                          className: `w-8 h-8 rounded-full flex items-center justify-center ${
                            bencana.tingkat_peringatan === "BERAT"
                              ? "bg-red-500"
                              : bencana.tingkat_peringatan === "SEDANG"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                          }`,
                          html: ReactDOMServer.renderToString(
                            <div className="w-full h-full flex items-center justify-center">
                              {React.createElement(
                                getIconByJenisBencana(
                                  bencana.jenis_bencana
                                ) as React.ComponentType<
                                  React.SVGProps<SVGSVGElement>
                                >,
                                {
                                  className: "w-4 h-4 text-white",
                                  strokeWidth: 2,
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                }
                              )}
                            </div>
                          ),
                          iconSize: [32, 32],
                          iconAnchor: [16, 16],
                        })}
                        eventHandlers={{
                          mouseover: (e) => {
                            e.target.openTooltip();
                            setHoveredDisaster(Number(bencana.id));
                          },
                          mouseout: (e) => {
                            e.target.closeTooltip();
                            setHoveredDisaster(null);
                          },
                          click: () => handleMarkerClick(Number(bencana.id)),
                        }}
                      >
                        <LeafletTooltip
                          permanent={false}
                          direction="top"
                          offset={[0, -10]}
                          className="custom-tooltip"
                          opacity={1}
                          sticky={false}
                        >
                          {renderDisasterTooltip(bencana)}
                        </LeafletTooltip>
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-semibold">
                              {bencana.jenis_bencana}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {bencana.lokasi?.nama_kecamatan}
                            </p>
                            <p className="text-sm text-slate-500">
                              Status: {bencana.status}
                            </p>
                            <p className="text-sm text-slate-500">
                              {new Date(
                                bencana.tanggal_bencana
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Combined Impact and Needs Section */}
        <section className="py-8 lg:py-12 lg:py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <Syringe className="w-5 h-5 lg:w-6 lg:h-6 text-jawara-blue" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Status Korban & Kebutuhan
              </h2>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentCards.map((bencana) => (
                  <div
                    key={bencana.id}
                    className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${getAlertColor(
                            bencana.tingkat_peringatan
                          )}`}
                        >
                          {React.createElement(
                            getIconByJenisBencana(
                              bencana.jenis_bencana
                            ) as React.ComponentType<
                              React.SVGProps<SVGSVGElement>
                            >,
                            {
                              className: "w-5 h-5 text-white",
                            }
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {bencana.lokasi?.nama_kecamatan}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {bencana.jenis_bencana}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-slate-50 dark:bg-slate-900"
                      >
                        {bencana.jumlah_korban
                          ?.reduce(
                            (total, korban) =>
                              total +
                              korban.jumlah_selamat +
                              korban.jumlah_meninggal +
                              korban.jumlah_hilang,
                            0
                          )
                          .toLocaleString()}{" "}
                        korban
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                          {bencana.jumlah_korban
                            ?.reduce(
                              (total, korban) => total + korban.jumlah_selamat,
                              0
                            )
                            .toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600/80 dark:text-green-400/80">
                          Selamat
                        </div>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                        <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                          {bencana.jumlah_korban
                            ?.reduce(
                              (total, korban) =>
                                total + korban.jumlah_meninggal,
                              0
                            )
                            .toLocaleString()}
                        </div>
                        <div className="text-sm text-yellow-600/80 dark:text-yellow-400/80">
                          Meninggal
                        </div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                          {bencana.jumlah_korban
                            ?.reduce(
                              (total, korban) => total + korban.jumlah_hilang,
                              0
                            )
                            .toLocaleString()}
                        </div>
                        <div className="text-sm text-red-600/80 dark:text-red-400/80">
                          Hilang
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Kebutuhan Operasional
                      </h5>
                      {bencana.kebutuhan?.map((kebutuhan) => {
                        const labels = getKebutuhanLabels(kebutuhan);
                        return labels.map((item) => {
                          const percentage = Math.round(
                            (item.value / item.max) * 100
                          );
                          return (
                            <div
                              key={item.key}
                              className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-slate-900 dark:text-white">
                                  {item.label}
                                </span>
                                <Badge className={item.color}>
                                  {item.level}
                                </Badge>
                              </div>
                              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                <span>
                                  {item.value} / {item.max}
                                </span>
                                <span>{percentage}%</span>
                              </div>
                              <Progress
                                value={percentage}
                                className="h-2 mt-1"
                              />
                            </div>
                          );
                        });
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add pagination controls */}
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        onClick={() => setCurrentPage(pageNum)}
                        className={
                          currentPage === pageNum
                            ? "bg-jawara-blue text-white"
                            : "text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10"
                        }
                      >
                        {pageNum}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Center Section */}
        <section className="py-8 lg:py-12 lg:py-16 bg-slate-100 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-2 mb-6 lg:mb-8">
              <Gift className="w-5 h-5 lg:w-6 lg:h-6 text-jawara-blue" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Pusat Donasi
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Donasi Barang */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-300/10 dark:from-blue-500/20 dark:via-blue-400/10 dark:to-blue-300/20">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/10"></div>
                <div className="relative p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-100">
                        Donasi Barang
                      </h3>
                      <p className="text-blue-800/80 dark:text-blue-200/80 mb-4">
                        Kirim bantuan berupa barang yang dibutuhkan korban
                        bencana. Kami akan mendistribusikan bantuan Anda ke
                        lokasi yang tepat.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-blue-800/80 dark:text-blue-200/80">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-blue-500" />
                          </div>
                          <span>
                            Barang akan diverifikasi sebelum didistribusikan
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-800/80 dark:text-blue-200/80">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-blue-500" />
                          </div>
                          <span>
                            Pengiriman dapat dilakukan ke posko terdekat
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-500/90 text-white">
                    Donasi Sekarang
                  </Button>
                </div>
              </div>

              {/* Donasi Dana */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/10 via-green-400/5 to-green-300/10 dark:from-green-500/20 dark:via-green-400/10 dark:to-green-300/20">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/10"></div>
                <div className="relative p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-green-900 dark:text-green-100">
                        Donasi Dana
                      </h3>
                      <p className="text-green-800/80 dark:text-green-200/80 mb-4">
                        Bantuan finansial Anda akan digunakan untuk membeli
                        kebutuhan darurat dan mendukung operasi penanganan
                        bencana.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-green-800/80 dark:text-green-200/80">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Heart className="w-4 h-4 text-green-500" />
                          </div>
                          <span>Transparansi penggunaan dana</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-800/80 dark:text-green-200/80">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Star className="w-4 h-4 text-green-500" />
                          </div>
                          <span>Laporan penggunaan dana setiap minggu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-500/90 text-white">
                    Donasi Sekarang
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-8 lg:py-12 lg:py-20 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-2 mb-6 lg:mb-8">
              <Image className="w-5 h-5 lg:w-6 lg:h-6 text-jawara-blue" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Galeri Dokumentasi
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 lg:mb-8 max-w-2xl text-sm lg:text-base">
              Dokumentasi kegiatan penanganan bencana dan upaya bantuan yang
              telah dilakukan oleh tim relawan dan masyarakat.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {galleryImages.slice(0, 6).map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl h-[250px] sm:h-[300px]"
                >
                  <div className="w-full h-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold mb-1">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-sm">{image.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 lg:mt-8 text-center">
              <Button
                variant="outline"
                className="border-jawara-blue text-jawara-blue hover:bg-jawara-blue/10 w-full sm:w-auto"
                onClick={() => setIsGalleryModalOpen(true)}
              >
                Lihat Semua Dokumentasi
              </Button>
            </div>
          </div>
        </section>

        <GalleryModal
          isOpen={isGalleryModalOpen}
          onClose={() => setIsGalleryModalOpen(false)}
          images={galleryImages}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
