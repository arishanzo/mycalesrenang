'use client';

import { useState } from 'react';
import { AdminShell } from '../components/AdminShell';

const BADGE: Record<string, string> = {
  Aktif: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Nonaktif: 'bg-red-50 text-red-600 ring-1 ring-red-200',
};

const PROGRAM_COLOR: Record<string, string> = {
  Privat: 'bg-marine-100 text-marine-700',
  'Semi Privat': 'bg-blue-50 text-blue-700',
  Grup: 'bg-cyan-50 text-cyan-700',
};

const INIT_DATA = [
  { id: 1, name: 'Anisa Putri', email: 'anisa@email.com', phone: '0812-xxxx-1001', program: 'Privat', status: 'Aktif', joined: '12 Jan 2025', instruktur: 'Pak Budi' },
  { id: 2, name: 'Budi Santoso', email: 'budi@email.com', phone: '0813-xxxx-1002', program: 'Semi Privat', status: 'Aktif', joined: '15 Jan 2025', instruktur: 'Bu Sari' },
  { id: 3, name: 'Citra Dewi', email: 'citra@email.com', phone: '0814-xxxx-1003', program: 'Grup', status: 'Pending', joined: '20 Feb 2025', instruktur: 'Pak Andi' },
  { id: 4, name: 'Dika Ramadhan', email: 'dika@email.com', phone: '0815-xxxx-1004', program: 'Privat', status: 'Aktif', joined: '03 Mar 2025', instruktur: 'Pak Budi' },
  { id: 5, name: 'Eva Lestari', email: 'eva@email.com', phone: '0816-xxxx-1005', program: 'Grup', status: 'Nonaktif', joined: '10 Mar 2025', instruktur: 'Bu Sari' },
  { id: 6, name: 'Fandi Ahmad', email: 'fandi@email.com', phone: '0817-xxxx-1006', program: 'Semi Privat', status: 'Pending', joined: '22 Apr 2025', instruktur: 'Pak Andi' },
  { id: 7, name: 'Gita Nuraini', email: 'gita@email.com', phone: '0818-xxxx-1007', program: 'Privat', status: 'Aktif', joined: '01 Mei 2025', instruktur: 'Pak Budi' },
  { id: 8, name: 'Hendra Wijaya', email: 'hendra@email.com', phone: '0819-xxxx-1008', program: 'Grup', status: 'Aktif', joined: '14 Mei 2025', instruktur: 'Bu Sari' },
];

const EMPTY_FORM = { name: '', email: '', phone: '', program: 'Privat', instruktur: 'Pak Budi' };

