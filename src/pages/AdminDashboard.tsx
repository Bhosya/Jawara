import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
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
  BarChart3,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import AdminSidebar from "@/components/AdminSidebar";

// Data lokasi Jawa Tengah
const jawaTengahLocations = {
  "Kabupaten Banjarnegara": [
    "Kecamatan Banjarnegara",
    "Kecamatan Bawang",
    "Kecamatan Kalibening",
    "Kecamatan Karangkobar",
    "Kecamatan Madukara",
    "Kecamatan Mandiraja",
    "Kecamatan Pagedongan",
    "Kecamatan Pagentan",
    "Kecamatan Pejawaran",
    "Kecamatan Purwanegara",
    "Kecamatan Purworejo Klampok",
    "Kecamatan Rakit",
    "Kecamatan Sigaluh",
    "Kecamatan Susukan",
    "Kecamatan Wanadadi",
    "Kecamatan Wanayasa",
  ],
  "Kabupaten Banyumas": [
    "Kecamatan Ajibarang",
    "Kecamatan Banyumas",
    "Kecamatan Cilongok",
    "Kecamatan Gumelar",
    "Kecamatan Jatilawang",
    "Kecamatan Kalibagor",
    "Kecamatan Karanglewas",
    "Kecamatan Kebasen",
    "Kecamatan Kedung Banteng",
    "Kecamatan Kembaran",
    "Kecamatan Kemranjen",
    "Kecamatan Lumbir",
    "Kecamatan Patikraja",
    "Kecamatan Pekuncen",
    "Kecamatan Purwojati",
    "Kecamatan Rawalo",
    "Kecamatan Sokaraja",
    "Kecamatan Somagede",
    "Kecamatan Sumbang",
    "Kecamatan Sumpiuh",
    "Kecamatan Tambak",
    "Kecamatan Wangon",
  ],
  "Kabupaten Batang": [
    "Kecamatan Bandar",
    "Kecamatan Batang",
    "Kecamatan Banyuputih",
    "Kecamatan Blado",
    "Kecamatan Gringsing",
    "Kecamatan Kandeman",
    "Kecamatan Limpung",
    "Kecamatan Reban",
    "Kecamatan Subah",
    "Kecamatan Tersono",
    "Kecamatan Tulis",
    "Kecamatan Warungasem",
    "Kecamatan Wonotunggal",
  ],
  "Kabupaten Blora": [
    "Kecamatan Banjarejo",
    "Kecamatan Blora",
    "Kecamatan Bogorejo",
    "Kecamatan Cepu",
    "Kecamatan Japah",
    "Kecamatan Jati",
    "Kecamatan Jiken",
    "Kecamatan Jipang",
    "Kecamatan Kedungtuban",
    "Kecamatan Kradenan",
    "Kecamatan Kunduran",
    "Kecamatan Ngawen",
    "Kecamatan Randublatung",
    "Kecamatan Sambong",
    "Kecamatan Todanan",
    "Kecamatan Tunjungan",
  ],
  "Kabupaten Boyolali": [
    "Kecamatan Ampel",
    "Kecamatan Andong",
    "Kecamatan Banyudono",
    "Kecamatan Boyolali",
    "Kecamatan Cepogo",
    "Kecamatan Gladagsari",
    "Kecamatan Juwangi",
    "Kecamatan Karanggede",
    "Kecamatan Kemusu",
    "Kecamatan Klego",
    "Kecamatan Mojosongo",
    "Kecamatan Musuk",
    "Kecamatan Ngemplak",
    "Kecamatan Nogosari",
    "Kecamatan Sambi",
    "Kecamatan Sawit",
    "Kecamatan Selo",
    "Kecamatan Simo",
    "Kecamatan Teras",
    "Kecamatan Wonosegoro",
  ],
  "Kabupaten Brebes": [
    "Kecamatan Banjarharjo",
    "Kecamatan Bantarkawung",
    "Kecamatan Brebes",
    "Kecamatan Bulakamba",
    "Kecamatan Bumiayu",
    "Kecamatan Jatibarang",
    "Kecamatan Kersana",
    "Kecamatan Ketanggungan",
    "Kecamatan Larangan",
    "Kecamatan Losari",
    "Kecamatan Paguyangan",
    "Kecamatan Salem",
    "Kecamatan Sirampog",
    "Kecamatan Songgom",
    "Kecamatan Tanjung",
    "Kecamatan Tonjong",
    "Kecamatan Wanasari",
  ],
  "Kabupaten Cilacap": [
    "Kecamatan Adipala",
    "Kecamatan Bantarsari",
    "Kecamatan Binangun",
    "Kecamatan Cilacap Selatan",
    "Kecamatan Cilacap Tengah",
    "Kecamatan Cilacap Utara",
    "Kecamatan Cimanggu",
    "Kecamatan Cipari",
    "Kecamatan Dayeuhluhur",
    "Kecamatan Gandrungmangu",
    "Kecamatan Jeruklegi",
    "Kecamatan Kampung Laut",
    "Kecamatan Karangpucung",
    "Kecamatan Kawunganten",
    "Kecamatan Kedungreja",
    "Kecamatan Kesugihan",
    "Kecamatan Kroya",
    "Kecamatan Majenang",
    "Kecamatan Maos",
    "Kecamatan Nusawungu",
    "Kecamatan Patimuan",
    "Kecamatan Sampang",
    "Kecamatan Sidareja",
    "Kecamatan Wanareja",
  ],
  "Kabupaten Demak": [
    "Kecamatan Bonang",
    "Kecamatan Demak",
    "Kecamatan Dempet",
    "Kecamatan Gajah",
    "Kecamatan Guntur",
    "Kecamatan Karanganyar",
    "Kecamatan Karangawen",
    "Kecamatan Karangtengah",
    "Kecamatan Kebonagung",
    "Kecamatan Mijen",
    "Kecamatan Mranggen",
    "Kecamatan Sayung",
    "Kecamatan Wedung",
    "Kecamatan Wonosalam",
  ],
  "Kabupaten Grobogan": [
    "Kecamatan Brati",
    "Kecamatan Gabus",
    "Kecamatan Geyer",
    "Kecamatan Godong",
    "Kecamatan Grobogan",
    "Kecamatan Gubug",
    "Kecamatan Karangrayung",
    "Kecamatan Kedungjati",
    "Kecamatan Klambu",
    "Kecamatan Kradenan",
    "Kecamatan Ngaringan",
    "Kecamatan Penawangan",
    "Kecamatan Pulokulon",
    "Kecamatan Purwodadi",
    "Kecamatan Tanggungharjo",
    "Kecamatan Tegowanu",
    "Kecamatan Toroh",
    "Kecamatan Wirosari",
  ],
  "Kabupaten Jepara": [
    "Kecamatan Bangsri",
    "Kecamatan Batealit",
    "Kecamatan Donorojo",
    "Kecamatan Jepara",
    "Kecamatan Kalinyamatan",
    "Kecamatan Karimunjawa",
    "Kecamatan Kedung",
    "Kecamatan Keling",
    "Kecamatan Kembang",
    "Kecamatan Mayong",
    "Kecamatan Mlonggo",
    "Kecamatan Nalumsari",
    "Kecamatan Pakis Aji",
    "Kecamatan Pecangaan",
    "Kecamatan Tahunan",
    "Kecamatan Welahan",
  ],
  "Kabupaten Karanganyar": [
    "Kecamatan Colomadu",
    "Kecamatan Gondangrejo",
    "Kecamatan Jaten",
    "Kecamatan Jatipuro",
    "Kecamatan Jatiyoso",
    "Kecamatan Jenawi",
    "Kecamatan Jumantono",
    "Kecamatan Jumapolo",
    "Kecamatan Karanganyar",
    "Kecamatan Karangpandan",
    "Kecamatan Kebakkramat",
    "Kecamatan Kerjo",
    "Kecamatan Matesih",
    "Kecamatan Ngargoyoso",
    "Kecamatan Tawangmangu",
    "Kecamatan Tasikmadu",
  ],
  "Kabupaten Kebumen": [
    "Kecamatan Adimulyo",
    "Kecamatan Alian",
    "Kecamatan Ambal",
    "Kecamatan Ayah",
    "Kecamatan Bonorowo",
    "Kecamatan Buayan",
    "Kecamatan Buluspesantren",
    "Kecamatan Gombong",
    "Kecamatan Karanganyar",
    "Kecamatan Karanggayam",
    "Kecamatan Karangsambung",
    "Kecamatan Kebumen",
    "Kecamatan Klirong",
    "Kecamatan Kutowinangun",
    "Kecamatan Kuwarasan",
    "Kecamatan Mirit",
    "Kecamatan Padureso",
    "Kecamatan Pejagoan",
    "Kecamatan Petanahan",
    "Kecamatan Prembun",
    "Kecamatan Puring",
    "Kecamatan Rowokele",
    "Kecamatan Sadang",
    "Kecamatan Sempor",
    "Kecamatan Sruweng",
  ],
  "Kabupaten Kendal": [
    "Kecamatan Brangsong",
    "Kecamatan Cepiring",
    "Kecamatan Gemuh",
    "Kecamatan Kaliwungu",
    "Kecamatan Kaliwungu Selatan",
    "Kecamatan Kangkung",
    "Kecamatan Kendal",
    "Kecamatan Limbangan",
    "Kecamatan Ngampel",
    "Kecamatan Pagerruyung",
    "Kecamatan Patean",
    "Kecamatan Patebon",
    "Kecamatan Pegandon",
    "Kecamatan Plantungan",
    "Kecamatan Ringinarum",
    "Kecamatan Rowosari",
    "Kecamatan Singorojo",
    "Kecamatan Sukorejo",
    "Kecamatan Weleri",
  ],
  "Kabupaten Klaten": [
    "Kecamatan Bayat",
    "Kecamatan Cawas",
    "Kecamatan Ceper",
    "Kecamatan Delanggu",
    "Kecamatan Gantiwarno",
    "Kecamatan Jatinom",
    "Kecamatan Jogonalan",
    "Kecamatan Juwiring",
    "Kecamatan Kalikotes",
    "Kecamatan Karanganom",
    "Kecamatan Karangdowo",
    "Kecamatan Karangnongko",
    "Kecamatan Kebonarum",
    "Kecamatan Kemalang",
    "Kecamatan Klaten Selatan",
    "Kecamatan Klaten Tengah",
    "Kecamatan Klaten Utara",
    "Kecamatan Manisrenggo",
    "Kecamatan Ngawen",
    "Kecamatan Pedan",
    "Kecamatan Polanharjo",
    "Kecamatan Prambanan",
    "Kecamatan Trucuk",
    "Kecamatan Tulung",
    "Kecamatan Wedi",
    "Kecamatan Wonosari",
  ],
  "Kabupaten Kudus": [
    "Kecamatan Bae",
    "Kecamatan Dawe",
    "Kecamatan Gebog",
    "Kecamatan Jati",
    "Kecamatan Jekulo",
    "Kecamatan Kaliwungu",
    "Kecamatan Kudus",
    "Kecamatan Mejobo",
    "Kecamatan Undaan",
  ],
  "Kabupaten Magelang": [
    "Kecamatan Bandongan",
    "Kecamatan Borobudur",
    "Kecamatan Candimulyo",
    "Kecamatan Dukun",
    "Kecamatan Grabag",
    "Kecamatan Kajoran",
    "Kecamatan Kaliangkrik",
    "Kecamatan Mertoyudan",
    "Kecamatan Mungkid",
    "Kecamatan Muntilan",
    "Kecamatan Ngablak",
    "Kecamatan Ngluwar",
    "Kecamatan Pakis",
    "Kecamatan Salam",
    "Kecamatan Salaman",
    "Kecamatan Sawangan",
    "Kecamatan Secang",
    "Kecamatan Srumbung",
    "Kecamatan Tegalrejo",
    "Kecamatan Tempuran",
    "Kecamatan Windusari",
  ],
  "Kabupaten Pati": [
    "Kecamatan Batangan",
    "Kecamatan Cluwak",
    "Kecamatan Dukuhseti",
    "Kecamatan Gabus",
    "Kecamatan Gembong",
    "Kecamatan Gunungwungkal",
    "Kecamatan Jaken",
    "Kecamatan Jakenan",
    "Kecamatan Juwana",
    "Kecamatan Kayen",
    "Kecamatan Margorejo",
    "Kecamatan Margoyoso",
    "Kecamatan Pucakwangi",
    "Kecamatan Sukolilo",
    "Kecamatan Tambakromo",
    "Kecamatan Tayu",
    "Kecamatan Tlogowungu",
    "Kecamatan Wedarijaksa",
    "Kecamatan Winong",
  ],
  "Kabupaten Pekalongan": [
    "Kecamatan Bojong",
    "Kecamatan Buaran",
    "Kecamatan Doro",
    "Kecamatan Kajen",
    "Kecamatan Kandangserang",
    "Kecamatan Karanganyar",
    "Kecamatan Karangdadap",
    "Kecamatan Kedungwuni",
    "Kecamatan Kesesi",
    "Kecamatan Lebakbarang",
    "Kecamatan Paninggaran",
    "Kecamatan Petungkriono",
    "Kecamatan Siwalan",
    "Kecamatan Sragi",
    "Kecamatan Talun",
    "Kecamatan Tirto",
    "Kecamatan Wiradesa",
    "Kecamatan Wonokerto",
    "Kecamatan Wonopringgo",
  ],
  "Kabupaten Pemalang": [
    "Kecamatan Ampelgading",
    "Kecamatan Bantarbolang",
    "Kecamatan Belik",
    "Kecamatan Bodeh",
    "Kecamatan Comal",
    "Kecamatan Moga",
    "Kecamatan Pulosari",
    "Kecamatan Randudongkal",
    "Kecamatan Taman",
    "Kecamatan Ulujami",
    "Kecamatan Warungpring",
    "Kecamatan Watukumpul",
    "Kecamatan Petarukan",
  ],
  "Kabupaten Purbalingga": [
    "Kecamatan Bobotsari",
    "Kecamatan Bojongsari",
    "Kecamatan Bukateja",
    "Kecamatan Kaligondang",
    "Kecamatan Kalimanah",
    "Kecamatan Karanganyar",
    "Kecamatan Karangjambu",
    "Kecamatan Karangmoncol",
    "Kecamatan Karangreja",
    "Kecamatan Kejobong",
    "Kecamatan Kemangkon",
    "Kecamatan Kertanegara",
    "Kecamatan Kutasari",
    "Kecamatan Mrebet",
    "Kecamatan Padamara",
    "Kecamatan Pengadegan",
    "Kecamatan Purbalingga",
    "Kecamatan Rembang",
  ],
  "Kabupaten Purworejo": [
    "Kecamatan Bagelen",
    "Kecamatan Banyuurip",
    "Kecamatan Bayan",
    "Kecamatan Bener",
    "Kecamatan Bruno",
    "Kecamatan Butuh",
    "Kecamatan Gebang",
    "Kecamatan Grabag",
    "Kecamatan Kaligesing",
    "Kecamatan Kemiri",
    "Kecamatan Kutoarjo",
    "Kecamatan Loano",
    "Kecamatan Ngombol",
    "Kecamatan Pituruh",
    "Kecamatan Purwodadi",
    "Kecamatan Purworejo",
  ],
  "Kabupaten Rembang": [
    "Kecamatan Bulu",
    "Kecamatan Gunem",
    "Kecamatan Kaliori",
    "Kecamatan Kragan",
    "Kecamatan Lasem",
    "Kecamatan Pamotan",
    "Kecamatan Pancur",
    "Kecamatan Rembang",
    "Kecamatan Sale",
    "Kecamatan Sarang",
    "Kecamatan Sedan",
    "Kecamatan Sluke",
    "Kecamatan Sulang",
    "Kecamatan Sumber",
  ],
  "Kabupaten Semarang": [
    "Kecamatan Ambarawa",
    "Kecamatan Bancak",
    "Kecamatan Bandungan",
    "Kecamatan Banyubiru",
    "Kecamatan Bawen",
    "Kecamatan Bergas",
    "Kecamatan Bringin",
    "Kecamatan Getasan",
    "Kecamatan Jambu",
    "Kecamatan Kaliwungu",
    "Kecamatan Pabelan",
    "Kecamatan Pringapus",
    "Kecamatan Sumowono",
    "Kecamatan Suruh",
    "Kecamatan Susukan",
    "Kecamatan Tengaran",
    "Kecamatan Tuntang",
    "Kecamatan Ungaran Barat",
    "Kecamatan Ungaran Timur",
  ],
  "Kabupaten Sragen": [
    "Kecamatan Gemolong",
    "Kecamatan Gesi",
    "Kecamatan Gondang",
    "Kecamatan Jenar",
    "Kecamatan Kalijambe",
    "Kecamatan Karangmalang",
    "Kecamatan Kedawung",
    "Kecamatan Masaran",
    "Kecamatan Mondokan",
    "Kecamatan Ngrampal",
    "Kecamatan Plupuh",
    "Kecamatan Sambirejo",
    "Kecamatan Sambungmacan",
    "Kecamatan Sidoharjo",
    "Kecamatan Sragen",
    "Kecamatan Sukodono",
    "Kecamatan Sumberlawang",
    "Kecamatan Tangen",
    "Kecamatan Tanon",
  ],
  "Kabupaten Sukoharjo": [
    "Kecamatan Baki",
    "Kecamatan Bendosari",
    "Kecamatan Bulu",
    "Kecamatan Gatak",
    "Kecamatan Grogol",
    "Kecamatan Kartasura",
    "Kecamatan Mojolaban",
    "Kecamatan Nguter",
    "Kecamatan Polokarto",
    "Kecamatan Sukoharjo",
    "Kecamatan Tawangsari",
    "Kecamatan Weru",
  ],
  "Kabupaten Tegal": [
    "Kecamatan Adiwerna",
    "Kecamatan Balapulang",
    "Kecamatan Bojong",
    "Kecamatan Bumijawa",
    "Kecamatan Dukuhturi",
    "Kecamatan Dukuhwaru",
    "Kecamatan Jatinegara",
    "Kecamatan Kedungbanteng",
    "Kecamatan Kramat",
    "Kecamatan Lebaksiu",
    "Kecamatan Margasari",
    "Kecamatan Pagerbarang",
    "Kecamatan Pangkah",
    "Kecamatan Slawi",
    "Kecamatan Suradadi",
    "Kecamatan Talang",
    "Kecamatan Tarub",
    "Kecamatan Warureja",
  ],
  "Kabupaten Temanggung": [
    "Kecamatan Bansari",
    "Kecamatan Bejen",
    "Kecamatan Bulu",
    "Kecamatan Candiroto",
    "Kecamatan Gemawang",
    "Kecamatan Jumo",
    "Kecamatan Kaloran",
    "Kecamatan Kandangan",
    "Kecamatan Kedu",
    "Kecamatan Kledung",
    "Kecamatan Kranggan",
    "Kecamatan Ngadirejo",
    "Kecamatan Parakan",
    "Kecamatan Pringsurat",
    "Kecamatan Selopampang",
    "Kecamatan Temanggung",
    "Kecamatan Tembarak",
    "Kecamatan Tlogomulyo",
    "Kecamatan Tretep",
    "Kecamatan Wonoboyo",
  ],
  "Kabupaten Wonogiri": [
    "Kecamatan Baturetno",
    "Kecamatan Batuwarno",
    "Kecamatan Bulukerto",
    "Kecamatan Eromoko",
    "Kecamatan Girimarto",
    "Kecamatan Giritontro",
    "Kecamatan Giriwoyo",
    "Kecamatan Jatipurno",
    "Kecamatan Jatiroto",
    "Kecamatan Jatisrono",
    "Kecamatan Karangtengah",
    "Kecamatan Kismantoro",
    "Kecamatan Manyaran",
    "Kecamatan Ngadirojo",
    "Kecamatan Nguntoronadi",
    "Kecamatan Paranggupito",
    "Kecamatan Pracimantoro",
    "Kecamatan Puhpelem",
    "Kecamatan Purwantoro",
    "Kecamatan Selogiri",
    "Kecamatan Sidoharjo",
    "Kecamatan Slogohimo",
    "Kecamatan Tirtomoyo",
    "Kecamatan Wonogiri",
    "Kecamatan Wuryantoro",
  ],
  "Kabupaten Wonosobo": [
    "Kecamatan Garung",
    "Kecamatan Kalibawang",
    "Kecamatan Kalikajar",
    "Kecamatan Kaliwiro",
    "Kecamatan Kejajar",
    "Kecamatan Kepil",
    "Kecamatan Kertek",
    "Kecamatan Leksono",
    "Kecamatan Mojotengah",
    "Kecamatan Sapuran",
    "Kecamatan Selomerto",
    "Kecamatan Sukoharjo",
    "Kecamatan Wadaslintang",
    "Kecamatan Watumalang",
    "Kecamatan Wonosobo",
  ],
  "Kota Magelang": [
    "Kecamatan Magelang Selatan",
    "Kecamatan Magelang Tengah",
    "Kecamatan Magelang Utara",
  ],
  "Kota Pekalongan": [
    "Kecamatan Pekalongan Barat",
    "Kecamatan Pekalongan Selatan",
    "Kecamatan Pekalongan Timur",
    "Kecamatan Pekalongan Utara",
  ],
  "Kota Salatiga": [
    "Kecamatan Argomulyo",
    "Kecamatan Sidorejo",
    "Kecamatan Sidomukti",
    "Kecamatan Tingkir",
  ],
  "Kota Semarang": [
    "Kecamatan Banyumanik",
    "Kecamatan Candisari",
    "Kecamatan Gajahmungkur",
    "Kecamatan Gayamsari",
    "Kecamatan Genuk",
    "Kecamatan Gunungpati",
    "Kecamatan Mijen",
    "Kecamatan Ngaliyan",
    "Kecamatan Pedurungan",
    "Kecamatan Semarang Barat",
    "Kecamatan Semarang Selatan",
    "Kecamatan Semarang Tengah",
    "Kecamatan Semarang Timur",
    "Kecamatan Semarang Utara",
    "Kecamatan Tembalang",
    "Kecamatan Tugu",
  ],
  "Kota Surakarta": [
    "Kecamatan Banjarsari",
    "Kecamatan Jebres",
    "Kecamatan Laweyan",
    "Kecamatan Pasar Kliwon",
    "Kecamatan Serengan",
  ],
  "Kota Tegal": [
    "Kecamatan Margadana",
    "Kecamatan Tegal Barat",
    "Kecamatan Tegal Selatan",
    "Kecamatan Tegal Timur",
  ],
};

