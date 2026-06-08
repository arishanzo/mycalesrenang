'use client';

import { useState, useContext } from 'react';
import { AdminShell } from '../components/AdminShell';
import { fetchAPI } from '@/app/libs/api';
import { ubahPassword } from '@/app/services/auth.service';
import Swal from 'sweetalert2';

type SessionResponse = {
  loggedIn: boolean;
  user?: { iduser: string; email: string };
};

const TABS = ['Keamanan'];

export default function SettingPage() {
  const [tab, setTab] = useState('Keamanan');
  const [saved, setSaved] = useState(false);
  
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSave = async () => {

    try {


    const res = await fetchAPI<SessionResponse>("/auth/session", {
      credentials: "include",
    });

    if (res.user?.email) {
      const payload = {
        email: res.user?.email,
        passwordlama: passwords.current,
        passwordbaru: passwords.newPass,
        komfirmpassword: passwords.confirm,
      };

      const updateRes: any = await ubahPassword(payload);

      if (updateRes) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: updateRes?.message,
          timer: 2000,
          showConfirmButton: false,
        });

        window.location.reload();
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: updateRes?.message,
        });
      }
    }

    }catch(err: any){
          Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: err?.message,
        });
    }


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

          </div>
        )}

     
      </div>
    </AdminShell>
  );
}
