import axios from "axios";
import { LoginResponse } from "@/types/auth";
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
  KorbanHilangInput,
  DonasiInput,
  RelawanInput,
  KebutuhanInput,
  Admin,
  PendingAdmin,
  AdminInput,
  PendingAdminInput,
  User,
  UserInput,
} from "../types/models";

// Initialize axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Set initial token if exists
const initialToken = localStorage.getItem("token");
if (initialToken) {
  const cleanToken = initialToken.replace(/^Bearer\s+/i, "");
  api.defaults.headers.common["Authorization"] = `Bearer ${cleanToken}`;
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Skip token check for login and register
    if (
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register")
    ) {
      return config;
    }

    const token = localStorage.getItem("token");

    if (token) {
      const cleanToken = token.replace(/^Bearer\s+/i, "");
      const authHeader = `Bearer ${cleanToken}`;
      config.headers.Authorization = authHeader;
      api.defaults.headers.common["Authorization"] = authHeader;
    } else {
      delete config.headers.Authorization;
      delete api.defaults.headers.common["Authorization"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Only clear token and redirect on 401 for specific endpoints
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      // Don't clear token for login/register endpoints
      if (!url.includes("/auth/login") && !url.includes("/auth/register")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      // Check if we have the minimum required data
      if (!response.data.token) {
        throw new Error("No authentication token received");
      }

      // Store token and user data immediately
      const token = response.data.token;
      localStorage.setItem("token", token);

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // Set token in axios default headers
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return response.data;
    } catch (error) {
      // Clear any existing auth data on error
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
      throw error;
    }
  },
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
  getUserInfo: async (): Promise<User> => {
    try {
      // Try to get user data from localStorage first
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        return JSON.parse(storedUser);
      }

      // If not in localStorage, get from the server
      const response = await api.get<User>("/auth/me");
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getPendingUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/auth/users/pending");
    return response.data;
  },
};

// Bencana API
export const bencanaApi = {
  getAll: async (): Promise<Bencana[]> => {
    const response = await api.get<Bencana[]>("/bencana");
    return response.data;
  },
  getById: async (id: string): Promise<Bencana> => {
    const response = await api.get<Bencana>(`/bencana/${id}`);
    return response.data;
  },
  create: async (data: Bencana): Promise<Bencana> => {
    const response = await api.post<Bencana>("/bencana", data);
    return response.data;
  },
  update: async (id: string, data: Partial<Bencana>): Promise<Bencana> => {
    const response = await api.put<Bencana>(`/bencana/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/bencana/${id}`);
  },
};

// Lokasi API
export const lokasiApi = {
  getAll: async (): Promise<Lokasi[]> => {
    const response = await api.get<Lokasi[]>("/lokasi");
    return response.data;
  },
  create: async (data: Lokasi): Promise<Lokasi> => {
    const response = await api.post<Lokasi>("/lokasi", data);
    return response.data;
  },
};

// Kabupaten API
export const kabupatenApi = {
  getAll: async (): Promise<Kabupaten[]> => {
    const response = await api.get<Kabupaten[]>("/kabupaten");
    return response.data;
  },
};

// JumlahKorban API
export const jumlahKorbanApi = {
  getAll: async (): Promise<JumlahKorban[]> => {
    const response = await api.get<JumlahKorban[]>("/jumlah-korban");
    return response.data;
  },
  getById: async (id: string): Promise<JumlahKorban> => {
    const response = await api.get<JumlahKorban>(`/jumlah-korban/${id}`);
    return response.data;
  },
  create: async (data: JumlahKorban): Promise<JumlahKorban> => {
    const response = await api.post<JumlahKorban>("/jumlah-korban", data);
    return response.data;
  },
};

// KontakDarurat API
export const kontakDaruratApi = {
  getAll: async (): Promise<KontakDarurat[]> => {
    const response = await api.get<KontakDarurat[]>("/kontak-darurat");
    return response.data;
  },
  getById: async (id: string): Promise<KontakDarurat> => {
    const response = await api.get<KontakDarurat>(`/kontak-darurat/${id}`);
    return response.data;
  },
  create: async (data: KontakDarurat): Promise<KontakDarurat> => {
    const response = await api.post<KontakDarurat>("/kontak-darurat", data);
    return response.data;
  },
};

// PusatEvakuasi API
export const pusatEvakuasiApi = {
  getAll: async (): Promise<PusatEvakuasi[]> => {
    const response = await api.get<PusatEvakuasi[]>("/pusat-evakuasi");
    return response.data;
  },
};

// KorbanHilang API
export const korbanHilangApi = {
  getAll: async (): Promise<KorbanHilang[]> => {
    const response = await api.get<KorbanHilang[]>("/korban-hilang");
    return response.data;
  },
  getById: async (id: string): Promise<KorbanHilang> => {
    const response = await api.get<KorbanHilang>(`/korban-hilang/${id}`);
    return response.data;
  },
  create: async (data: KorbanHilangInput): Promise<KorbanHilang> => {
    const response = await api.post<KorbanHilang>("/korban-hilang", data);
    return response.data;
  },
  update: async (
    id: string,
    data: Partial<KorbanHilang>
  ): Promise<KorbanHilang> => {
    const response = await api.put<KorbanHilang>(`/korban-hilang/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/korban-hilang/${id}`);
  },
};

// Relawan API
export const relawanApi = {
  getAll: async (): Promise<Relawan[]> => {
    const response = await api.get<Relawan[]>("/relawan");
    return response.data;
  },
  getById: async (id: string): Promise<Relawan> => {
    const response = await api.get<Relawan>(`/relawan/${id}`);
    return response.data;
  },
  create: async (data: RelawanInput): Promise<Relawan> => {
    const response = await api.post<Relawan>("/relawan", data);
    return response.data;
  },
  update: async (id: string, data: Partial<RelawanInput>): Promise<Relawan> => {
    const response = await api.put<Relawan>(`/relawan/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/relawan/${id}`);
  },
};

// Kebutuhan API
export const kebutuhanApi = {
  getAll: async (): Promise<Kebutuhan[]> => {
    const response = await api.get<Kebutuhan[]>("/kebutuhan");
    return response.data;
  },
  create: async (data: KebutuhanInput): Promise<Kebutuhan> => {
    const response = await api.post<Kebutuhan>("/kebutuhan", data);
    return response.data;
  },
  update: async (
    id: string,
    data: Partial<KebutuhanInput>
  ): Promise<Kebutuhan> => {
    const response = await api.put<Kebutuhan>(`/kebutuhan/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/kebutuhan/${id}`);
  },
};

// Donasi API
export const donasiApi = {
  getAll: async (): Promise<Donasi[]> => {
    const response = await api.get<Donasi[]>("/donasi");
    return response.data;
  },
  getById: async (id: string): Promise<Donasi> => {
    const response = await api.get<Donasi>(`/donasi/${id}`);
    return response.data;
  },
  create: async (data: DonasiInput): Promise<Donasi> => {
    const response = await api.post<Donasi>("/donasi", data);
    return response.data;
  },
  update: async (id: string, data: Partial<DonasiInput>): Promise<Donasi> => {
    const response = await api.put<Donasi>(`/donasi/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/donasi/${id}`);
  },
};

// Victim API
export const victimApi = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/victims`);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/victims/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await axios.post(`${API_URL}/victims`, data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await axios.put(`${API_URL}/victims/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/victims/${id}`);
    return response.data;
  },
};

// Aid API
export const aidApi = {
  getAll: async () => {
    const response = await api.get("/aids");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/aids/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post("/aids", data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/aids/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/aids/${id}`);
  },
};