// Mock data for statistics
const statsData = [
  {
    label: "Total Bencana",
    value: 12,
    trend: "up",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    label: "Korban Terdampak",
    value: 3456,
    trend: "down",
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Total Bantuan",
    value: 2345,
    trend: "up",
    icon: Package,
    color: "text-green-500",
  },
  {
    label: "Relawan Aktif",
    value: 325,
    trend: "up",
    icon: HandHelping,
    color: "text-amber-500",
  },
];

// Mock data for disaster aid distribution
const disasterAidData = [
  {
    disaster: "Banjir Semarang",
    makanan: 500,
    airBersih: 800,
    obat: 300,
    selimut: 400,
    pakaian: 600,
  },
  {
    disaster: "Longsor Magelang",
    makanan: 300,
    airBersih: 500,
    obat: 200,
    selimut: 300,
    pakaian: 400,
  },
  {
    disaster: "Gempa Bumi",
    makanan: 800,
    airBersih: 1000,
    obat: 500,
    selimut: 600,
    pakaian: 800,
  },
];

// Mock data for victim statistics
const victimData = [
  {
    disaster: "Banjir Semarang",
    lukaRingan: 50,
    lukaBerat: 20,
    meninggal: 5,
    selamat: 200,
  },
  {
    disaster: "Longsor Magelang",
    lukaRingan: 30,
    lukaBerat: 15,
    meninggal: 3,
    selamat: 150,
  },
  {
    disaster: "Gempa Bumi",
    lukaRingan: 100,
    lukaBerat: 40,
    meninggal: 10,
    selamat: 300,
  },
];

