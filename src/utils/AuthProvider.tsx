// src/utils/AuthProvider.tsx
import { createContext, ReactNode, useContext, useState } from "react";

// Interface User sudah benar, sudah ada properti 'role'
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

// Tipe untuk context juga sudah benar
export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  getToken: () => string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Fungsi helper untuk mendapatkan state awal dari localStorage
// Ini membuat komponen utama lebih bersih
const getInitialAuthState = (): { user: User | null, isAuthenticated: boolean } => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (token && storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser) as User;
      // Validasi sederhana untuk memastikan data user di localStorage valid
      if (parsedUser && parsedUser.id && parsedUser.username && parsedUser.role) {
        return { user: parsedUser, isAuthenticated: true };
      }
    } catch (error) {
      console.error("Gagal mem-parsing data user dari localStorage:", error);
    }
  }

  // Jika ada masalah, bersihkan localStorage untuk menghindari state yang tidak konsisten
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return { user: null, isAuthenticated: false };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialState = getInitialAuthState();
  const [user, setUser] = useState<User | null>(initialState.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState.isAuthenticated);

  const login = (token: string, userData: User) => {
    // Validasi penting: pastikan data user yang diterima saat login memiliki 'role'
    if (!userData || !userData.role) {
      console.error("Login gagal: Data user tidak lengkap atau tidak memiliki 'role'.");
      return; // Batalkan login jika data tidak valid
    }
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const getToken = (): string | null => {
    return localStorage.getItem("token");
  };

  const value = { isAuthenticated, user, login, logout, getToken };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan context, sudah benar
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
