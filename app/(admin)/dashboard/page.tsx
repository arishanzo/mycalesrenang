'use client';
import Link from 'next/link';
import { AdminShell } from '../components/AdminShell';
import { UseGetBooking } from '../hook/useGetBooking';



const STATUS_BADGE: Record<string, string> = {
  'Terkonfirmasi': 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'Menunggu Konfirmasi': 'bg-amber-50 text-amber-700 ring-amber-100',
  'Pembayaran Diterima': 'bg-emerald-50 text-emerald-700 ring-emerald-100',
};

export default function AdminDashboard() {

   const { booking }  = UseGetBooking();

   console.log(booking)

   const today = new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); 

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6)

 
      const siswaAktif = booking?.filter((i) => i.status === 'Terkonfirmasi');
      const siswaBaru = booking?.filter((i) => i.status === 'Menunggu Konfirmasi');

      const jumlahTransaksi = booking?.reduce((total, item) => {
          return siswaAktif ? total + item.total_price : total;
        }, 0);

       const jadwalMingguIni = (booking ?? []).filter((i) => {
        const date = new Date(i.start_date);
        return date >= startOfWeek && date <= endOfWeek;
      });
        
 const STATS = [
  { label: 'Total Siswa', value: booking?.length, up: true, accent: '#089516' },
  { label: 'Transaksi Sukses', value: jumlahTransaksi?.toLocaleString('id-ID'), up: true, accent: '#033542' },
  { label: 'Siswa Aktif', value: siswaAktif?.length, up: true, accent: '#0e7490' },
  { label: 'Daftar Baru', value: siswaBaru?.length, up: false, accent: '#b45309' },
];

  return (

      <AdminShell title="Dashboard" subtitle="Kelola Admin">
  
    

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3">

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-3.5 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-marine-500 text-[11px] font-medium leading-tight">{s.label}</p>
                
                </div>
              <p
              className="font-bold text-xl leading-none mb-2"
              style={{ color: s.accent }}
            >
              {s.value}
            </p>
               </div>
            ))}
          </div>

          {/* ── Middle Row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

            {/* Siswa Terbaru */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                <p className="text-marine-900 font-semibold text-sm">Transaksi Terbaru</p>
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
                      {['Siswa', 'Program', 'Status', 'Metode Pembayaran', 'Tanggal Mulai Les'].map((h) => (
                        <th key={h} className="text-left px-4 py-2 text-marine-400 font-semibold uppercase tracking-wide text-[10px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {booking?.slice(0, 10).map((s, i) => (
                      <tr key={i} className="hover:bg-marine-50/40 transition-colors">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                              style={{ background: 'linear-gradient(135deg,#1a5182,#3b8bc4)' }}>
                              {s.student_name.charAt(0)}
                            </div>
                            <span className="text-marine-900 font-medium truncate max-w-[100px]">{s.student_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-marine-500">{s.package_id}</td>
                        <td className="px-4 py-2.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ring-1 ${STATUS_BADGE[s.status]}`}>
                            {s.status}
                          </span>
                        </td>
                         <td className="px-4 py-2.5 text-marine-500">Transfer Bank</td>
                        <td className="px-4 py-2.5 text-marine-400">{
                        new Date(s.start_date).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                      }</td>
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
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                <p className="text-marine-900 font-semibold text-sm">Jadwal Minggu Ini</p>
                <Link href="/jadwal" className="text-marine-500 hover:text-marine-700 text-xs font-medium transition-colors flex items-center gap-1">
                  Lihat semua
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </Link>
              </div>
                <div className="space-y-1.5">
                     {jadwalMingguIni?.map((j) => (
  <div
    key={j.id}
    className="rounded-xl bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md 
               transition-all duration-200 border border-slate-200 p-4 flex flex-col md:flex-row 
               md:items-center md:justify-between gap-4"
  >
    {/* Kiri: Info utama */}
    <div className="flex items-start md:items-center gap-3 flex-1">
      <span className="w-2 h-2 rounded-full shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500" />
      <div className="space-y-2">
        <span className="block text-slate-900 text-sm font-semibold">
          Nama: {j.student_name}
        </span>

        {/* Hari Les */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
         
            <span
              className="text-[11px] font-medium px-2 py-1 rounded-md 
                         bg-cyan-50 text-cyan-700 text-center"
            >
              {j.course_day}
            </span>
        
        </div>

        {/* Jam + Lokasi */}
        <p className="text-slate-500 text-xs">
          {j.course_time} · {j.location_id}
        </p>

         {/* Tanggal Mulai */}
        <p className="text-slate-600 text-xs font-medium">
          Mulai: {new Date(j.start_date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>

    {/* Kanan: Paket */}
    <div className="flex-shrink-0">
      <span
        className="text-xs font-medium px-3 py-1 rounded-full 
                   bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm"
      >
        {j.package_id}
      </span>
    </div>
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


        </main>
    
  </AdminShell>
  );
}