// Mock data for remaining aid needs
const remainingAidData = [
  { name: "Makanan", value: 500, priority: "High" },
  { name: "Air Bersih", value: 800, priority: "High" },
  { name: "Obat-obatan", value: 300, priority: "Medium" },
  { name: "Selimut", value: 400, priority: "Medium" },
  { name: "Pakaian", value: 600, priority: "Low" },
];

// Mock data for victim statistics by disaster type
const victimByDisasterData = [
  {
    disaster: "Banjir Semarang",
    selamat: 250,
    meninggal: 15,
    hilang: 5,
  },
  {
    disaster: "Longsor Magelang",
    selamat: 180,
    meninggal: 8,
    hilang: 3,
  },
  {
    disaster: "Gempa Bumi",
    selamat: 350,
    meninggal: 25,
    hilang: 10,
  },
  {
    disaster: "Kebakaran Hutan",
    selamat: 120,
    meninggal: 5,
    hilang: 2,
  },
];

// Mock data for logistics needs vs maximum
const logisticsNeedsData = [
  {
    disaster: "Banjir Semarang",
    makanan: { current: 800, max: 1000 },
    obat: { current: 500, max: 600 },
    pakaian: { current: 400, max: 500 },
    airBersih: { current: 1000, max: 1200 },
  },
  {
    disaster: "Longsor Magelang",
    makanan: { current: 600, max: 800 },
    obat: { current: 400, max: 500 },
    pakaian: { current: 300, max: 400 },
    airBersih: { current: 800, max: 1000 },
  },
  {
    disaster: "Gempa Bumi",
    makanan: { current: 1000, max: 1200 },
    obat: { current: 700, max: 800 },
    pakaian: { current: 600, max: 700 },
    airBersih: { current: 1200, max: 1500 },
  },
];

