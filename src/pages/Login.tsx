// src/pages/Login.tsx
import { useForm, SubmitHandler } from "react-hook-form"; // Impor SubmitHandler
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { loginApi } from '../services/authApiService'; // Pastikan file ini ada

// Tipe untuk input form login
export type LoginInput = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>();

  // Konfigurasi useMutation untuk menggunakan 'loginApi'
  const { mutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // Logika setelah login berhasil
      if (data && data.access_token && data.user?.role) {
        login(data.access_token, data.user);
        toast.success("Login berhasil!");
        navigate("/");
      } else {
        toast.error("Respons dari server tidak lengkap.");
      }
    },
    onError: (err: any) => {
      // Penanganan error terpusat
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Username atau password salah.";
      toast.error(errorMessage);
    }
  });

  // PERUBAHAN: Membuat fungsi handler submit yang eksplisit
  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    mutate(data);
  };

  const inputStyle = "w-full p-3 border rounded-md focus:outline-none focus:ring-2 shadow-sm";
  const errorBorderStyle = "border-red-500 focus:ring-red-500";
  const defaultBorderStyle = "border-gray-300 focus:ring-blue-500";
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center items-center p-8 md:p-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Portal Data Mahasiswa</h1>
        <p className="text-lg md:text-xl text-center mb-8 max-w-md opacity-90">
          Akses informasi akademik, kelola data, dan hubungkan diri dengan komunitas kampus.
        </p>
        <Link to="/register" className="flex items-center bg-white text-blue-700 font-semibold rounded-lg py-3 px-8 hover:bg-blue-50 transition-colors shadow-md">
          <span className="mr-2">Belum punya akun? Daftar</span>
        </Link>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/5 bg-white flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Masuk Akun</h2>
          {/* PERUBAHAN: Menggunakan fungsi 'onSubmit' yang baru */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username atau Email</label>
              <input type="text" className={`${inputStyle} ${errors.email ? errorBorderStyle : defaultBorderStyle}`} {...register("email", { required: "Field ini wajib diisi" })} placeholder="username atau email@example.com"/>
              {errors.email && (<p className="text-red-500 text-xs mt-1">{errors.email.message}</p>)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" className={`${inputStyle} ${errors.password ? errorBorderStyle : defaultBorderStyle}`} {...register("password", { required: "Password wajib diisi" })} placeholder="••••••••"/>
              {errors.password && (<p className="text-red-500 text-xs mt-1">{errors.password.message}</p>)}
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed" disabled={isPending}>
              {isPending ? "Memproses..." : "Login"}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
