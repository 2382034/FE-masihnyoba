// src/pages/DataMahasiswa.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as mahasiswaApi from '../services/mahasiswaApi';
import type { Mahasiswa } from '../types/mahasiswa';
import { useAuth } from '../utils/AuthProvider'; // 1. Import hook useAuth
import toast from 'react-hot-toast'; // Import toast untuk notifikasi yang lebih baik

const DataMahasiswa: React.FC = () => {
  const { user } = useAuth(); // 2. Dapatkan data pengguna, termasuk perannya (role)
  const navigate = useNavigate();
  
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await mahasiswaApi.getAllMahasiswa();
        setMahasiswaList(data);
      } catch (err) {
        setError('Gagal memuat data mahasiswa. Periksa koneksi API Anda.');
        console.error(err);
        toast.error('Gagal memuat data mahasiswa.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string | number) => {
    // Menggunakan toast untuk konfirmasi, bukan window.confirm
    toast((t) => (
      <span>
        Apakah Anda yakin ingin menghapus data ini?
        <button 
          onClick={() => {
            toast.dismiss(t.id);
            proceedWithDelete(id);
          }}
          style={{ marginLeft: '10px', fontWeight: 'bold' }}
        >
          Ya, Hapus
        </button>
        <button 
          onClick={() => toast.dismiss(t.id)}
          style={{ marginLeft: '10px' }}
        >
          Batal
        </button>
      </span>
    ), { duration: 6000 });
  };
  
  const proceedWithDelete = async (id: string | number) => {
    try {
      await mahasiswaApi.deleteMahasiswa(id);
      // Refresh data setelah berhasil hapus
      setMahasiswaList(prevList => prevList.filter(m => m.id !== id));
      toast.success('Data berhasil dihapus!');
    } catch (err) {
      toast.error('Gagal menghapus data.');
      console.error(err);
    }
  };

  if (loading) return <p>Memuat data mahasiswa...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  
  // Variabel untuk mengecek apakah pengguna adalah admin
  const isAdmin = user?.role === 'admin';

  return (
    <div>
      <h1>Data Mahasiswa</h1>

      {/* 3. Tampilkan tombol "Tambah" hanya untuk admin */}
      {isAdmin && (
        <Link to="/mahasiswa/add">
          <button style={{ marginBottom: '1rem' }}>Tambah Mahasiswa Baru</button>
        </Link>
      )}

      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px' }}>NIM</th>
            <th style={{ padding: '8px' }}>Nama</th>
            <th style={{ padding: '8px' }}>Jurusan</th>
            {/* 4. Tampilkan kolom "Aksi" hanya untuk admin */}
            {isAdmin && <th style={{ padding: '8px' }}>Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {mahasiswaList.length > 0 ? (
            mahasiswaList.map((mhs) => (
              <tr key={mhs.id}>
                <td style={{ padding: '8px' }}>{mhs.nim}</td>
                <td style={{ padding: '8px' }}>{mhs.nama}</td>
                <td style={{ padding: '8px' }}>{mhs.jurusan}</td>
                {/* 5. Tampilkan tombol "Edit" & "Hapus" hanya untuk admin */}
                {isAdmin && (
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <button onClick={() => navigate(`/mahasiswa/edit/${mhs.id}`)} style={{ marginRight: '5px' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(mhs.id)}>
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              {/* 6. Sesuaikan colspan berdasarkan peran pengguna */}
              <td colSpan={isAdmin ? 4 : 3} style={{ textAlign: 'center', padding: '8px' }}>
                Tidak ada data mahasiswa.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataMahasiswa;
