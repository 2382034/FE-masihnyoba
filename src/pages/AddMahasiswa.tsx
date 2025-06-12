// src/pages/AddMahasiswa.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MahasiswaForm from '../components/MahasiswaForm';
import * as mahasiswaApi from '../services/mahasiswaApi';
import type { Mahasiswa } from '../types/mahasiswa';

const AddMahasiswa: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMahasiswa = async (data: Omit<Mahasiswa, 'id'>) => {
    try {
      setIsLoading(true);
      await mahasiswaApi.createMahasiswa(data);
      alert('Data mahasiswa berhasil ditambahkan!');
      navigate('/mahasiswa'); // Arahkan kembali ke halaman daftar
    } catch (error) {
      alert('Gagal menambahkan data. Periksa konsol untuk detail.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Tambah Data Mahasiswa Baru</h1>
      <MahasiswaForm onSubmit={handleAddMahasiswa} isLoading={isLoading} />
    </div>
  );
};

export default AddMahasiswa;