export default function SiswaPage() {
  const [data, setData] = useState(INIT_DATA);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterProgram, setFilterProgram] = useState('Semua');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = data.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || s.status === filterStatus;
    const matchProgram = filterProgram === 'Semua' || s.program === filterProgram;
    return matchSearch && matchStatus && matchProgram;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newSiswa = {
      id: data.length + 1,
      ...form,
      status: 'Pending',
      joined: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setData([newSiswa, ...data]);
    setForm(EMPTY_FORM);
    setShowModal(false);
  };

  const toggleSelect = (id: number) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const stats = [
    { label: 'Total Siswa', value: data.length, color: '#296da4' },
    { label: 'Aktif', value: data.filter((s) => s.status === 'Aktif').length, color: '#059669' },
    { label: 'Pending', value: data.filter((s) => s.status === 'Pending').length, color: '#d97706' },
    { label: 'Nonaktif', value: data.filter((s) => s.status === 'Nonaktif').length, color: '#dc2626' },
  ];

  return (
    <AdminShell title="Data Siswa" subtitle="Kelola semua data siswa terdaftar">
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
              placeholder="Cari nama atau email siswa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-marine-400 focus:bg-white transition-all text-marine-900 placeholder:text-marine-300"
            />
          </div>
          {/* Filters */}
          <div className="flex gap-2 shrink-0">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 text-marine-700 outline-none focus:border-marine-400 cursor-pointer">
              {['Semua', 'Aktif', 'Pending', 'Nonaktif'].map((o) => <option key={o}>{o}</option>)}
            </select>
            <select value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 text-marine-700 outline-none focus:border-marine-400 cursor-pointer">
              {['Semua', 'Privat', 'Semi Privat', 'Grup'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white shrink-0 transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg,#0e3a60,#296da4)', boxShadow: '0 3px 12px -3px rgba(41,109,164,0.5)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Tambah Siswa
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50">
            <p className="text-marine-500 text-[11px] font-semibold uppercase tracking-wider">
              {filtered.length} Siswa ditemukan
            </p>
            {selected.length > 0 && (
              <button onClick={() => { setData(data.filter((s) => !selected.includes(s.id))); setSelected([]); }}
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
                  <th className="px-4 py-2.5 w-8">
                    <input type="checkbox" className="rounded"
                      checked={selected.length === filtered.length && filtered.length > 0}
                      onChange={(e) => setSelected(e.target.checked ? filtered.map((s) => s.id) : [])} />
                  </th>
                  {['Siswa', 'Kontak', 'Program', 'Instruktur', 'Status', 'Bergabung', ''].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-marine-400 font-semibold uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s) => (
                  <tr key={s.id} className={`hover:bg-marine-50/40 transition-colors ${selected.includes(s.id) ? 'bg-marine-50/60' : ''}`}>
                    <td className="px-4 py-2.5">
                      <input type="checkbox" className="rounded" checked={selected.includes(s.id)} onChange={() => toggleSelect(s.id)} />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                          style={{ background: 'linear-gradient(135deg,#1a5182,#3b8bc4)' }}>
                          {s.name.charAt(0)}
                        </div>
                        <span className="text-marine-900 font-semibold whitespace-nowrap">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="text-marine-700">{s.email}</p>
                      <p className="text-marine-400 text-[10px]">{s.phone}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${PROGRAM_COLOR[s.program]}`}>{s.program}</span>
                    </td>
                    <td className="px-3 py-2.5 text-marine-600">{s.instruktur}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${BADGE[s.status]}`}>{s.status}</span>
                    </td>
                    <td className="px-3 py-2.5 text-marine-400 whitespace-nowrap">{s.joined}</td>
                    <td className="px-3 py-2.5">
                      <button className="p-1.5 rounded-lg hover:bg-marine-100 text-marine-400 hover:text-marine-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
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

      {/* Modal Tambah Siswa */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100"
              style={{ background: 'linear-gradient(135deg,#020e1a,#0e3a60)' }}>
              <div>
                <p className="text-white font-semibold text-sm">Tambah Siswa Baru</p>
                <p className="text-marine-400 text-[11px]">Isi data siswa yang akan didaftarkan</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-marine-400 hover:text-white transition-colors p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-5 space-y-3">
              {[
                { label: 'Nama Lengkap', key: 'name', type: 'text', placeholder: 'Masukkan nama lengkap' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'contoh@email.com' },
                { label: 'No. HP', key: 'phone', type: 'text', placeholder: '0812-xxxx-xxxx' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-[11px] font-semibold text-marine-600 uppercase tracking-wider mb-1">{label}</label>
                  <input type={type} required placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-marine-900 placeholder:text-marine-300 outline-none focus:border-marine-400 focus:bg-white transition-all" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-marine-600 uppercase tracking-wider mb-1">Program</label>
                  <select value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-marine-900 outline-none focus:border-marine-400 cursor-pointer">
                    {['Privat', 'Semi Privat', 'Grup'].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-marine-600 uppercase tracking-wider mb-1">Instruktur</label>
                  <select value={form.instruktur} onChange={(e) => setForm({ ...form, instruktur: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-marine-900 outline-none focus:border-marine-400 cursor-pointer">
                    {['Pak Budi', 'Bu Sari', 'Pak Andi'].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-marine-500 hover:bg-slate-50 transition-colors">
                  Batal
                </button>
                <button type="submit"
                  className="flex-1 py-2 rounded-lg text-xs font-semibold text-white transition-all active:scale-95"
                  style={{ background: 'linear-gradient(135deg,#0e3a60,#296da4)', boxShadow: '0 3px 12px -3px rgba(41,109,164,0.5)' }}>
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
