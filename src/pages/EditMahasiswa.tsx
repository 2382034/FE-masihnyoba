// src/pages/EditMahasiswa.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MahasiswaForm from '../components/MahasiswaForm';
import * as mahasiswaApi from '../services/mahasiswaApi';
import type { Mahasiswa } from '../types/mahasiswa';

const EditMahasiswa: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ambil ID dari URL
  const navigate = useNavigate();
  
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchMahasiswa = async () => {
      try {
        setIsFetching(true);
        const data = await mahasiswaApi.getMahasiswaById(id);
        setMahasiswa(data);
      } catch (error) {
        alert('Gagal mengambil data mahasiswa.');
        console.error(error);
        navigate('/mahasiswa');
      } finally {
        setIsFetching(false);
      }
    };
    fetchMahasiswa();
  }, [id, navigate]);

  const handleUpdateMahasiswa = async (data: Omit<Mahasiswa, 'id'>) => {
    if (!id) return;
    try {
      setIsLoading(true);
      await mahasiswaApi.updateMahasiswa(id, data);
      alert('Data mahasiswa berhasil diperbarui!');
      navigate('/mahasiswa');
    } catch (error) {
      alert('Gagal memperbarui data.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <p>Memuat form...</p>;
  if (!mahasiswa) return <p>Data mahasiswa tidak ditemukan.</p>;

  return (
    <div>
      <h1>Edit Data Mahasiswa</h1>
      <MahasiswaForm
        initialData={mahasiswa}
        onSubmit={handleUpdateMahasiswa}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditMahasiswa;