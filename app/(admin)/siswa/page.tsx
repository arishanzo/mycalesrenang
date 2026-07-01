'use client';

import { useState } from 'react';
import { AdminShell } from '../components/AdminShell';
import { UseGetBooking } from '../hook/useGetBooking';
import { Eye } from 'lucide-react';

import { MYCA_PACKAGES } from '@/app/libs/data';

const BADGE: Record<string, string> = {
 'Terkonfirmasi': 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  'Menunggu Konfirmasi': 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  'Pembayaran Diterima': 'bg-red-50 text-red-600 ring-1 ring-red-200',
   "Perpanjangan - Terkonfirmasi":
    "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
};

const PROGRAM_COLOR: Record<string, string> = {
  privat: 'bg-marine-100 text-marine-700',
  semiprivat: 'bg-blue-50 text-blue-700',
  grup: 'bg-cyan-50 text-cyan-700',

};


export default function SiswaPage() {


     const { booking }  = UseGetBooking();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterProgram, setFilterProgram] = useState('Semua');
  const [selected, setSelected] = useState<(number | string)[]>([]);

  const filtered = booking?.filter((s) => {
    const matchSearch = s.student_name.toLowerCase().includes(search.toLowerCase()) || s.phone.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || s.status === filterStatus;
    const matchProgram = filterProgram === 'Semua' || MYCA_PACKAGES.find(p => p.id === s?.package_id)?.type === filterProgram;
    return matchSearch && matchStatus && matchProgram;
  }).filter((item, index, self) =>
    index === self.findIndex(t => t.student_name.toLowerCase() === item.student_name.toLowerCase())
  ) ?? [];


  const stats = [
    { label: 'Total Siswa', value: booking?.length, color: '#296da4' },
    { label: 'Aktif', value: booking?.filter((s) => s.status === 'Terkonfirmasi').length, color: '#059669' },
    { label: 'Pending', value: booking?.filter((s) => s.status === 'Menunggu Konfirmasi').length, color: '#d97706' },
    { label: 'Nonaktif', value: booking?.filter((s) => s.status === 'Pembayaran Diterima').length, color: '#dc2626' },
  ];

  return (
    <AdminShell title="booking Siswa" subtitle="Kelola semua booking siswa terdaftar">
      <div className="space-y-3">

        {/* Stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${s.color}18` }}>
                <span className="font-bold text-sm" style={{ color: s.color }}>{s.value}</span>
              </div>
              <p className="text-marine-500 text-xs font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-marine-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari nama atau Phone siswa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-marine-400 focus:bg-white transition-all text-marine-900 placeholder:text-marine-300"
            />
          </div>
          {/* Filters */}
          <div className="flex gap-2 shrink-0">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 text-marine-700 outline-none focus:border-marine-400 cursor-pointer">
              {['Semua', 'Terkonfirmasi', 'Menunggu Konfirmasi'].map((o) => <option key={o}>{o}</option>)}
            </select>
            <select value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 text-marine-700 outline-none focus:border-marine-400 cursor-pointer">
               {['Semua', 'privat', 'semiprivat', 'grup'].map((o) => <option key={o}>{o}</option>)}

            </select>
          </div>

         
         
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50">
            <p className="text-marine-500 text-[11px] font-semibold uppercase tracking-wider">
              {filtered?.length} Siswa ditemukan
            </p>
            {selected.length > 0 && (
              <button onClick={() => { (booking || []).filter((s) => !selected.includes(s.id)); setSelected([]); }}
                className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                Hapus {selected.length} dipilih
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                 
                  {['No', 'Nama Lengkap Siswa' ,'Nama Panggilan Siswa', 'Nama Orang Tua', 'Umur', 'Tanggal Lahir', 'Program', 'Jenis Kelamin', 'Telepon', 'Status', 'Detail'].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-marine-400 font-semibold uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s, i) => 
                
                  { 
                    const no = i + 1;
                    return (
                  <tr key={s.id} className={`hover:bg-marine-50/40 transition-colors ${selected.includes(s.id) ? 'bg-marine-50/60' : ''}`}>
                   
                       <td className="px-3 py-2.5 text-marine-600">{no}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                          style={{ background: 'linear-gradient(135deg,#1a5182,#3b8bc4)' }}>
                          {s.student_name.charAt(0)}
                        </div>
                        <span className="text-marine-900 font-semibold whitespace-nowrap">{s.student_name}</span>
                      </div>
                    </td>
                    
                     <td className="px-3 py-2.5 text-marine-600">{s.nama_panggilan === 'undefined' ? '-' : s.nama_panggilan}</td>
                   

                    <td className="px-3 py-2.5 text-marine-600">{s.parent_name === 'undefined' ? '-' : s.parent_name}</td>
                    
                    <td className="px-3 py-2.5 text-marine-600">{s.age}</td>
                    
                    <td className="px-3 py-2.5 text-marine-600">{ new Date(s.start_date).toLocaleDateString('id-ID')}</td>
                       <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${PROGRAM_COLOR[s.package_id]}`}>{s.package_id}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="text-marine-700">{s.gender}</p>
                    </td>
                    
                    <td className="px-3 py-2.5 text-marine-600">{s.phone}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${BADGE[s.status]}`}>{s.status}</span>
                    </td>
                   
                    <td className="px-3 py-2.5">
                      <a href='/transaksi' className=" rounded-lg hover:bg-marine-100 text-marine-400 hover:text-marine-700 transition-colors">
                       <Eye />
                      </a>
                    </td>
                  </tr>
                )})}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-marine-300 text-xs">
                      Tidak ada data siswa ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </AdminShell>
  );
}
