'use client';

import { useState } from 'react';
import { AdminShell } from '../components/AdminShell';

const TABS = ['Profil', 'Keamanan', 'Notifikasi', 'Sistem'];

export default function SettingPage() {
  const [tab, setTab] = useState('Profil');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Administrator',
    email: 'admin@myca.id',
    phone: '0812-0000-0001',
    role: 'Super Admin',
    bio: 'Admin utama MYCA Center of Aquatic Semarang.',
  });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [notif, setNotif] = useState({
    emailTransaksi: true,
    emailPendaftaran: true,
    pushTransaksi: false,
    pushPendaftaran: true,
    weeklyReport: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminShell title="Pengaturan" subtitle="Kelola akun dan konfigurasi sistem">
      <div className="space-y-3 max-w-3xl">

        {/* Tab bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-1 flex gap-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${tab === t ? 'text-white shadow-sm' : 'text-marine-500 hover:text-marine-700'}`}
              style={tab === t ? { background: 'linear-gradient(135deg,#0e3a60,#296da4)' } : {}}>
              {t}
            </button>
          ))}
        </div>

        {/* ── Profil ── */}
        {tab === 'Profil' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Header banner */}
            <div className="h-20 relative" style={{ background: 'linear-gradient(135deg,#020e1a 0%,#0e3a60 60%,#296da4 100%)' }}>
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="white"/>
                  </pattern></defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>
            </div>
            <div className="px-5 pb-5">
              {/* Avatar */}
              <div className="flex items-end gap-4 -mt-7 mb-5">
                <div className="w-14 h-14 rounded-2xl ring-4 ring-white flex items-center justify-center text-white text-xl font-bold shrink-0"
                  style={{ background: 'linear-gradient(135deg,#0e3a60,#296da4)' }}>
                  {profile.name.charAt(0)}
                </div>
                <div className="pb-1">
                  <p className="text-marine-900 font-bold text-base leading-none">{profile.name}</p>
                  <p className="text-marine-400 text-xs mt-0.5">{profile.role}</p>
                </div>
                <button className="ml-auto text-xs text-marine-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors mb-0.5">
                  Ganti Foto
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Nama Lengkap', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'No. HP', key: 'phone' },
                  { label: 'Role', key: 'role' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-semibold text-marine-600 uppercase tracking-wider mb-1">{label}</label>
                    <input
                      value={profile[key as keyof typeof profile]}
                      onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                      disabled={key === 'role'}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-marine-900 outline-none focus:border-marine-400 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-marine-600 uppercase tracking-wider mb-1">Bio</label>
                  <textarea rows={2} value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-marine-900 outline-none focus:border-marine-400 focus:bg-white transition-all resize-none" />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all active:scale-95"
                  style={{ background: 'linear-gradient(135deg,#0e3a60,#296da4)', boxShadow: '0 3px 12px -3px rgba(41,109,164,0.5)' }}>
                  {saved ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                      Tersimpan!
                    </>
                  ) : 'Simpan Perubahan'}
                </button>
                <button className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-marine-500 hover:bg-slate-50 transition-colors">
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Keamanan ── */}
        {tab === 'Keamanan' && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-marine-900 font-semibold text-sm mb-1">Ubah Password</p>
              <p className="text-marine-400 text-xs mb-4">Gunakan password yang kuat minimal 8 karakter.</p>
              <div className="space-y-3">
                {[
                  { label: 'Password Saat Ini', key: 'current', show: showCurrent, toggle: () => setShowCurrent(!showCurrent) },
                  { label: 'Password Baru', key: 'newPass', show: showNew, toggle: () => setShowNew(!showNew) },
                  { label: 'Konfirmasi Password Baru', key: 'confirm', show: showNew, toggle: () => setShowNew(!showNew) },
                ].map(({ label, key, show, toggle }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-semibold text-marine-600 uppercase tracking-wider mb-1">{label}</label>
                    <div className="relative">
                      <input type={show ? 'text' : 'password'} placeholder="••••••••"
                        value={passwords[key as keyof typeof passwords]}
                        onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                        className="w-full pl-3 pr-9 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-marine-900 placeholder:text-marine-300 outline-none focus:border-marine-400 focus:bg-white transition-all" />
                      <button type="button" onClick={toggle}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-marine-300 hover:text-marine-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                {/* Strength indicator */}
                {passwords.newPass && (
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${passwords.newPass.length >= i * 2 ? (i <= 1 ? 'bg-red-400' : i <= 2 ? 'bg-amber-400' : i <= 3 ? 'bg-blue-400' : 'bg-emerald-500') : 'bg-slate-100'}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-marine-400">
                      {passwords.newPass.length < 4 ? 'Sangat lemah' : passwords.newPass.length < 6 ? 'Lemah' : passwords.newPass.length < 8 ? 'Cukup' : 'Kuat'}
                    </p>
                  </div>
                )}
              </div>
              <button onClick={handleSave}
                className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg,#0e3a60,#296da4)', boxShadow: '0 3px 12px -3px rgba(41,109,164,0.5)' }}>
                {saved ? 'Password Diperbarui!' : 'Update Password'}
              </button>
            </div>

            {/* Danger zone */}
            <div className="bg-white rounded-xl border border-red-200 p-5">
              <p className="text-red-700 font-semibold text-sm mb-1">Zona Berbahaya</p>
              <p className="text-marine-400 text-xs mb-4">Tindakan berikut bersifat permanen dan tidak dapat dibatalkan.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 py-2 rounded-lg text-xs font-semibold text-amber-700 border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors">
                  Nonaktifkan Akun
                </button>
                <button className="flex-1 py-2 rounded-lg text-xs font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors">
                  Hapus Akun Permanen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Notifikasi ── */}
        {tab === 'Notifikasi' && (
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {[
              { key: 'emailTransaksi', label: 'Email — Transaksi Baru', desc: 'Terima email setiap ada transaksi masuk' },
              { key: 'emailPendaftaran', label: 'Email — Pendaftaran Siswa', desc: 'Terima email saat ada siswa baru mendaftar' },
              { key: 'pushTransaksi', label: 'Push — Transaksi Baru', desc: 'Notifikasi browser untuk transaksi baru' },
              { key: 'pushPendaftaran', label: 'Push — Pendaftaran Siswa', desc: 'Notifikasi browser untuk pendaftaran baru' },
              { key: 'weeklyReport', label: 'Laporan Mingguan', desc: 'Ringkasan aktivitas dikirim setiap Senin' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-marine-900 text-xs font-semibold">{label}</p>
                  <p className="text-marine-400 text-[11px] mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => setNotif({ ...notif, [key]: !notif[key as keyof typeof notif] })}
                  className={`relative w-10 h-5.5 rounded-full transition-colors shrink-0 ml-4 ${notif[key as keyof typeof notif] ? '' : 'bg-slate-200'}`}
                  style={notif[key as keyof typeof notif] ? { background: 'linear-gradient(135deg,#0e3a60,#296da4)' } : {}}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notif[key as keyof typeof notif] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
            <div className="px-5 py-3.5">
              <button onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg,#0e3a60,#296da4)', boxShadow: '0 3px 12px -3px rgba(41,109,164,0.5)' }}>
                {saved ? 'Tersimpan!' : 'Simpan Preferensi'}
              </button>
            </div>
          </div>
        )}

        {/* ── Sistem ── */}
        {tab === 'Sistem' && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-marine-900 font-semibold text-sm mb-4">Informasi Sistem</p>
              <div className="space-y-0 divide-y divide-slate-50">
                {[
                  ['Versi Aplikasi', 'v1.0.0'],
                  ['Framework', 'Next.js 15'],
                  ['Database', 'PostgreSQL'],
                  ['Server', 'Vercel Edge'],
                  ['Terakhir Diperbarui', '15 Jun 2025'],
                  ['Status Sistem', '🟢 Online'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-2.5">
                    <span className="text-marine-400 text-xs">{label}</span>
                    <span className="text-marine-900 text-xs font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-marine-900 font-semibold text-sm mb-4">Pengaturan Umum</p>
              <div className="space-y-3">
                {[
                  { label: 'Nama Aplikasi', value: 'MYCA Admin Panel' },
                  { label: 'Zona Waktu', value: 'Asia/Jakarta (WIB)' },
                  { label: 'Bahasa', value: 'Bahasa Indonesia' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label className="block text-[11px] font-semibold text-marine-600 uppercase tracking-wider mb-1">{label}</label>
                    <input defaultValue={value}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-marine-900 outline-none focus:border-marine-400 focus:bg-white transition-all" />
                  </div>
                ))}
              </div>
              <button onClick={handleSave}
                className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg,#0e3a60,#296da4)', boxShadow: '0 3px 12px -3px rgba(41,109,164,0.5)' }}>
                {saved ? 'Tersimpan!' : 'Simpan Pengaturan'}
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
