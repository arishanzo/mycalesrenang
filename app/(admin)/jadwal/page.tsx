'use client';

import { useState } from 'react';
import { AdminShell } from '../components/AdminShell';

const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const JADWAL_DATA = [
  { id: 1, hari: 'Senin', waktuMulai: '07:00', waktuSelesai: '09:00', program: 'Privat', layanan: 'Renang Privat', kolam: 'Kolam A', level: 'Pemula' },
  { id: 2, hari: 'Senin', waktuMulai: '15:00', waktuSelesai: '17:00', program: 'Grup', layanan: 'Renang Grup', kolam: 'Kolam B', level: 'Menengah' },
  { id: 3, hari: 'Selasa', waktuMulai: '07:00', waktuSelesai: '08:30', program: 'Semi Privat', layanan: 'Renang Semi Privat', kolam: 'Kolam A', level: 'Lanjutan' },
  { id: 4, hari: 'Rabu', waktuMulai: '07:00', waktuSelesai: '09:00', program: 'Privat', layanan: 'Renang Privat', kolam: 'Kolam C', level: 'Pemula' },
  { id: 5, hari: 'Rabu', waktuMulai: '16:00', waktuSelesai: '18:00', program: 'Grup', layanan: 'Renang Grup', kolam: 'Kolam B', level: 'Pemula' },
  { id: 6, hari: 'Kamis', waktuMulai: '07:00', waktuSelesai: '09:00', program: 'Semi Privat', layanan: 'Renang Semi Privat', kolam: 'Kolam A', level: 'Menengah' },
  { id: 7, hari: 'Jumat', waktuMulai: '15:00', waktuSelesai: '17:00', program: 'Privat', layanan: 'Renang Privat', kolam: 'Kolam C', level: 'Lanjutan' },
  { id: 8, hari: 'Sabtu', waktuMulai: '07:00', waktuSelesai: '10:00', program: 'Grup', layanan: 'Renang Grup', kolam: 'Kolam B', level: 'Pemula' },
  { id: 9, hari: 'Sabtu', waktuMulai: '10:00', waktuSelesai: '12:00', program: 'Semi Privat', layanan: 'Renang Semi Privat', kolam: 'Kolam A', level: 'Menengah' },
];

const PROGRAM_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  'Privat':      { bg: 'bg-indigo-50',  text: 'text-indigo-700', dot: '#4f46e5' },
  'Semi Privat': { bg: 'bg-cyan-50',    text: 'text-cyan-700',   dot: '#0891b2' },
  'Grup':        { bg: 'bg-emerald-50', text: 'text-emerald-700',dot: '#059669' },
};

const LEVEL_STYLE: Record<string, string> = {
  'Pemula':   'bg-sky-50 text-sky-700 ring-sky-100',
  'Menengah': 'bg-violet-50 text-violet-700 ring-violet-100',
  'Lanjutan': 'bg-orange-50 text-orange-700 ring-orange-100',
};

// Hitung tanggal Senin minggu ini lalu map tiap hari
function getWeekDates() {
  const today = new Date();
  const day = today.getDay(); // 0=Minggu
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  return HARI.map((nama, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      nama,
      tanggal: d.getDate(),
      bulan: d.toLocaleDateString('id-ID', { month: 'short' }),
      isToday: d.toDateString() === today.toDateString(),
      full: d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    };
  });
}

