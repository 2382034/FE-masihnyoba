// src/utils/PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Pastikan import dari file AuthProvider Anda

interface PrivateRouteProps {
  children: React.ReactElement;
  requiredRole?: 'admin'; // Role yang dibutuhkan untuk mengakses halaman ini (opsional)
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  // Ambil `isAuthenticated` dan `user` dari context Anda
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // 1. Cek apakah user sudah login atau belum
  if (!isAuthenticated) {
    // Jika belum login, arahkan ke halaman login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Jika halaman ini butuh role 'admin', cek apakah role user sesuai
  // `user?.role` digunakan untuk mengakses properti 'role' dengan aman
  if (requiredRole && user?.role !== requiredRole) {
    // Jika role tidak sesuai, tolak akses dan arahkan ke halaman utama
    alert('Akses Ditolak! Anda bukan Admin.'); // Beri notifikasi ke user
    return <Navigate to="/" replace />;
  }

  // 3. Jika semua pengecekan lolos, tampilkan halaman yang dituju
  return children;
};

export default PrivateRoute;
