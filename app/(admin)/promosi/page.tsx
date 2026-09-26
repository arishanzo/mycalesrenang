'use client';

import { useState } from 'react';
import { AdminShell } from '../components/AdminShell';
import { Eye, Trash } from 'lucide-react';
import PromosiAddModal from './components/addModal';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { UseGetPromosi } from '../hook/useGetPromosi';
import { deletePromosi } from '@/app/services/promosi.service';
import StatusModal from './components/statusModel';



export default function PromosiPage() {


        const [showAddModal, setShowAddModal] = useState(false);
        const [showStatusModal, setShowStatusModal] = useState(false);
        const [selectedStatusId, setSelectedStatusId] = useState('');
      

     const { promosi }  = UseGetPromosi();

  

  const [search, setSearch] = useState('');
  // const [filterStatus, setFilterStatus] = useState('Semua');
  // const [filterProgram, setFilterProgram] = useState('Semua');
  // const [selected, setSelected] = useState<(number | string)[]>([]);

  const filtered = promosi?.filter((s) => {
  const matchSearch = (Array.isArray(s.email) ? s.email.join(' ') : s.email)
    .toLowerCase()
    .includes(search.toLowerCase());
    return matchSearch;
  }) ?? [];




  // const toggleSelect = (id: string) =>
  //   setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const stats = [
    { label: 'Total Promosi', value: promosi?.length, color: '#296da4' },
    { label: 'Terkirim', value: promosi?.filter((s) => String(s.status) === 'sent').length, color: '#059669' },
    { label: 'Pending', value: promosi?.filter((s) => String(s.status) === 'pending').length, color: '#122193' },
     { label: 'Gagal', value: promosi?.filter((s) => String(s.status) === 'failed').length, color: '#970e0e' },
  ];

  const handleStatus = (id: string) => {
      setSelectedStatusId(id);
      setShowStatusModal(true);

  }
    
const handleHapus = async (id: string) => {
  Swal.fire({
    title: "Yakin hapus?",
    text: "Data Promosi ini akan dihapus permanen.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deletePromosi(id); // panggil API delete
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Promosi berhasil dihapus.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat menghapus Promosi.",
        });
      } finally{
         setTimeout(() => {
            window.location.reload();
          }, 3000);
      }
    }
  });
};

  return (
    <AdminShell title="Halaman Promosi" subtitle="Kelola Promosi terdaftar">
      <div className="space-y-3">

        {/* Stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
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
              placeholder="Cari  Promosi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-marine-400 focus:bg-white transition-all text-marine-900 placeholder:text-marine-300"
            />
          </div>
          {/* Filters */}
          <div className="flex gap-2 shrink-0">
         
{/* 
            <select value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 text-marine-700 outline-none focus:border-marine-400 cursor-pointer">
              {['Semua', 'Pending', 'Sukses', 'Gagal'].map((o) => <option key={o}>{o}</option>)}
            </select> */}

               <button
                onClick={() => setShowAddModal(true)} 
                className="flex items-center gap-1.5 px-3 py-2 
                            text-xs font-semibold rounded-lg 
                            bg-gradient-to-r from-marine-500 to-marine-600 
                            text-white shadow-sm hover:shadow-md 
                            transition-all duration-200 cursor-pointer"
                >
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="14" height="14" fill="currentColor" 
                    viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5V7h2.5a.5.5 0 0 1 0 1H8.5v2.5a.5.5 0 0 1-1 0V8H5a.5.5 0 0 1 0-1h2.5V4.5A.5.5 0 0 1 8 4z"/>
                </svg>
                <span>Tambah Data</span>
                </button>
          </div>

         
         
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50">
            <p className="text-marine-500 text-[11px] font-semibold uppercase tracking-wider">
              {filtered?.length} Promosi ditemukan
            </p>

          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                
                  {[ 'No', 'Email' ,'Subject', 'Message', 'Tanggal', 'status', 'Action'].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-marine-400 font-semibold uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s, i) =>  { 
                    const no = i + 1;
                    return (
                  <tr key={s.id} className="hover:bg-marine-50/40 transition-colors">
                       <td className="px-3 py-2.5 text-marine-600">{no}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-marine-900 font-semibold whitespace-nowrap">{s.email}</span>
                      </div>
                    </td>
                    
                     <td className="px-3 py-2.5 text-marine-600">{s.subject}</td>
                   

                    <td className="px-3 py-2.5 text-marine-600">
                    <div
                      className="max-w-[350px] truncate text-sm leading-6"
                      title={s.message}
                    >
                      {s.message}
                    </div>
                  </td>
                    
                    <td className="px-3 py-2.5 text-marine-600">{format(new Date(s.schedule), `dd MM yyyy h:m`)} WIB</td>
                    
                    <td className="px-3 py-2.5 text-marine-600">
                        <button
                            onClick={() => handleStatus(s.id)}
                            className="rounded-lg hover:bg-marine-100 text-marine-400 hover:text-marine-700 transition-colors"
                            >
                          <Eye />
                            </button>
                     </td>
                  
                   
                   <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">

                            <button
                            onClick={() => handleHapus(s.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                            >
                            <Trash />
                            </button>
                        </div>
                        </td>

                  </tr>
                )})}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-marine-300 text-xs">
                      Tidak ada data Promosi ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
  {showStatusModal && (
  <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        id={selectedStatusId}
      />

  )}
  
      <PromosiAddModal
      isOpen={showAddModal}
      onClose={() => setShowAddModal(false)}
      />

    </AdminShell>
  );
}
