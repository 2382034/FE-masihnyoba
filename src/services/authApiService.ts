// src/services/authApiService.ts
import AxiosInstance from "../utils/AxiosInstance";
import type { LoginInput } from "../pages/Login";
import type { RegisterInput } from "../pages/Register";
import type { User } from "../utils/AuthProvider";

// Tipe untuk respons dari API login
interface LoginResponse {
  access_token: string;
  user: User;
}

/**
 * Fungsi untuk memanggil endpoint registrasi.
 * @param data Data registrasi (username, email, password, role)
 * @returns Promise yang resolve saat registrasi berhasil
 */
export const registerApi = (data: RegisterInput): Promise<void> => {
  // Menggunakan AxiosInstance untuk mengirim data ke endpoint /auth/register
  return AxiosInstance.post("/auth/register", data);
};

/**
 * Fungsi untuk memanggil endpoint login.
 * @param data Data login (email, password)
 * @returns Promise yang berisi data respons login (token dan user)
 */
export const loginApi = async (data: LoginInput): Promise<LoginResponse> => {
  const response = await AxiosInstance.post<LoginResponse>("/auth/login", data);
  // Mengembalikan data dari respons
  return response.data;
};
