'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Search } from 'lucide-react';
import type { SertifikatData, SertifikatInput } from '../types';
import type { BookingSubmission } from '@/app/types/types';
import { createSertifikat } from '@/app/services/sertifikat.services';
import Swal from 'sweetalert2';

type CertificateFormState = {
  student_name: string;
  no_sertifikat: string;
  tgl_sertifikat: string;
  level_sertifikat: SertifikatData['level_sertifikat'] | '';
  fileproof_sertifikat: File | null;
  fileproof_laporanbulanan: File | null;
};

type FileField = 'fileproof_sertifikat' | 'fileproof_laporanbulanan';

const initialForm: CertificateFormState = {
  student_name: '',
  no_sertifikat: '',
  tgl_sertifikat: '',
  level_sertifikat: '',
  fileproof_sertifikat: null,
  fileproof_laporanbulanan: null,
};

const maxFileSize = 5 * 1024 * 1024;
const certificateLevels = [1, 2, 3, 4, 5];

function parseCertificateLevel(value: string): SertifikatData['level_sertifikat'] | '' {
  const level = Number(value);
  return certificateLevels.includes(level) ? level : '';
}

function getFileError(file: File): string | undefined {
  const isPdf = file.name.toLowerCase().endsWith('.pdf')
    && (!file.type || file.type === 'application/pdf');

  if (!isPdf) return 'File harus berformat PDF.';
  if (file.size > maxFileSize) return 'Ukuran file maksimal 5 MB.';
  return undefined;
}

