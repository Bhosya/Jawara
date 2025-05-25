import axios from "axios";
import {
  Bencana,
  Lokasi,
  Kabupaten,
  JumlahKorban,
  KontakDarurat,
  PusatEvakuasi,
  KorbanHilang,
  Relawan,
  Kebutuhan,
  Donasi,
} from "./types";

// Initialize axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Bencana API functions
export const getAllBencana = async (): Promise<Bencana[]> => {
  const response = await api.get("/bencana");
  return response.data as Bencana[];
};

export const getBencanaById = async (id: string): Promise<Bencana> => {
  const response = await api.get(`/bencana/${id}`);
  return response.data as Bencana;
};

export const createBencana = async (data: Bencana): Promise<Bencana> => {
  const response = await api.post("/bencana", data);
  return response.data as Bencana;
};

export const updateBencana = async (
  id: string,
  data: Partial<Bencana>
): Promise<Bencana> => {
  const response = await api.put(`/bencana/${id}`, data);
  return response.data as Bencana;
};

export const deleteBencana = async (id: string): Promise<void> => {
  await api.delete(`/bencana/${id}`);
};

// Lokasi API functions
export const getAllLokasi = async (): Promise<Lokasi[]> => {
  const response = await api.get("/lokasi");
  return response.data as Lokasi[];
};

export const getLokasiById = async (id: string): Promise<Lokasi> => {
  const response = await api.get(`/lokasi/${id}`);
  return response.data as Lokasi;
};

export const createLokasi = async (data: Lokasi): Promise<Lokasi> => {
  const response = await api.post("/lokasi", data);
  return response.data as Lokasi;
};

export const updateLokasi = async (
  id: string,
  data: Partial<Lokasi>
): Promise<Lokasi> => {
  const response = await api.put(`/lokasi/${id}`, data);
  return response.data as Lokasi;
};

export const deleteLokasi = async (id: string): Promise<void> => {
  await api.delete(`/lokasi/${id}`);
};

// Kabupaten API functions
export const getAllKabupaten = async (): Promise<Kabupaten[]> => {
  const response = await api.get("/kabupaten");
  return response.data as Kabupaten[];
};

export const getKabupatenById = async (id: string): Promise<Kabupaten> => {
  const response = await api.get(`/kabupaten/${id}`);
  return response.data as Kabupaten;
};

export const createKabupaten = async (data: Kabupaten): Promise<Kabupaten> => {
  const response = await api.post("/kabupaten", data);
  return response.data as Kabupaten;
};

export const updateKabupaten = async (
  id: string,
  data: Partial<Kabupaten>
): Promise<Kabupaten> => {
  const response = await api.put(`/kabupaten/${id}`, data);
  return response.data as Kabupaten;
};

export const deleteKabupaten = async (id: string): Promise<void> => {
  await api.delete(`/kabupaten/${id}`);
};

// JumlahKorban API functions
export const getAllJumlahKorban = async (): Promise<JumlahKorban[]> => {
  const response = await api.get("/jumlah-korban");
  return response.data as JumlahKorban[];
};

export const getJumlahKorbanById = async (
  id: string
): Promise<JumlahKorban> => {
  const response = await api.get(`/jumlah-korban/${id}`);
  return response.data as JumlahKorban;
};

export const createJumlahKorban = async (
  data: JumlahKorban
): Promise<JumlahKorban> => {
  const response = await api.post("/jumlah-korban", data);
  return response.data as JumlahKorban;
};

export const updateJumlahKorban = async (
  id: string,
  data: Partial<JumlahKorban>
): Promise<JumlahKorban> => {
  const response = await api.put(`/jumlah-korban/${id}`, data);
  return response.data as JumlahKorban;
};

export const deleteJumlahKorban = async (id: string): Promise<void> => {
  await api.delete(`/jumlah-korban/${id}`);
};

// KontakDarurat API functions
export const getAllKontakDarurat = async (): Promise<KontakDarurat[]> => {
  const response = await api.get("/kontak-darurat");
  return response.data as KontakDarurat[];
};

export const getKontakDaruratById = async (
  id: string
): Promise<KontakDarurat> => {
  const response = await api.get(`/kontak-darurat/${id}`);
  return response.data as KontakDarurat;
};

export const createKontakDarurat = async (
  data: KontakDarurat
): Promise<KontakDarurat> => {
  const response = await api.post("/kontak-darurat", data);
  return response.data as KontakDarurat;
};

export const updateKontakDarurat = async (
  id: string,
  data: Partial<KontakDarurat>
): Promise<KontakDarurat> => {
  const response = await api.put(`/kontak-darurat/${id}`, data);
  return response.data as KontakDarurat;
};

