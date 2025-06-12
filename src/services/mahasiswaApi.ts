// src/services/mahasiswaApi.ts

import axios from 'axios';
import type { Mahasiswa } from '../types/mahasiswa';

// Ganti dengan URL base API Anda, simpan di file .env lebih baik
const API_BASE_URL = 'http://localhost:5000/api/mahasiswa';

// Membuat instance axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fungsi untuk mengambil semua data mahasiswa
export const getAllMahasiswa = async (): Promise<Mahasiswa[]> => {
  const response = await apiClient.get('/');
  return response.data;
};

// Fungsi untuk mengambil satu mahasiswa berdasarkan ID
export const getMahasiswaById = async (id: string | number): Promise<Mahasiswa> => {
  const response = await apiClient.get(`/${id}`);
  return response.data;
};

// Fungsi untuk membuat data mahasiswa baru
// Omit<Mahasiswa, 'id'> berarti kita mengirim semua field dari Mahasiswa KECUALI 'id'
export const createMahasiswa = async (data: Omit<Mahasiswa, 'id'>): Promise<Mahasiswa> => {
  const response = await apiClient.post('/', data);
  return response.data;
};

// Fungsi untuk mengupdate data mahasiswa
export const updateMahasiswa = async (id: string | number, data: Partial<Omit<Mahasiswa, 'id'>>): Promise<Mahasiswa> => {
  const response = await apiClient.put(`/${id}`, data);
  return response.data;
};

// Fungsi untuk menghapus data mahasiswa
export const deleteMahasiswa = async (id: string | number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};