export default function CertificateAddModal({
  onClose,
  isOpen,
  booking,
  isLoadingStudents,
  studentsError,
  onSaved,
}: {
  onClose: () => void;
  isOpen: boolean;
  booking: BookingSubmission[];
  isLoadingStudents: boolean;
  studentsError: string | null;
  onSaved: () => Promise<void>;
}) {
  const [form, setForm] = useState<CertificateFormState>({ ...initialForm });
  const [fileErrors, setFileErrors] = useState<Partial<Record<FileField, string>>>({});
  const [studentSearch, setStudentSearch] = useState('');
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [studentError, setStudentError] = useState('');

  const studentNames = [...new Set(
    booking.map((student) => student.student_name.trim()).filter(Boolean),
  )].sort((first, second) => first.localeCompare(second, 'id'));
  const filteredStudentNames = studentNames.filter((studentName) =>
    studentName.toLowerCase().includes(studentSearch.trim().toLowerCase()),
  );

  const handleFileChange = (field: FileField, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;
    const error = file ? getFileError(file) : undefined;

    setForm((current) => ({ ...current, [field]: error ? null : file }));
    setFileErrors((current) => ({ ...current, [field]: error }));

    if (error) event.currentTarget.value = '';
  };

  const handleClose = () => {
    setForm({ ...initialForm });
    setFileErrors({});
    setStudentSearch('');
    setIsStudentDropdownOpen(false);
    setStudentError('');
    onClose();
  };

  const handleSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (!form.student_name) {
    setStudentError("Pilih nama siswa terlebih dahulu.");
    return;
  }

  const certificateFileError = form.fileproof_sertifikat
    ? getFileError(form.fileproof_sertifikat)
    : undefined;

  const monthlyReportFileError = form.fileproof_laporanbulanan
    ? getFileError(form.fileproof_laporanbulanan)
    : undefined;

  setFileErrors({
    fileproof_sertifikat: certificateFileError,
    fileproof_laporanbulanan: monthlyReportFileError,
  });

  if (
    !form.no_sertifikat.trim() ||
    !form.tgl_sertifikat ||
    !form.level_sertifikat ||
    !form.fileproof_sertifikat ||
    !form.fileproof_laporanbulanan ||
    certificateFileError ||
    monthlyReportFileError
  ) {
    return;
  }

  try {
    const sertifikat: SertifikatInput = {
      no_sertifikat: form.no_sertifikat.trim(),
      student_name: form.student_name,
      tgl_sertifikat: new Date(`${form.tgl_sertifikat}T00:00:00`),
      level_sertifikat: form.level_sertifikat,
      fileproof_sertifikat: form.fileproof_sertifikat.name,
      fileproof_laporanbulanan: form.fileproof_laporanbulanan.name,
    };
    const formData = new FormData();

    formData.append('no_sertifikat', sertifikat.no_sertifikat);
    formData.append('student_name', sertifikat.student_name);
    formData.append('tgl_sertifikat', form.tgl_sertifikat);
    formData.append('level_sertifikat', String(sertifikat.level_sertifikat));
    formData.append(
      "fileproof_sertifikat",
      form.fileproof_sertifikat,
      sertifikat.fileproof_sertifikat,
    );
    formData.append(
      "fileproof_laporanbulanan",
      form.fileproof_laporanbulanan,
      sertifikat.fileproof_laporanbulanan,
    );

    const response = await createSertifikat(formData);
    if (!response.success) {
      throw new Error(response.message || "Sertifikat gagal disimpan.");
    }

    await onSaved();
    await Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: response.message || "Sertifikat berhasil disimpan.",
      timer: 2000,
      showConfirmButton: false,
    });
    handleClose();
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error!",
      text: error instanceof Error
        ? error.message
        : "Terjadi kesalahan server.",
    });
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Tambah Sertifikat</h2>
            <p className="mt-1 text-sm text-slate-500">
              Lengkapi data sertifikat dan unggah file PDF maksimal 5 MB.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Tutup modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
            <div>
              <label htmlFor="certificate-student" className="mb-1 block text-sm font-medium text-slate-700">
                Nama Siswa
              </label>
              <div
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsStudentDropdownOpen(false);
                    setStudentSearch('');
                  }
                }}
              >
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                id="certificate-student"
                    type="text"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={isStudentDropdownOpen}
                    aria-controls="certificate-student-options"
                    aria-required="true"
                    aria-invalid={Boolean(studentError)}
                    aria-describedby={studentError ? 'certificate-student-error' : undefined}
                    autoComplete="off"
                    placeholder={isLoadingStudents ? 'Memuat nama siswa...' : 'Cari atau pilih nama siswa'}
                    value={isStudentDropdownOpen ? studentSearch : form.student_name}
                    onFocus={() => {
                      if (!isStudentDropdownOpen) {
                        setStudentSearch('');
                        setIsStudentDropdownOpen(true);
                      }
                    }}
                    onChange={(event) => {
                      setStudentSearch(event.target.value);
                      setIsStudentDropdownOpen(true);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        setIsStudentDropdownOpen(false);
                        setStudentSearch('');
                      }
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100 disabled:bg-slate-50"
                    disabled={isLoadingStudents || studentNames.length === 0}
                  />
                </div>
                {isStudentDropdownOpen && (
                  <div
                    id="certificate-student-options"
                    role="listbox"
                    aria-label="Daftar nama siswa"
                    className="absolute z-20 mt-1 max-h-52 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
                  >
                    {filteredStudentNames.length > 0 ? (
                      filteredStudentNames.map((studentName) => (
                        <button
                          key={studentName}
                          type="button"
                          role="option"
                          aria-selected={form.student_name === studentName}
                          onClick={() => {
                            setForm((current) => ({ ...current, student_name: studentName }));
                            setStudentSearch('');
                            setIsStudentDropdownOpen(false);
                            setStudentError('');
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-marine-50 focus:bg-marine-50 focus:outline-none"
                        >
                          {studentName}
                        </button>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-sm text-slate-500">
                        Tidak ada nama siswa yang cocok.
                      </p>
                    )}
                  </div>
                )}
              </div>
              {studentError && (
                <p id="certificate-student-error" className="mt-1 text-xs text-red-600" role="alert">
                  {studentError}
                </p>
              )}
              {studentsError && (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  Gagal memuat daftar siswa: {studentsError}
                </p>
              )}
              {!isLoadingStudents && !studentsError && studentNames.length === 0 && (
                <p className="mt-1 text-xs text-slate-500">
                  Belum ada data siswa dari booking.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="certificate-number" className="mb-1 block text-sm font-medium text-slate-700">
                No Sertifikat
              </label>
              <input
                id="certificate-number"
                type="text"
                value={form.no_sertifikat}
                onChange={(event) => setForm((current) => ({
                  ...current,
                  no_sertifikat: event.target.value,
                }))}
                placeholder="Masukkan nomor sertifikat"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
                required
              />
            </div>

            <div>
              <label htmlFor="certificate-date" className="mb-1 block text-sm font-medium text-slate-700">
                Tanggal Sertifikat
              </label>
              <input
                id="certificate-date"
                type="date"
                value={form.tgl_sertifikat}
                onChange={(event) => setForm((current) => ({
                  ...current,
                  tgl_sertifikat: event.target.value,
                }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
                required
              />
            </div>


            <div>
              <label htmlFor="certificate-level" className="mb-1 block text-sm font-medium text-slate-700">
                Level Sertifikat
              </label>
              <select
                id="certificate-level"
                value={form.level_sertifikat}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    level_sertifikat: parseCertificateLevel(event.target.value),
                  }));
                }}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
                required
              >
                <option value="" disabled>Pilih level</option>
                {certificateLevels.map((level) => (
                  <option key={level} value={level}>Level {level}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="certificate-file" className="mb-1 block text-sm font-medium text-slate-700">
                File Sertifikat (PDF, maks. 5 MB)
              </label>
              <input
                id="certificate-file"
                type="file"
                accept="application/pdf,.pdf"
                onChange={(event) => handleFileChange('fileproof_sertifikat', event)}
                aria-invalid={Boolean(fileErrors.fileproof_sertifikat)}
                aria-describedby="certificate-file-error"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-marine-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-marine-700"
                required
              />
              {fileErrors.fileproof_sertifikat && (
                <p id="certificate-file-error" className="mt-1 text-xs text-red-600">
                  {fileErrors.fileproof_sertifikat}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="monthly-report-file" className="mb-1 block text-sm font-medium text-slate-700">
                File Laporan Bulanan (PDF, maks. 5 MB)
              </label>
              <input
                id="monthly-report-file"
                type="file"
                accept="application/pdf,.pdf"
                onChange={(event) => handleFileChange('fileproof_laporanbulanan', event)}
                aria-invalid={Boolean(fileErrors.fileproof_laporanbulanan)}
                aria-describedby="monthly-report-file-error"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-marine-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-marine-700"
                required
              />
              {fileErrors.fileproof_laporanbulanan && (
                <p id="monthly-report-file-error" className="mt-1 text-xs text-red-600">
                  {fileErrors.fileproof_laporanbulanan}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-xl bg-marine-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-marine-700"
            >
              Simpan Sertifikat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