export const deleteKontakDarurat = async (id: string): Promise<void> => {
  await api.delete(`/kontak-darurat/${id}`);
};

// PusatEvakuasi API functions
export const getAllPusatEvakuasi = async (): Promise<PusatEvakuasi[]> => {
  const response = await api.get("/pusat-evakuasi");
  return response.data as PusatEvakuasi[];
};

export const getPusatEvakuasiById = async (
  id: string
): Promise<PusatEvakuasi> => {
  const response = await api.get(`/pusat-evakuasi/${id}`);
  return response.data as PusatEvakuasi;
};

export const createPusatEvakuasi = async (
  data: PusatEvakuasi
): Promise<PusatEvakuasi> => {
  const response = await api.post("/pusat-evakuasi", data);
  return response.data as PusatEvakuasi;
};

export const updatePusatEvakuasi = async (
  id: string,
  data: Partial<PusatEvakuasi>
): Promise<PusatEvakuasi> => {
  const response = await api.put(`/pusat-evakuasi/${id}`, data);
  return response.data as PusatEvakuasi;
};

export const deletePusatEvakuasi = async (id: string): Promise<void> => {
  await api.delete(`/pusat-evakuasi/${id}`);
};

// KorbanHilang API functions
export const getAllKorbanHilang = async (): Promise<KorbanHilang[]> => {
  const response = await api.get("/korban-hilang");
  return response.data as KorbanHilang[];
};

export const getKorbanHilangById = async (
  id: string
): Promise<KorbanHilang> => {
  const response = await api.get(`/korban-hilang/${id}`);
  return response.data as KorbanHilang;
};

export const createKorbanHilang = async (
  data: KorbanHilang
): Promise<KorbanHilang> => {
  const response = await api.post("/korban-hilang", data);
  return response.data as KorbanHilang;
};

export const updateKorbanHilang = async (
  id: string,
  data: Partial<KorbanHilang>
): Promise<KorbanHilang> => {
  const response = await api.put(`/korban-hilang/${id}`, data);
  return response.data as KorbanHilang;
};

export const deleteKorbanHilang = async (id: string): Promise<void> => {
  await api.delete(`/korban-hilang/${id}`);
};

// Relawan API functions
export const getAllRelawan = async (): Promise<Relawan[]> => {
  const response = await api.get("/relawan");
  return response.data as Relawan[];
};

export const getRelawanById = async (id: string): Promise<Relawan> => {
  const response = await api.get(`/relawan/${id}`);
  return response.data as Relawan;
};

export const createRelawan = async (data: Relawan): Promise<Relawan> => {
  const response = await api.post("/relawan", data);
  return response.data as Relawan;
};

export const updateRelawan = async (
  id: string,
  data: Partial<Relawan>
): Promise<Relawan> => {
  const response = await api.put(`/relawan/${id}`, data);
  return response.data as Relawan;
};

export const deleteRelawan = async (id: string): Promise<void> => {
  await api.delete(`/relawan/${id}`);
};

// Kebutuhan API functions
export const getAllKebutuhan = async (): Promise<Kebutuhan[]> => {
  const response = await api.get("/kebutuhan");
  return response.data as Kebutuhan[];
};

export const getKebutuhanById = async (id: string): Promise<Kebutuhan> => {
  const response = await api.get(`/kebutuhan/${id}`);
  return response.data as Kebutuhan;
};

export const createKebutuhan = async (data: Kebutuhan): Promise<Kebutuhan> => {
  const response = await api.post("/kebutuhan", data);
  return response.data as Kebutuhan;
};

export const updateKebutuhan = async (
  id: string,
  data: Partial<Kebutuhan>
): Promise<Kebutuhan> => {
  const response = await api.put(`/kebutuhan/${id}`, data);
  return response.data as Kebutuhan;
};

export const deleteKebutuhan = async (id: string): Promise<void> => {
  await api.delete(`/kebutuhan/${id}`);
};

// Donasi API functions
export const getAllDonasi = async (): Promise<Donasi[]> => {
  const response = await api.get("/donasi");
  return response.data as Donasi[];
};

export const getDonasiById = async (id: string): Promise<Donasi> => {
  const response = await api.get(`/donasi/${id}`);
  return response.data as Donasi;
};

export const createDonasi = async (data: Donasi): Promise<Donasi> => {
  const response = await api.post("/donasi", data);
  return response.data as Donasi;
};

export const updateDonasi = async (
  id: string,
  data: Partial<Donasi>
): Promise<Donasi> => {
  const response = await api.put(`/donasi/${id}`, data);
  return response.data as Donasi;
};

export const deleteDonasi = async (id: string): Promise<void> => {
  await api.delete(`/donasi/${id}`);
};
