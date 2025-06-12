// src/pages/Register.tsx
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form"; // Impor SubmitHandler untuk tipe
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { registerApi } from '../services/authApiService'; // Pastikan file ini ada

// Tipe untuk input form registrasi
export type RegisterInput = {
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
};

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    defaultValues: { role: 'user' }
  });

  // Konfigurasi useMutation untuk menggunakan 'registerApi'
  const { mutate, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      // Logika setelah registrasi berhasil
      toast.success("Registrasi berhasil! Silakan login.");
      navigate("/login");
    },
    onError: (err: any) => {
      // Penanganan error terpusat
      console.error("Registration error:", err);
      const errorMessage = err.response?.data?.message || "Registrasi gagal. Cek kembali data Anda.";
      toast.error(errorMessage);
    }
  });

  // PERUBAHAN: Membuat fungsi handler submit yang eksplisit
  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    // Memanggil fungsi mutate dengan data dari form
    mutate(data);
  };

  const inputStyle = "w-full p-3 border rounded-md focus:outline-none focus:ring-2 shadow-sm";
  const errorBorderStyle = "border-red-500 focus:ring-red-500";
  const defaultBorderStyle = "border-gray-300 focus:ring-blue-500";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center items-center p-8 md:p-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Selamat Datang!</h1>
        <p className="text-lg md:text-xl text-center mb-8 max-w-md opacity-90">
          Buat akun untuk mengakses Portal Data Mahasiswa. Kelola data diri, lihat informasi akademik, dan banyak lagi.
        </p>
        <Link to="/login" className="flex items-center bg-white text-blue-700 font-semibold rounded-lg py-3 px-8 hover:bg-blue-50 transition-colors shadow-md">
          <span className="mr-2">Sudah punya akun? Login</span>
        </Link>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/5 bg-white flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Buat Akun Baru
          </h2>
          {/* PERUBAHAN: Menggunakan fungsi 'onSubmit' yang baru */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" className={`${inputStyle} ${errors.username ? errorBorderStyle : defaultBorderStyle}`} {...register("username", { required: "Username wajib diisi" })} placeholder="Contoh: budi.sanjaya"/>
              {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className={`${inputStyle} ${errors.email ? errorBorderStyle : defaultBorderStyle}`} {...register("email", { required: "Email wajib diisi", pattern: { value: /^\S+@\S+$/i, message: "Format email tidak valid" } })} placeholder="email@example.com"/>
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" className={`${inputStyle} ${errors.password ? errorBorderStyle : defaultBorderStyle}`} {...register("password", { required: "Password wajib diisi", minLength: { value: 8, message: "Password minimal 8 karakter" } })} placeholder="••••••••"/>
              {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Daftar Sebagai</label>
              <select id="role" className={`${inputStyle} ${errors.role ? errorBorderStyle : defaultBorderStyle}`} {...register("role", { required: "Peran wajib dipilih" })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-red-600 text-xs mt-1">{errors.role.message}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed" disabled={isPending}>
              {isPending ? "Mendaftar..." : "Daftar Akun"}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
