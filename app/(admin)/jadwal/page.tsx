'use client';

import { useState } from 'react';
import { AdminShell } from '../components/AdminShell';
import { UseGetBooking } from '../hook/useGetBooking';
import { Phone } from 'lucide-react';

const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];


const PROGRAM_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  'Privat':      { bg: 'bg-indigo-50',  text: 'text-indigo-700', dot: '#4f46e5' },
  'Semi Privat': { bg: 'bg-cyan-50',    text: 'text-cyan-700',   dot: '#0891b2' },
  'Grup':        { bg: 'bg-emerald-50', text: 'text-emerald-700',dot: '#059669' },
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
  const { booking }  = UseGetBooking();
  const weekDates = getWeekDates();
  const todayNama = weekDates.find((w) => w.isToday)?.nama ?? null;
  const [activeHari, setActiveHari] = useState<string | null>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  console.log(todayNama);

  


  const filtered = activeHari ? (booking ?? []).filter((i) => i.status === 'Terkonfirmasi')  : booking;

  const activeWeek = weekDates.find((w) => w.nama === activeHari);

  return (
    <AdminShell title="Jadwal Renang" subtitle="Kelola jadwal sesi renang mingguan">
      <div className="space-y-4">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: 'Total Jadwal Terkonfirmasi', value: booking?.filter((i) => i.status === 'Terkonfirmasi')?.length, sub: 'per minggu', icon: '📅', accent: '#296da4' },
            { label: 'Jadwal Layanan', value: [...new Set(booking?.map((j) => j.package_id))].length, sub: 'jenis layanan aktif', icon: '🏊', accent: '#0891b2' },
            { label: 'Total Jadwal Tertunda', value:  booking?.filter((i) => i.status === 'Menunggu Konfirmasi')?.length, sub: 'dari 7 hari', icon: '📆', accent: '#059669' },
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
              const hasSesi = booking?.some((j) => new Date(j.start_date).toLocaleDateString('id-ID', {weekday: 'long'}) === w.nama);
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
                { activeHari ? booking?.filter((i) => new Date(i.start_date).toLocaleDateString('id-ID', { weekday: 'long'}) === activeHari).length : booking?.filter((i) => i.status === 'Terkonfirmasi')?.length} sesi
              </span>
            </div>
          )}
        </div>

        {/* ── Filter + View Toggle ── */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-marine-600 text-sm font-semibold">
            {activeHari ? `Jadwal ${activeHari}` : 'Semua Jadwal'}
            <span className="ml-2 text-marine-400 font-normal text-xs">(  { activeHari ?booking?.filter((i) => new Date(i.start_date).toLocaleDateString('id-ID', { weekday: 'long'}) === activeHari).length :  booking?.filter((i) => i.status === 'Terkonfirmasi')?.length} sesi)</span>
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

            {activeHari ? 
            (
               <>
            {booking?.filter((i) => new Date(i.start_date).toLocaleDateString('id-ID', { weekday: 'long'}) === activeHari)?.map((j) => {
           
              const dateInfo = weekDates.find((w) => w.nama === new Date(j.start_date).toLocaleDateString('id-ID', {
                       weekday: 'long'}));
                  

              return (
                <div key={j.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  {/* Header */}
                  <div className="px-4 pt-4 pb-3 flex items-start justify-between" style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)' }}>
                    <div>
                      <div className="flex items-center gap-1.5 mb-4">
                        <span className="text-[11px] font-bold text-marine-400 uppercase tracking-widest">{j.student_name}</span>
                        {dateInfo && (
                          <span className="text-[10px] text-marine-300">· {dateInfo.tanggal} {dateInfo.bulan}</span>
                        )}
                        {dateInfo?.isToday && (
                          <span className="text-[9px] font-bold bg-aqua-500 text-white px-1.5 py-0.5 rounded-full">Hari ini</span>
                        )}
                      </div>
                      <p className="text-marine-950 font-bold text-lg leading-none">
                        {j.course_time} 
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `#4f46e515` }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#4f46e5' viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-4 pb-4 pt-3 space-y-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700`}>{j.package_id}</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-2 text-marine-500">
                        <Phone  className='w-3 h-3 text-marine-500'/>
                        <span>{j.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-marine-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                        <span>{j.location_id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
               </>
            )
            
            :
            (
<> 

            {booking?.filter((i) => i.status === 'Terkonfirmasi')?.map((j) => {
           
              const dateInfo = weekDates.find((w) => w.nama === new Date(j.start_date).toLocaleDateString('id-ID', {
                       weekday: 'long'}));
                  

              return (
                <div key={j.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  {/* Header */}
                  <div className="px-4 pt-4 pb-3 flex items-start justify-between" style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)' }}>
                    <div>
                      <div className="flex items-center gap-1.5 mb-4">
                        <span className="text-[11px] font-bold text-marine-400 uppercase tracking-widest">{j.student_name}</span>
                        {dateInfo && (
                          <span className="text-[10px] text-marine-300">· {dateInfo.tanggal} {dateInfo.bulan}</span>
                        )}
                        {dateInfo?.isToday && (
                          <span className="text-[9px] font-bold bg-aqua-500 text-white px-1.5 py-0.5 rounded-full">Hari ini</span>
                        )}
                      </div>
                      <p className="text-marine-950 font-bold text-lg leading-none">
                        {j.course_time} 
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `#4f46e515` }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#4f46e5' viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-4 pb-4 pt-3 space-y-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700`}>{j.package_id}</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-2 text-marine-500">
                        <Phone  className='w-3 h-3 text-marine-500'/>
                        <span>{j.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-marine-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                        <span>{j.location_id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

</>
            )
          }

          </div>
        )}

        {/* ── List View ── */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)' }}>
                    {['Nama Siswa', 'No Hp', 'Hari & Tanggal', 'Waktu', 'Program',  'Layanan', 'Kolam'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-marine-400 font-bold uppercase tracking-widest text-[10px] border-b border-slate-100">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {activeHari ? (

                    <>
                    
                      {booking?.filter((i) => new Date(i.start_date).toLocaleDateString('id-ID', { weekday: 'long'}) === activeHari)?.map((j) => {
                     
                    const dateInfo = weekDates.find((w) => w.nama === new Date(j.start_date).toLocaleDateString('id-ID', {
                     weekday: 'long' }));
                    return (
                      <tr key={j.id} className="hover:bg-marine-50/40 transition-colors">
                         <td className="px-4 py-3 font-semibold text-marine-700 tabular-nums">{j.student_name}</td>
                          <td className="px-4 py-3 font-semibold text-marine-700 tabular-nums">{j.phone}</td>
                        <td className="px-4 py-3">
                          <p className="text-marine-400 ">{dateInfo?.tanggal} {dateInfo?.bulan}</p>
                          {dateInfo?.isToday && <span className="text-[9px] font-bold text-aqua-600">Hari ini</span>}
                        </td>
                        <td className="px-4 py-3 font-semibold text-marine-700 tabular-nums">{j.course_time}</td>
                        <td className="px-4 py-3">
                          <span className={`font-semibold px-2.5 py-1 rounded-full text-[11px] bg-indigo-50 $text-indigo-700`}>{j.package_id}</span>
                        </td>
                       
                        <td className="px-4 py-3 text-marine-600">{j.package_id}</td>
                        <td className="px-4 py-3 text-marine-500">{j.location_id}</td>
                      </tr>
                    );
                  })}
                    </>
                  ): (
                   <>
                    {booking?.filter((i) => i.status === 'Terkonfirmasi').map((j) => {
                   
                    const dateInfo = weekDates.find((w) => w.nama === new Date(j.start_date).toLocaleDateString('id-ID', {
                     weekday: 'long' }));
                    return (
                      <tr key={j.id} className="hover:bg-marine-50/40 transition-colors">
                         <td className="px-4 py-3 font-semibold text-marine-700 tabular-nums">{j.student_name}</td>
                          <td className="px-4 py-3 font-semibold text-marine-700 tabular-nums">{j.phone}</td>
                        <td className="px-4 py-3">
                          <p className="text-marine-400 ">{dateInfo?.tanggal} {dateInfo?.bulan}</p>
                          {dateInfo?.isToday && <span className="text-[9px] font-bold text-aqua-600">Hari ini</span>}
                        </td>
                        <td className="px-4 py-3 font-semibold text-marine-700 tabular-nums">{j.course_time}</td>
                        <td className="px-4 py-3">
                          <span className={`font-semibold px-2.5 py-1 rounded-full text-[11px] bg-indigo-50 $text-indigo-700`}>{j.package_id}</span>
                        </td>
                       
                        <td className="px-4 py-3 text-marine-600">{j.package_id}</td>
                        <td className="px-4 py-3 text-marine-500">{j.location_id}</td>
                      </tr>
                    );
                  })}
                   
                   </>
                  )}
                 
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filtered?.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 py-16 flex flex-col items-center gap-3">
            <span className="text-4xl">📅</span>
            <p className="text-marine-500 text-sm font-medium">Tidak ada jadwal untuk hari ini</p>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
