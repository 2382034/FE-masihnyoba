// src/components/MahasiswaForm.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { Mahasiswa } from '../types/mahasiswa';

// Tipe untuk input form, tanpa ID karena ID dibuat oleh server
type FormInputs = Omit<Mahasiswa, 'id'>;

interface MahasiswaFormProps {
  initialData?: Mahasiswa; // Data awal untuk mode edit (opsional)
  onSubmit: SubmitHandler<FormInputs>;
  isLoading?: boolean;
}

const MahasiswaForm: React.FC<MahasiswaFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: initialData || { nim: '', nama: '', jurusan: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="nim">NIM</label>
        <input
          id="nim"
          {...register('nim', { required: 'NIM tidak boleh kosong' })}
          placeholder="Contoh: 11223344"
          disabled={isLoading}
        />
        {errors.nim && <p style={{ color: 'red' }}>{errors.nim.message}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="nama">Nama Lengkap</label>
        <input
          id="nama"
          {...register('nama', { required: 'Nama tidak boleh kosong' })}
          placeholder="Contoh: Budi Sanjaya"
          disabled={isLoading}
        />
        {errors.nama && <p style={{ color: 'red' }}>{errors.nama.message}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="jurusan">Jurusan</label>
        <input
          id="jurusan"
          {...register('jurusan', { required: 'Jurusan tidak boleh kosong' })}
          placeholder="Contoh: Teknik Informatika"
          disabled={isLoading}
        />
        {errors.jurusan && <p style={{ color: 'red' }}>{errors.jurusan.message}</p>}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Menyimpan...' : (initialData ? 'Update Data' : 'Simpan Data Baru')}
      </button>
    </form>
  );
};

export default MahasiswaForm;