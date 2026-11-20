'use client';

import { useCallback, useEffect, useState } from 'react';
import { ExternalLink, FileText, MessageCircle, Plus, Search, Trash2 } from 'lucide-react';
import { AdminShell } from '../components/AdminShell';
import CertificateAddModal from './components/addModal';
import { UseGetBooking } from '../hook/useGetBooking';
import {
  getAll,
  getSertifikatFileUrl,
  deleteSertifikat,
} from '@/app/services/sertifikat.services';
import type { SertifikatData } from './types';
import type { BookingSubmission } from '@/app/types/types';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import Link from 'next/link';

const columns = [
  'No',
  'Nama Siswa',
  'No Sertifikat',
  'Tanggal Sertifikat',
  'Level Sertifikat',
  'File Sertifikat',
  'File Laporan Bulanan',
  'Aksi',
];

function CertificateFileName({ file }: { file: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2" title={file}>
      <FileText className="h-4 w-4 shrink-0 text-marine-400" />
      <span className="max-w-[220px] truncate text-marine-700">{file}</span>
    </div>
  );
}

export default function SertifikatPage() {
  const PAGE_SIZE = 10;
  const [certificates, setCertificates] = useState<SertifikatData[]>([]);
  const [isLoadingCertificates, setIsLoadingCertificates] = useState(true);
  const [certificatesError, setCertificatesError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingCertificateId, setDeletingCertificateId] = useState<string | null>(null);
  const { booking, loading: isLoadingStudents, error: studentsError } = UseGetBooking();

  const refreshCertificates = useCallback(async () => {
    setIsLoadingCertificates(true);
    setCertificatesError(null);
    try {
      setCertificates(await getAll());
    } catch (error) {
      setCertificatesError(
        error instanceof Error ? error.message : 'Gagal memuat data sertifikat.',
      );
    } finally {
      setIsLoadingCertificates(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getAll()
      .then((data) => {
        if (isMounted) setCertificates(data);
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setCertificatesError(
            error instanceof Error ? error.message : 'Gagal memuat data sertifikat.',
          );
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingCertificates(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const findStudentBooking = (studentName: string): BookingSubmission | undefined => {
    const normalizeName = (name: string) =>
      name.trim().replace(/\s+/g, ' ').toLocaleLowerCase('id-ID');
    const normalizedStudentName = normalizeName(studentName);

    return booking.find((student) =>
      normalizeName(student.student_name) === normalizedStudentName
      && Boolean(student.phone.trim()),
    );
  };

  const shareCertificate = async (certificate: SertifikatData) => {
    const student = findStudentBooking(certificate.student_name);
    const phone = student?.phone.replace(/\D/g, '');

    if (!student || !phone) {
      await Swal.fire({
        icon: 'warning',
        title: 'Nomor WhatsApp tidak ditemukan',
        text: `Tidak ada nomor booking untuk ${certificate.student_name}.`,
      });
      return;
    }

    const whatsappPhone = phone.startsWith('0')
      ? `62${phone.slice(1)}`
      : phone.startsWith('8')
        ? `62${phone}`
        : phone;
    const certificateUrl = `${window.location.origin}/sertifikat-siswa/view/${encodeURIComponent(certificate.id)}`;
    const message = [
      `Halo ${student.student_name}, sertifikat renang Anda sudah tersedia.`,
      `No. sertifikat: ${certificate.no_sertifikat}`,
      `Level: ${certificate.level_sertifikat}`,
      `Unduh sertifikat: ${certificateUrl}`,
    ].join('\n');

    window.open(
      `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const deleteCertificate = async (certificate: SertifikatData) => {
    const result = await Swal.fire({
      title: 'Yakin hapus?',
      text: `Sertifikat ${certificate.no_sertifikat} akan dihapus permanen.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (!result.isConfirmed) return;

    setDeletingCertificateId(certificate.id);
    try {
      await deleteSertifikat(certificate.id);
      setCertificates((current) =>
        current.filter((item) => item.id !== certificate.id),
      );
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Sertifikat berhasil dihapus.',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal menghapus sertifikat',
        text: error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menghapus sertifikat.',
      });
    } finally {
      setDeletingCertificateId(null);
    }
  };

  const filteredCertificates = certificates.filter((certificate) =>
    [
      certificate.no_sertifikat,
      certificate.student_name,
      `Level ${certificate.level_sertifikat}`,
    ]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filteredCertificates.length / PAGE_SIZE));
  const paginatedCertificates = filteredCertificates.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const firstVisible = filteredCertificates.length === 0
    ? 0
    : (currentPage - 1) * PAGE_SIZE + 1;
  const lastVisible = Math.min(currentPage * PAGE_SIZE, filteredCertificates.length);


  return (
    <AdminShell title="Data Sertifikat" subtitle="Kelola sertifikat dan laporan bulanan">
      <div className="space-y-3">
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-marine-300" />
            <input
              type="search"
              placeholder="Cari nama atau nomor sertifikat..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-marine-900 outline-none transition-all placeholder:text-marine-300 focus:border-marine-400 focus:bg-white"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-marine-500 to-marine-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Tambah Sertifikat
          </button>
        </div>

        {certificatesError && (
          <p className="text-xs text-red-600" role="alert">
            Gagal memuat data sertifikat: {certificatesError}
          </p>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-marine-500">
              {filteredCertificates.length} sertifikat ditemukan
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  {columns.map((column) => (
                    <th
                      key={column}
                      className={`whitespace-nowrap px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wide text-marine-400 ${
                        column === 'Nama Siswa' ? 'w-1/4 min-w-[240px]' : ''
                      }`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoadingCertificates && (
                  <tr key="loading-certificates">
                    <td colSpan={columns.length} className="py-10 text-center text-xs text-marine-400">
                      Memuat data sertifikat...
                    </td>
                  </tr>
                )}
                {paginatedCertificates.map((certificate, index) => (
                  <tr key={certificate.id} className="transition-colors hover:bg-marine-50/40">
                    <td className="whitespace-nowrap px-3 py-2.5 text-marine-600">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}
                    </td>
                    <td className="w-1/4 min-w-[240px] whitespace-nowrap px-3 py-2.5 font-semibold text-marine-900">
                      {certificate.student_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-marine-900">
                      {certificate.no_sertifikat}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-marine-600">
                      {format(certificate.tgl_sertifikat, 'dd MMM yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-marine-600">
                      Level {certificate.level_sertifikat}
                    </td>
                    <td className="px-3 py-2.5">
                      <CertificateFileName file={certificate.fileproof_sertifikat} />
                    </td>
                    <td className="px-3 py-2.5">
                      <CertificateFileName file={certificate.fileproof_laporanbulanan} />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col items-start gap-2">
                        <Link
                          href={getSertifikatFileUrl(certificate.fileproof_sertifikat)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Link Sertifikat
                        </Link>
                        <button
                          type="button"
                          onClick={() => void shareCertificate(certificate)}
                          title={
                            findStudentBooking(certificate.student_name)
                              ? 'Bagikan sertifikat melalui WhatsApp'
                              : 'Saat dibuka, aplikasi akan memeriksa nomor WhatsApp di data booking'
                          }
                          aria-label={`Bagikan sertifikat ${certificate.no_sertifikat} melalui WhatsApp`}
                          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700 hover:bg-emerald-100"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => void deleteCertificate(certificate)}
                          disabled={deletingCertificateId !== null}
                          aria-label={`Hapus sertifikat ${certificate.no_sertifikat}`}
                          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-red-50 px-2.5 py-1.5 text-[10px] font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {deletingCertificateId === certificate.id ? 'Menghapus...' : 'Hapus'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!isLoadingCertificates && !certificatesError && filteredCertificates.length === 0 && (
                  <tr key="empty-certificates">
                    <td colSpan={columns.length} className="py-10 text-center text-xs text-marine-300">
                      {certificates.length === 0
                        ? 'Belum ada data sertifikat.'
                        : 'Tidak ada sertifikat yang cocok dengan pencarian.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCertificates.length > PAGE_SIZE && (
          <div className="flex flex-col items-center justify-between gap-2 py-2 sm:flex-row">
            <p className="text-[11px] text-marine-400">
              Menampilkan {firstVisible}-{lastVisible} dari {filteredCertificates.length} sertifikat
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-marine-600 transition-colors hover:bg-marine-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹ Sebelumnya
              </button>
              <span className="text-xs text-marine-500">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-marine-600 transition-colors hover:bg-marine-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Berikutnya ›
              </button>
            </div>
          </div>
        )}

      </div>

      <CertificateAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        booking={booking}
        isLoadingStudents={isLoadingStudents}
        studentsError={studentsError}
        onSaved={refreshCertificates}
      />
    </AdminShell>
  );
}