// Mock data for donation trends
const donationTrendData = [
  { date: "2024-01-01", amount: 5000000 },
  { date: "2024-01-02", amount: 7500000 },
  { date: "2024-01-03", amount: 6000000 },
  { date: "2024-01-04", amount: 9000000 },
  { date: "2024-01-05", amount: 8000000 },
  { date: "2024-01-06", amount: 11000000 },
  { date: "2024-01-07", amount: 9500000 },
];

// Mock data for top 5 disasters by needs
const topDisastersData = [
  { name: "Gempa Bumi", value: 4200 },
  { name: "Banjir Semarang", value: 3100 },
  { name: "Longsor Magelang", value: 2800 },
  { name: "Kebakaran Hutan", value: 2500 },
  { name: "Angin Kencang", value: 2000 },
];

// Mock data for volunteers by disaster
const volunteerData = [
  {
    disaster: "Banjir Semarang",
    medis: 25,
    logistik: 30,
    evakuasi: 20,
    psikologis: 15,
  },
  {
    disaster: "Longsor Magelang",
    medis: 20,
    logistik: 25,
    evakuasi: 15,
    psikologis: 10,
  },
  {
    disaster: "Gempa Bumi",
    medis: 35,
    logistik: 40,
    evakuasi: 30,
    psikologis: 25,
  },
];

