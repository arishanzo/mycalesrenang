'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ── Icons ── */
const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
    <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
  </svg>
);
const IconSiswa = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
  </svg>
);
const IconTransaksi = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z"/>
  </svg>
);
const IconSetting = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
  </svg>
);
const IconJadwal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
  </svg>
);
const IconLogout = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
  </svg>
);
const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
  </svg>
);
const IconBell = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
  </svg>
);

/* ── Data ── */
const NAV = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', Icon: IconDashboard },
  { id: 'siswa', label: 'Data Siswa', href: '/siswa', Icon: IconSiswa },
  { id: 'jadwal', label: 'Jadwal', href: '/jadwal', Icon: IconJadwal },
  { id: 'transaksi', label: 'Transaksi', href: '/transasksi', Icon: IconTransaksi },
  { id: 'setting-akun', label: 'Pengaturan', href: '/setting-akun', Icon: IconSetting },
];

const STATS = [
  { label: 'Total Siswa', value: '248', sub: '+12 bulan ini', up: true, accent: '#296da4' },
  { label: 'Transaksi', value: 'Rp24,5jt', sub: '+8% vs bulan lalu', up: true, accent: '#0891b2' },
  { label: 'Siswa Aktif', value: '186', sub: '75% dari total', up: true, accent: '#0e7490' },
  { label: 'Daftar Baru', value: '14', sub: '-2 vs minggu lalu', up: false, accent: '#b45309' },
];

const SISWA = [
  { name: 'Anisa Putri', program: 'Privat', status: 'Aktif', date: '12 Jun' },
  { name: 'Budi Santoso', program: 'Semi Privat', status: 'Aktif', date: '10 Jun' },
  { name: 'Citra Dewi', program: 'Grup', status: 'Pending', date: '09 Jun' },
  { name: 'Dika Ramadhan', program: 'Privat', status: 'Aktif', date: '08 Jun' },
  { name: 'Eva Lestari', program: 'Grup', status: 'Nonaktif', date: '05 Jun' },
  { name: 'Fandi Ahmad', program: 'Semi Privat', status: 'Pending', date: '04 Jun' },
];

const TRANSAKSI = [
  { name: 'Anisa Putri', nominal: 'Rp 850.000', metode: 'Transfer', status: 'Lunas' },
  { name: 'Budi Santoso', nominal: 'Rp 600.000', metode: 'QRIS', status: 'Lunas' },
  { name: 'Citra Dewi', nominal: 'Rp 450.000', metode: 'Transfer', status: 'Pending' },
  { name: 'Dika Ramadhan', nominal: 'Rp 850.000', metode: 'Cash', status: 'Lunas' },
];

const STATUS_BADGE: Record<string, string> = {
  Aktif: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Pending: 'bg-amber-50 text-amber-700 ring-amber-100',
  Nonaktif: 'bg-red-50 text-red-600 ring-red-100',
  Lunas: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
};