// Volunteer API
export const volunteerApi = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/volunteers`);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/volunteers/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await axios.post(`${API_URL}/volunteers`, data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await axios.put(`${API_URL}/volunteers/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/volunteers/${id}`);
    return response.data;
  },
};

// Operational Needs API
export const operationalNeedsApi = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/operational-needs`);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/operational-needs/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await axios.post(`${API_URL}/operational-needs`, data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await axios.put(
      `${API_URL}/operational-needs/${id}`,
      data
    );
    return response.data;
  },
  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/operational-needs/${id}`);
    return response.data;
  },
};

// User API
export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/auth/users");
    return response.data;
  },
  getPendingUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/auth/users/pending");
    return response.data;
  },
  getById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/auth/users/${id}`);
    return response.data;
  },
  create: async (data: UserInput): Promise<User> => {
    const response = await api.post<User>("/auth/users", data);
    return response.data;
  },
  update: async (id: string, data: UserInput): Promise<User> => {
    const response = await api.put<User>(`/auth/users/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/auth/users/${id}`);
  },
  approve: async (id: string): Promise<User> => {
    const response = await api.post<User>(`/auth/users/${id}/approve`);
    return response.data;
  },
  reject: async (id: string): Promise<User> => {
    const response = await api.post<User>(`/auth/users/${id}/reject`);
    return response.data;
  },
};