const COLORS = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState("disaster");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [timeFilter, setTimeFilter] = useState("weekly");

  // Form states
  const [disasterForm, setDisasterForm] = useState({
    name: "",
    type: "",
    location: "",
    severity: "",
    description: "",
    affected: "",
  });

  const [victimForm, setVictimForm] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    needs: "",
    contact: "",
  });

  const [aidForm, setAidForm] = useState({
    type: "",
    quantity: "",
    priority: "",
    location: "",
    description: "",
  });

  const [disasterStats, setDisasterStats] = useState({
    total: 0,
    active: 0,
    resolved: 0,
    ongoing: 0,
  });
  const [victimStats, setVictimStats] = useState({
    total: 0,
    evacuated: 0,
    missing: 0,
    active: 0,
    deceased: 0,
  });
  const [aidStats, setAidStats] = useState({
    total: 0,
    pending: 0,
    received: 0,
    distributed: 0,
    completed: 0,
  });

  const handleDisasterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle disaster form submission
    console.log("Disaster form submitted:", disasterForm);
    setShowAddModal(false);
  };

  const handleVictimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle victim form submission
    console.log("Victim form submitted:", victimForm);
    setShowAddModal(false);
  };

  const handleAidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle aid form submission
    console.log("Aid form submitted:", aidForm);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        <main className="flex-1 py-10 px-6 md:px-12 lg:px-16 bg-transparent">
          {/* Statistik Atas */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 border border-slate-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`rounded-lg p-2 bg-opacity-10 ${stat.color}`}
                    >
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-800 mt-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Chart & Data Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <div className="font-semibold text-lg mb-4 text-slate-700">
                Status Bencana per Bulan
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", count: 4 },
                      { month: "Feb", count: 6 },
                      { month: "Mar", count: 8 },
                      { month: "Apr", count: 5 },
                      { month: "Mei", count: 7 },
                      { month: "Jun", count: 9 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#6366f1"
                      name="Jumlah Bencana"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 flex flex-col items-center justify-center">
              <div className="font-semibold text-lg mb-4 text-slate-700">
                Distribusi Status Bencana
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Aktif", value: 5 },
                        { name: "Selesai", value: 3 },
                        { name: "Berlangsung", value: 4 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#6366f1"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {[
                        { name: "Aktif", value: 5 },
                        { name: "Selesai", value: 3 },
                        { name: "Berlangsung", value: 4 },
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={["#ef4444", "#22c55e", "#f59e0b"][index]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* New Disaster Visualization Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Chart Distribusi Bantuan per Bencana */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <div className="font-semibold text-lg mb-4 text-slate-700">
                Distribusi Bantuan per Bencana
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={disasterAidData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="disaster" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="makanan"
                      stackId="a"
                      fill="#22c55e"
                      name="Makanan"
                    />
                    <Bar
                      dataKey="airBersih"
                      stackId="a"
                      fill="#3b82f6"
                      name="Air Bersih"
                    />
                    <Bar
                      dataKey="obat"
                      stackId="a"
                      fill="#f59e0b"
                      name="Obat"
                    />
                    <Bar
                      dataKey="selimut"
                      stackId="a"
                      fill="#8b5cf6"
                      name="Selimut"
                    />
                    <Bar
                      dataKey="pakaian"
                      stackId="a"
                      fill="#ec4899"
                      name="Pakaian"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart Jumlah Korban per Bencana */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <div className="font-semibold text-lg mb-4 text-slate-700 flex items-center justify-between">
                Jumlah Korban per Bencana
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Filter Waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Mingguan</SelectItem>
                    <SelectItem value="monthly">Bulanan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={victimData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="disaster" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="lukaRingan"
                      fill="#f59e0b"
                      name="Luka Ringan"
                    />
                    <Bar dataKey="lukaBerat" fill="#ef4444" name="Luka Berat" />
                    <Bar dataKey="meninggal" fill="#6b7280" name="Meninggal" />
                    <Bar dataKey="selamat" fill="#22c55e" name="Selamat" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart Kebutuhan Tersisa */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 lg:col-span-2">
              <div className="font-semibold text-lg mb-4 text-slate-700">
                Kebutuhan Tersisa Berdasarkan Jenis Bantuan
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={remainingAidData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {remainingAidData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[entry.priority.toLowerCase()]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Additional Disaster Visualizations */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Jumlah Korban per Bencana (Horizontal Bar Chart) */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <div className="font-semibold text-lg mb-4 text-slate-700">
                Jumlah Korban per Bencana
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={victimByDisasterData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="disaster" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="selamat"
                      stackId="a"
                      fill="#22c55e"
                      name="Selamat"
                    />
                    <Bar
                      dataKey="meninggal"
                      stackId="a"
                      fill="#ef4444"
                      name="Meninggal"
                    />
                    <Bar
                      dataKey="hilang"
                      stackId="a"
                      fill="#f59e0b"
                      name="Hilang"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribusi Kebutuhan vs Maksimum */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <div className="font-semibold text-lg mb-4 text-slate-700">
                Distribusi Kebutuhan vs Maksimum
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={logisticsNeedsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="disaster" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="makanan.current"
                      stackId="a"
                      fill="#22c55e"
                      name="Makanan (Tersedia)"
                    />
                    <Bar
                      dataKey="makanan.max"
                      stackId="a"
                      fill="#86efac"
                      name="Makanan (Maksimum)"
                    />
                    <Bar
                      dataKey="obat.current"
                      stackId="b"
                      fill="#f59e0b"
                      name="Obat (Tersedia)"
                    />
                    <Bar
                      dataKey="obat.max"
                      stackId="b"
                      fill="#fcd34d"
                      name="Obat (Maksimum)"
                    />
                    <Bar
                      dataKey="pakaian.current"
                      stackId="c"
                      fill="#3b82f6"
                      name="Pakaian (Tersedia)"
                    />
                    <Bar
                      dataKey="pakaian.max"
                      stackId="c"
                      fill="#93c5fd"
                      name="Pakaian (Maksimum)"
                    />
                    <Bar
                      dataKey="airBersih.current"
                      stackId="d"
                      fill="#8b5cf6"
                      name="Air (Tersedia)"
                    />
                    <Bar
                      dataKey="airBersih.max"
                      stackId="d"
                      fill="#c4b5fd"
                      name="Air (Maksimum)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tren Donasi */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <div className="font-semibold text-lg mb-4 text-slate-700">
                Tren Donasi
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={donationTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) =>
                        new Date(date).toLocaleDateString("id-ID")
                      }
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        `Rp ${(value / 1000000).toFixed(1)}M`
                      }
                    />
                    <Tooltip
                      formatter={(value) => [
                        `Rp ${Number(value).toLocaleString("id-ID")}`,
                        "Jumlah Donasi",
                      ]}
                      labelFormatter={(date) =>
                        new Date(date).toLocaleDateString("id-ID")
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top 5 Bencana dengan Total Kebutuhan Tertinggi */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <div className="font-semibold text-lg mb-4 text-slate-700">
                Top 5 Bencana dengan Total Kebutuhan Tertinggi
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topDisastersData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {topDisastersData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "#ef4444",
                              "#f59e0b",
                              "#22c55e",
                              "#3b82f6",
                              "#8b5cf6",
                            ][index]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `${value} unit`,
                        "Total Kebutuhan",
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Jumlah Relawan per Bencana */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 lg:col-span-2">
              <div className="font-semibold text-lg mb-4 text-slate-700">
                Jumlah Relawan per Bencana
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={volunteerData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="disaster" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="medis" fill="#ef4444" name="Tim Medis" />
                    <Bar
                      dataKey="logistik"
                      fill="#f59e0b"
                      name="Tim Logistik"
                    />
                    <Bar
                      dataKey="evakuasi"
                      fill="#22c55e"
                      name="Tim Evakuasi"
                    />
                    <Bar
                      dataKey="psikologis"
                      fill="#3b82f6"
                      name="Tim Psikologis"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
