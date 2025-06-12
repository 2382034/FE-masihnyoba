// src/types/mahasiswa.ts

export interface Mahasiswa {
    id: string | number; // Sesuaikan dengan tipe ID dari backend Anda (string atau number)
    nim: string;
    nama: string;
    jurusan: string;
    // Tambahkan field lain jika ada, contoh:
    // angkatan: number;
    // createdAt: string;
  }