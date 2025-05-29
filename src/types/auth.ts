export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  is_approved?: boolean;
  createdAt?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  message?: string;
}
