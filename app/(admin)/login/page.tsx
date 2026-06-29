'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchAPI } from '@/app/libs/api';
import { login } from '@/app/services/auth.service';
import { LoginCredentials } from '@/app/types/types';
import { Loader2 } from "lucide-react";

type SessionResponse = {
  loggedIn: boolean;
  user?: { iduser: string; email: string };
};

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState<LoginCredentials>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
   const checkSession = async () => {
  try {
    const res = await fetchAPI<SessionResponse>("/auth/session", {
      credentials: "include",
    });

    if (res.loggedIn) {
      router.replace("/dashboard");
      return;
    }

    setChecking(false);
  } catch (error: any) {
    if (error.status === 401) {
      // session habis atau belum login
      setChecking(false);
      return;
    }

    console.error("Session check failed:", error);
    setChecking(false);
  }
};

    checkSession();
  }, [router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email: form.email, password: form.password });
      if (res?.token) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError( err.message|| 'Terjadi kesalahan saat menghubungkan ke server.');
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">

    
      <div
        className="hidden lg:flex lg:w-[52%] h-full relative flex-col"
        style={{ background: 'linear-gradient(160deg,#020e1a 0%,#0b2d4e 45%,#1a5182 80%,#296da4 100%)' }}
      >
        {/* Mesh orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle,#22d3ee,transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full opacity-[0.09]"
            style={{ background: 'radial-gradient(circle,#5da4d6,transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle,#86bee5,transparent 70%)' }} />
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Top logo bar */}
        <div className="relative z-10 flex items-center gap-3 px-10 pt-8">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-white/20 shrink-0">
            <Image src={'/logo.png'} alt="MYCA" width={40} height={40} className="object-cover" />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-none">MYCA</p>
            <p className="text-marine-300 text-[10px] tracking-[0.2em] uppercase mt-0.5">Center of Aquatic</p>
          </div>
          <span className="ml-3 text-[10px] font-semibold tracking-widest uppercase text-aqua-400 border border-aqua-400/30 rounded-full px-2.5 py-0.5 bg-aqua-400/10">
            Admin
          </span>
        </div>

        {/* Center hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-aqua-400 animate-pulse" />
            <span className="text-aqua-400 text-xs font-medium tracking-widest uppercase">Panel Pengelolaan</span>
          </div>
          <h1 className="text-[2.8rem] font-bold text-white leading-[1.15] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Selamat Datang<br />
            <span style={{ background: 'linear-gradient(90deg,#22d3ee,#5da4d6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Administrator
            </span>
          </h1>
          <p className="text-marine-300 text-sm leading-relaxed max-w-[340px]">
            Kelola seluruh operasional MYCA — data siswa, transaksi pembayaran, dan jadwal instruktur dalam satu dashboard terintegrasi.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {['Data Siswa', 'Transaksi', 'Jadwal'].map((f) => (
              <span key={f} className="text-xs text-white/70 border border-white/15 rounded-full px-3 py-1 bg-white/5 backdrop-blur-sm">
                {f}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ── RIGHT: Login form ── */}
      <div className="flex-1 h-full flex flex-col bg-white overflow-y-auto">
        
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-5 pt-5 pb-3 border-b border-marine-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <Image src="/images/logo.png" alt="MYCA" width={32} height={32} className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-marine-900 text-sm">MYCA Admin</p>
              <p className="text-marine-400 text-[10px]">Center of Aquatic</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-aqua-500 border border-aqua-400/30 rounded-full px-2.5 py-1 bg-aqua-400/10">
            Panel
          </span>
        </div>

        {/* Form area — fills remaining height */}
        <div className="flex-1 flex items-center justify-center px-6 py-8 lg:px-12">
          <div className="w-full max-w-[400px]">

            {/* Heading */}
            <div className="mb-7">
              <p className="text-xs font-semibold text-marine-400 uppercase tracking-widest mb-2">Autentikasi Admin</p>
              <h2 className="text-3xl font-bold text-marine-950 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Masuk ke Panel
              </h2>
              <p className="text-marine-500 text-sm mt-1.5">Masukkan kredensial Anda untuk melanjutkan.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-marine-600 uppercase tracking-widest mb-1.5">Email</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marine-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="admin@myca.id"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-marine-200 bg-marine-50/60 text-marine-900 text-sm placeholder:text-marine-300 outline-none focus:border-marine-500 focus:bg-white focus:ring-2 focus:ring-marine-100 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-marine-600 uppercase tracking-widest mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marine-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-marine-200 bg-marine-50/60 text-marine-900 text-sm placeholder:text-marine-300 outline-none focus:border-marine-500 focus:bg-white focus:ring-2 focus:ring-marine-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-marine-300 hover:text-marine-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                  <svg className="text-red-400 shrink-0" xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                  </svg>
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 mt-2"
                style={{
                  background: 'linear-gradient(135deg,#0b2d4e 0%,#1a5182 50%,#296da4 100%)',
                  boxShadow: '0 6px 24px -6px rgba(26,81,130,0.55)',
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    Masuk ke Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Divider hint */}
            <div className="mt-6 pt-5 border-t border-marine-100 flex items-center justify-between">
              <p className="text-marine-300 text-xs">© {new Date().getFullYear()} MYCA Center of Aquatic</p>
              <span className="text-marine-200 text-xs">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
