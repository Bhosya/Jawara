export interface Bencana {
  id: string;
  jenis_bencana: string;
  tanggal_bencana: string;
  deskripsi: string;
  id_lokasi: string;
  status: string;
  tingkat_peringatan: string;
  id_kontak_darurat: string;
  id_pusat_evakuasi: string;

  lokasi: Lokasi;
  kontak_darurat: KontakDarurat;
  pusat_evakuasi: PusatEvakuasi;

  jumlah_korban: JumlahKorban[];
  korban_hilang: KorbanHilang[];
  relawan: Relawan[];
  kebutuhan: Kebutuhan[];
  donasi: Donasi[];
}

export interface Lokasi {
  id: string;
  nama_kecamatan: string;
  id_kabupaten: string;
  latitude: number;
  longitude: number;

  kabupaten: Kabupaten;
  bencana: Bencana[];
}

export interface Kabupaten {
  id: string;
  nama_kabupaten: string;
  latitude: number;
  longitude: number;

  lokasi: Lokasi[];
}

export interface JumlahKorban {
  id: string;
  id_bencana: string;
  jumlah_selamat: number;
  jumlah_meninggal: number;
  jumlah_hilang: number;

  bencana: Bencana;
}

export interface KontakDarurat {
  id: string;
  nama_instansi: string;
  no_telp: string;
  email: string;
  alamat: string;

  bencana: Bencana[];
}

export interface PusatEvakuasi {
  id: string;
  nama_lokasi: string;
  alamat: string;
  longitude: number;
  latitude: number;
  kapasitas: number;
  pengungsi: number;

  bencana: Bencana[];
}

export interface KorbanHilang {
  id: string;
  id_bencana: string;
  nama: string;
  deskripsi: string;
  Foto: string;
  kontak_keluarga: string;

  bencana: Bencana;
}

export interface Relawan {
  id: string;
  id_bencana: string;
  nama: string;
  jenis_relawan: string;
  nomor_hp: string;
  email: string;

  bencana: Bencana;
}

export type RelawanInput = Omit<Relawan, "id" | "bencana">;

export interface Kebutuhan {
  id: string;
  id_bencana: string;
  jumlah_makanan: number;
  jumlah_max_makanan: number;
  jumlah_obat: number;
  jumlah_max_obat: number;
  jumlah_pakaian: number;
  jumlah_max_pakaian: number;
  jumlah_airbersih: number;
  jumlah_max_airbersih: number;

  bencana: Bencana;
}

export type KebutuhanInput = Omit<Kebutuhan, "id" | "bencana">;

export interface Donasi {
  id: string;
  id_bencana: string;
  nama_donatur: string;
  nominal: number;
  metode_pembayaran: string;
  tanggal_donasi: string;

  bencana: Bencana;
}

export type DonasiInput = Omit<Donasi, "id" | "bencana">;

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN";
  is_approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