const PROGRAMS = [
  { label: 'Privat', pct: 45, color: '#0e3a60' },
  { label: 'Semi Privat', pct: 30, color: '#296da4' },
  { label: 'Grup', pct: 25, color: '#5da4d6' },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const active = 'dashboard';

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#f3f6fa]" style={{ fontFamily: 'var(--font-sans)' }}>

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col shrink-0 transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'linear-gradient(180deg,#020e1a 0%,#072640 60%,#0b2d4e 100%)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/20 shrink-0">
            <Image src="/images/logo.png" alt="MYCA" width={32} height={32} className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-none truncate">MYCA Admin</p>
            <p className="text-marine-400 text-[10px] truncate">Center of Aquatic</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          <p className="text-marine-500 text-[10px] font-semibold uppercase tracking-widest px-2 pb-2 pt-1">Menu</p>
          {NAV.map(({ id, label, href, Icon }) => {
            const isActive = active === id;
            return (
              <Link
                key={id}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? 'text-white'
                    : 'text-marine-400 hover:text-white hover:bg-white/5'
                }`}
                style={isActive ? { background: 'linear-gradient(90deg,rgba(41,109,164,0.35),rgba(41,109,164,0.1))', borderLeft: '2px solid #22d3ee' } : {}}
              >
                <span className={isActive ? 'text-aqua-400' : 'text-marine-500'}><Icon /></span>
                {label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-aqua-400 shrink-0" />}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-2 pb-3 pt-2 border-t border-white/10 space-y-1 shrink-0">
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-white/5">
            <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: 'linear-gradient(135deg,#1a5182,#296da4)' }}>AD</div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">Administrator</p>
              <p className="text-marine-400 text-[10px] truncate">Super Admin</p>
            </div>
          </div>
          <Link href="/login"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-marine-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <IconLogout />
            Keluar
          </Link>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="shrink-0 bg-white border-b border-slate-200 px-4 lg:px-5 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-marine-50 text-marine-500 transition-colors">
              <IconMenu />
            </button>
            <div>
              <h1 className="text-marine-950 font-bold text-base leading-none">Dashboard</h1>
              <p className="text-marine-400 text-[11px] mt-0.5 hidden sm:block">Selamat datang kembali, Admin 👋</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Date */}
            <span className="hidden md:block text-marine-400 text-xs border border-marine-100 rounded-lg px-2.5 py-1.5 bg-marine-50">
              {new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            {/* Bell */}
            <button className="relative p-2 rounded-lg bg-marine-50 hover:bg-marine-100 text-marine-500 transition-colors">
              <IconBell />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-1 ring-white" />
            </button>
            {/* Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-marine-100">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                style={{ background: 'linear-gradient(135deg,#0e3a60,#296da4)' }}>AD</div>
              <div className="hidden sm:block">
                <p className="text-marine-900 text-xs font-semibold leading-none">Admin</p>
                <p className="text-marine-400 text-[10px] mt-0.5">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3">

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-3.5 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-marine-500 text-[11px] font-medium leading-tight">{s.label}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${s.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                    {s.sub.split(' ')[0]}
                  </span>
                </div>
                <p className="text-marine-950 font-bold text-xl leading-none mb-2">{s.value}</p>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-1 bg-slate-100 rounded-full">
                    <div className="h-1 rounded-full w-3/4" style={{ background: s.accent }} />
                  </div>
                  <p className="text-marine-400 text-[10px] shrink-0">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Middle Row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

            {/* Siswa Terbaru */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                <p className="text-marine-900 font-semibold text-sm">Siswa Terbaru</p>
                <Link href="/siswa" className="text-marine-500 hover:text-marine-700 text-xs font-medium transition-colors flex items-center gap-1">
                  Lihat semua
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {['Siswa', 'Program', 'Status', 'Tgl'].map((h) => (
                        <th key={h} className="text-left px-4 py-2 text-marine-400 font-semibold uppercase tracking-wide text-[10px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {SISWA.map((s, i) => (
                      <tr key={i} className="hover:bg-marine-50/40 transition-colors">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                              style={{ background: 'linear-gradient(135deg,#1a5182,#3b8bc4)' }}>
                              {s.name.charAt(0)}
                            </div>
                            <span className="text-marine-900 font-medium truncate max-w-[100px]">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-marine-500">{s.program}</td>
                        <td className="px-4 py-2.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ring-1 ${STATUS_BADGE[s.status]}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-marine-400">{s.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-3">
              {/* Jadwal Renang */}
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-marine-900 font-semibold text-sm mb-3">Jadwal Renang</p>
                <div className="space-y-1.5">
                  {[
                    { hari: 'Senin', waktu: '07:00 - 09:00', program: 'Privat', color: '#0e3a60' },
                    { hari: 'Selasa', waktu: '15:00 - 17:00', program: 'Grup', color: '#296da4' },
                    { hari: 'Rabu', waktu: '07:00 - 09:00', program: 'Semi Privat', color: '#0891b2' },
                    { hari: 'Kamis', waktu: '15:00 - 17:00', program: 'Privat', color: '#0e3a60' },
                    { hari: 'Sabtu', waktu: '08:00 - 11:00', program: 'Grup', color: '#296da4' },
                  ].map((j) => (
                    <div key={j.hari} className="flex items-center justify-between rounded-lg px-2.5 py-2 bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: j.color }} />
                        <div>
                          <p className="text-marine-900 text-[11px] font-semibold">{j.hari}</p>
                          <p className="text-marine-400 text-[10px]">{j.waktu}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white" style={{ background: j.color }}>
                        {j.program}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl p-4 text-white"
                style={{ background: 'linear-gradient(145deg,#031525 0%,#0e3a60 60%,#1a5182 100%)' }}>
                <p className="font-semibold text-xs uppercase tracking-widest text-marine-300 mb-3">Aksi Cepat</p>
                <div className="space-y-1.5">
                  {[
                    { label: 'Tambah Siswa', href: '/siswa' },
                    { label: 'Lihat Transaksi', href: '/transasksi' },
                    { label: 'Kelola Akun', href: '/setting-akun' },
                  ].map((a) => (
                    <Link key={a.label} href={a.href}
                      className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-xs font-medium transition-colors">
                      {a.label}
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Transaksi Terbaru ── */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
              <p className="text-marine-900 font-semibold text-sm">Transaksi Terbaru</p>
              <Link href="/transasksi" className="text-marine-500 hover:text-marine-700 text-xs font-medium flex items-center gap-1 transition-colors">
                Lihat semua
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Nama', 'Nominal', 'Metode', 'Status'].map((h) => (
                      <th key={h} className="text-left px-4 py-2 text-marine-400 font-semibold uppercase tracking-wide text-[10px]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TRANSAKSI.map((t, i) => (
                    <tr key={i} className="hover:bg-marine-50/40 transition-colors">
                      <td className="px-4 py-2.5 text-marine-900 font-medium">{t.name}</td>
                      <td className="px-4 py-2.5 text-marine-700 font-semibold">{t.nominal}</td>
                      <td className="px-4 py-2.5 text-marine-500">{t.metode}</td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ring-1 ${STATUS_BADGE[t.status]}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
