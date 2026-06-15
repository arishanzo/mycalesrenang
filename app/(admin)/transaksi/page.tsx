'use client';

import { useState } from 'react';
import { AdminShell } from '../components/AdminShell';
import { UseGetBooking } from '../hook/useGetBooking';
import { BookingSubmission } from '@/app/types/types';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { updateStatusBooking } from '@/app/services/transaksi.services';
import Swal from 'sweetalert2';
import { MYCA_PACKAGES } from '@/app/libs/data';

const BADGE: Record<string, string> = {
  Lunas: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Gagal: 'bg-red-50 text-red-600 ring-1 ring-red-200',
};


// type Transaksi = {
//   id: string; name: string; program: string; nominal: number;
//   metode: string; status: string; tanggal: string; keterangan: string;
// };

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

export default function TransaksiPage() {
   const { booking } =  UseGetBooking();
    const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterMetode, setFilterMetode] = useState('Semua');
  const [detail, setDetail] = useState<BookingSubmission | null>(null);


  const filtered = booking?.filter((s) => {
    const matchSearch = s.student_name.toLowerCase().includes(search.toLowerCase()) || s.phone.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || s.status === filterStatus;
    const matchProgram = filterMetode === 'Semua' || String(s.package_id) === filterMetode;
    return matchSearch && matchStatus && matchProgram;
  }) ?? [];

  const totalLunas = booking?.filter((t) => t.status ===  'Terkonfirmasi').reduce((a, t) => a + t.total_price, 0) ?? 0;
  const totalPending = booking?.filter((t) => t.status ===  'Menunggu Konfirmasi').reduce((a, t) => a + t.total_price, 0) ?? 0;

  const stats = [
    { label: 'Total Transaksi', value: `${booking?.length}`, sub: 'semua waktu', color: '#296da4' },
    { label: 'Pendapatan Lunas', value: fmt(totalLunas), sub: 'terkonfirmasi', color: '#059669' },
    { label: 'Menunggu', value: fmt(totalPending), sub: 'belum dikonfirmasi', color: '#d97706' },
    { label: 'Bulan Ini', value: fmt(totalLunas), sub: 'Jun 2025', color: '#7c3aed' },
  ];

 const handleKonfirmasi = async (t: BookingSubmission) => {
   const newStatus = "Terkonfirmasi";
   setLoading(true);
  try {
    const res = await updateStatusBooking(t.id, newStatus);

    if (res) {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Konfirmasi berhasil dilakukan.",
        timer: 2000,
        showConfirmButton: false,
     })
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Konfirmasi gagal, coba lagi.",
      })
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Terjadi kesalahan server.",
    })

  } finally {
     setTimeout(() => {
        window.location.reload();
      }, 4500);
    setLoading(false);
  }
};


  return (
    <AdminShell title="Transaksi" subtitle="Riwayat dan kelola transaksi pembayaran">
      <div className="space-y-3">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-marine-400 text-[11px] font-medium">{s.label}</p>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
              </div>
              <p className="text-marine-950 font-bold text-base leading-none">{s.value}</p>
              <p className="text-marine-400 text-[10px] mt-1">{s.sub}</p>
              <div className="mt-2 h-0.5 bg-slate-100 rounded-full">
                <div className="h-0.5 rounded-full w-2/3" style={{ background: s.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
          <div className="relative flex-1 min-w-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-marine-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
              </svg>
            </span>
            <input type="text" placeholder="Cari nama atau ID transaksi..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-marine-400 focus:bg-white transition-all text-marine-900 placeholder:text-marine-300" />
          </div>
          <div className="flex gap-2 shrink-0">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 text-marine-700 outline-none focus:border-marine-400 cursor-pointer">
              {['Semua', 'Terkonfirmasi', 'Menunggu Konfirmasi'].map((o) => <option key={o}>{o}</option>)}
            </select>
            <select value={filterMetode} onChange={(e) => setFilterMetode(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 text-marine-700 outline-none focus:border-marine-400 cursor-pointer">
              {['Semua', 'privat', 'semiprivat', 'grup'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
       
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
            <p className="text-marine-500 text-[11px] font-semibold uppercase tracking-wider">{filtered.length} transaksi</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Kode Booking', 'Siswa', 'Paket',  'Nominal', 'Status',  'Program', 'Category', 'Type',  'Tanggal Mulai', 'Lihat Pembayaran', 'Aksi'].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-marine-400 font-semibold uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-marine-50/40 transition-colors">
                    <td className="px-3 py-2.5">
                      <span className="font-mono text-[10px] text-marine-500 bg-marine-50 px-1.5 py-0.5 rounded">{t.booking_code}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                          style={{ background: 'linear-gradient(135deg,#1a5182,#3b8bc4)' }}>
                          {t.student_name.charAt(0)}
                        </div>
                        <span className="text-marine-900 font-semibold whitespace-nowrap">{t.student_name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-marine-500">{t.package_id}</td>
                    <td className="px-3 py-2.5 text-marine-900 font-semibold whitespace-nowrap">{fmt(t.total_price)}</td>
                     <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${BADGE[t.status]}`}>{t.status}</span>
                    </td>
                       <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full`}>{MYCA_PACKAGES.find(p => p.id === t?.package_id)?.name}</span>
                    </td>

                       <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full`}>{MYCA_PACKAGES.find(p => p.id === t?.package_id)?.category}</span>
                    </td>

                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full`}>{MYCA_PACKAGES.find(p => p.id === t?.package_id)?.type}</span>
                    </td>
                   
                   
                      <td className="px-3 py-2.5 text-marine-400 whitespace-nowrap">{new Date(t.start_date).toLocaleDateString('id-ID')}</td>

                   
                   
                    <td className="px-3 py-2.5">
                      <button onClick={() => setDetail(t)}
                        className="p-1.5 rounded-lg hover:bg-marine-100 text-marine-400 hover:text-marine-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                      </button>
                    </td>

                    <td className="px-3 py-2.5">
              <button
                onClick={() => handleKonfirmasi(t)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
                          bg-gradient-to-r from-green-500 to-emerald-600 
                          text-white text-xs font-semibold shadow-sm 
                          hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <CheckCircle2 className='w-4 h-4' />
                <span> { loading ? 'Prosess...' : ' Konfirmasi' }</span>
              </button>
            </td>

                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-10 text-marine-300 text-xs">Tidak ada transaksi ditemukan.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

   {/* Detail Modal */}
{detail && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 
                  bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between 
                      bg-gradient-to-r from-slate-900 to-blue-900">
        <div>
          <p className="text-white font-semibold text-sm">Detail Bukti Pembayaran</p>
          <p className="text-slate-300 text-[11px] font-mono">{detail.id}</p>
        </div>
        <button
          onClick={() => setDetail(null)}
          className="text-slate-300 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Image Preview */}
        <div className="flex justify-center">
          <Image
            width={300}
            height={200}
            className="rounded-lg shadow-md object-cover"
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/transkasi/buktitf/${detail?.paymentProof}`}
            alt="Bukti Pembayaran"
            unoptimized
          />
        </div>

        {/* Status */}
        <div className="flex items-center justify-between py-2 border-t border-slate-100">
          <span className="text-slate-500 text-xs">Status</span>
          <span
            className={`text-[11px] font-semibold px-3 py-1 rounded-full 
                        ${BADGE[detail.status]}`}
          >
            {detail.status}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 flex gap-2">
        <button
          onClick={() => setDetail(null)}
          className="flex-1 py-2 rounded-lg text-xs font-semibold 
                     border border-slate-200 text-slate-600 
                     hover:bg-slate-50 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
)}



    </AdminShell>
  );
}
