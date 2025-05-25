export interface Bencana {
  id: string;
  nama: string;
  tanggal: Date;
  deskripsi: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Lokasi {
  id: string;
  bencana_id: string;
  latitude: number;
  longitude: number;
  alamat: string;
  created_at: Date;
  updated_at: Date;
}

export interface Kabupaten {
  id: string;
  nama: string;
  provinsi: string;
  created_at: Date;
  updated_at: Date;
}

export interface JumlahKorban {
  id: string;
  bencana_id: string;
  meninggal: number;
  luka_luka: number;
  hilang: number;
  created_at: Date;
  updated_at: Date;
}

export interface KontakDarurat {
  id: string;
  bencana_id: string;
  nama: string;
  nomor_telepon: string;
  alamat: string;
  created_at: Date;
  updated_at: Date;
}

export interface PusatEvakuasi {
  id: string;
  bencana_id: string;
  nama: string;
  alamat: string;
  kapasitas: number;
  created_at: Date;
  updated_at: Date;
}

export interface KorbanHilang {
  id: string;
  bencana_id: string;
  nama: string;
  umur: number;
  jenis_kelamin: string;
  deskripsi: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Relawan {
  id: string;
  bencana_id: string;
  nama: string;
  nomor_telepon: string;
  keahlian: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Kebutuhan {
  id: string;
  bencana_id: string;
  nama: string;
  jumlah: number;
  satuan: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Donasi {
  id: string;
  bencana_id: string;
  nama_donatur: string;
  jumlah: number;
  jenis: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