export default function JadwalPage() {
  const weekDates = getWeekDates();
  const todayNama = weekDates.find((w) => w.isToday)?.nama ?? null;
  const [activeHari, setActiveHari] = useState<string | null>(todayNama);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = activeHari
    ? JADWAL_DATA.filter((j) => j.hari === activeHari)
    : JADWAL_DATA;

  const activeWeek = weekDates.find((w) => w.nama === activeHari);

  return (
    <AdminShell title="Jadwal Renang" subtitle="Kelola jadwal sesi renang mingguan">
      <div className="space-y-4">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: 'Total Sesi', value: JADWAL_DATA.length, sub: 'per minggu', icon: '📅', accent: '#296da4' },
            { label: 'Layanan', value: [...new Set(JADWAL_DATA.map((j) => j.layanan))].length, sub: 'jenis layanan aktif', icon: '🏊', accent: '#0891b2' },
            { label: 'Hari Aktif', value: [...new Set(JADWAL_DATA.map((j) => j.hari))].length, sub: 'dari 7 hari', icon: '📆', accent: '#059669' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xl">{s.icon}</span>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.accent}18` }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: s.accent }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-marine-950 leading-none mb-1">{s.value}</p>
              <p className="text-marine-500 text-[11px] font-medium">{s.label}</p>
              <p className="text-marine-400 text-[10px] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Kalender Hari Minggu Ini ── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-marine-400 text-[11px] font-semibold uppercase tracking-widest mb-3">Minggu Ini</p>
          <div className="grid grid-cols-7 gap-1.5">
            {weekDates.map((w) => {
              const hasSesi = JADWAL_DATA.some((j) => j.hari === w.nama);
              const isActive = activeHari === w.nama;
              return (
                <button
                  key={w.nama}
                  onClick={() => setActiveHari(w.nama === activeHari ? null : w.nama)}
                  className={`flex flex-col items-center py-2.5 px-1 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-lg shadow-marine-200'
                      : w.isToday
                      ? 'bg-marine-50 text-marine-700 ring-1 ring-marine-200'
                      : 'hover:bg-slate-50 text-marine-500'
                  }`}
                  style={isActive ? { background: 'linear-gradient(135deg,#0b2d4e,#296da4)' } : {}}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wide opacity-70">{w.nama.slice(0, 3)}</span>
                  <span className="text-base font-bold leading-tight mt-0.5">{w.tanggal}</span>
                  <span className="text-[9px] opacity-60">{w.bulan}</span>
                  {hasSesi && (
                    <span className={`mt-1 w-1 h-1 rounded-full ${isActive ? 'bg-white/60' : 'bg-marine-400'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {activeWeek && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <p className="text-marine-700 text-xs font-semibold">{activeWeek.full}</p>
              <span className="text-[11px] text-marine-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                {filtered.length} sesi
              </span>
            </div>
          )}
        </div>

        {/* ── Filter + View Toggle ── */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-marine-600 text-sm font-semibold">
            {activeHari ? `Jadwal ${activeHari}` : 'Semua Jadwal'}
            <span className="ml-2 text-marine-400 font-normal text-xs">({filtered.length} sesi)</span>
          </p>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['grid', 'list'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`p-1.5 rounded-lg transition-all ${viewMode === m ? 'bg-white shadow text-marine-800' : 'text-marine-400 hover:text-marine-600'}`}
              >
                {m === 'grid' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid View ── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map((j) => {
              const ps = PROGRAM_STYLE[j.program];
              const dateInfo = weekDates.find((w) => w.nama === j.hari);
              return (
                <div key={j.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  {/* Header */}
                  <div className="px-4 pt-4 pb-3 flex items-start justify-between" style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)' }}>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[11px] font-bold text-marine-400 uppercase tracking-widest">{j.hari}</span>
                        {dateInfo && (
                          <span className="text-[10px] text-marine-300">· {dateInfo.tanggal} {dateInfo.bulan}</span>
                        )}
                        {dateInfo?.isToday && (
                          <span className="text-[9px] font-bold bg-aqua-500 text-white px-1.5 py-0.5 rounded-full">Hari ini</span>
                        )}
                      </div>
                      <p className="text-marine-950 font-bold text-lg leading-none">
                        {j.waktuMulai} <span className="text-marine-400 font-normal text-sm">–</span> {j.waktuSelesai}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ps.dot}15` }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={ps.dot} viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-4 pb-4 pt-3 space-y-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${ps.bg} ${ps.text}`}>{j.program}</span>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ring-1 ${LEVEL_STYLE[j.level]}`}>{j.level}</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-2 text-marine-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        <span>{j.layanan}</span>
                      </div>
                      <div className="flex items-center gap-2 text-marine-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                        <span>{j.kolam}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── List View ── */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)' }}>
                    {['Hari & Tanggal', 'Waktu', 'Program', 'Level', 'Layanan', 'Kolam'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-marine-400 font-bold uppercase tracking-widest text-[10px] border-b border-slate-100">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((j) => {
                    const ps = PROGRAM_STYLE[j.program];
                    const dateInfo = weekDates.find((w) => w.nama === j.hari);
                    return (
                      <tr key={j.id} className="hover:bg-marine-50/40 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-bold text-marine-800">{j.hari}</p>
                          <p className="text-marine-400 text-[10px]">{dateInfo?.tanggal} {dateInfo?.bulan}</p>
                          {dateInfo?.isToday && <span className="text-[9px] font-bold text-aqua-600">Hari ini</span>}
                        </td>
                        <td className="px-4 py-3 font-semibold text-marine-700 tabular-nums">{j.waktuMulai} – {j.waktuSelesai}</td>
                        <td className="px-4 py-3">
                          <span className={`font-semibold px-2.5 py-1 rounded-full text-[11px] ${ps.bg} ${ps.text}`}>{j.program}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-semibold px-2 py-0.5 rounded-full ring-1 ${LEVEL_STYLE[j.level]}`}>{j.level}</span>
                        </td>
                        <td className="px-4 py-3 text-marine-600">{j.layanan}</td>
                        <td className="px-4 py-3 text-marine-500">{j.kolam}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 py-16 flex flex-col items-center gap-3">
            <span className="text-4xl">📅</span>
            <p className="text-marine-500 text-sm font-medium">Tidak ada jadwal untuk hari ini</p>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
