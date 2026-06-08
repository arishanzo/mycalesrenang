'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/app/libs/data';



export function AdminShell({ children, title, subtitle }: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {

 

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const activeId = pathname.includes('siswa') ? 'siswa'
    : pathname.includes('transaksi') ? 'transaksi'
    : pathname.includes('setting-akun') ? 'setting-akun'
    : pathname.includes('jadwal') ? 'jadwal'
    : 'dashboard';

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#f3f6fa]" style={{ fontFamily: 'var(--font-sans)' }}>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col shrink-0 transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'linear-gradient(180deg,#020e1a 0%,#072640 60%,#0b2d4e 100%)' }}
      >
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/20 shrink-0">
            <Image src="/images/logo.png" alt="MYCA" width={32} height={32} className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-none">MYCA Admin</p>
            <p className="text-marine-400 text-[10px]">Center of Aquatic</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          <p className="text-marine-500 text-[10px] font-semibold uppercase tracking-widest px-2 pb-2 pt-1">Menu</p>
          {NAV.map(({ id, label, href, icon }) => {
            const isActive = activeId === id;
            return (
              <Link key={id} href={href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all ${isActive ? 'text-white' : 'text-marine-400 hover:text-white hover:bg-white/5'}`}
                style={isActive ? { background: 'linear-gradient(90deg,rgba(41,109,164,0.35),rgba(41,109,164,0.1))', borderLeft: '2px solid #22d3ee' } : {}}>
                <span className={isActive ? 'text-aqua-400' : 'text-marine-500'}>{icon}</span>
                {label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-aqua-400 shrink-0" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-2 pb-3 pt-2 border-t border-white/10 space-y-1 shrink-0">
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-white/5">
            <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: 'linear-gradient(135deg,#1a5182,#296da4)' }}>AD</div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">Administrator</p>
              <p className="text-marine-400 text-[10px]">Super Admin</p>
            </div>
          </div>
          <Link href="/login"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-marine-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            Keluar
          </Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="shrink-0 bg-white border-b border-slate-200 px-4 lg:px-5 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-marine-50 text-marine-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            <div>
              <h1 className="text-marine-950 font-bold text-base leading-none">{title}</h1>
              {subtitle && <p className="text-marine-400 text-[11px] mt-0.5 hidden sm:block">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:block text-marine-400 text-xs border border-marine-100 rounded-lg px-2.5 py-1.5 bg-marine-50">
              {new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <button className="relative p-2 rounded-lg bg-marine-50 hover:bg-marine-100 text-marine-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-1 ring-white" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-marine-100">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                style={{ background: 'linear-gradient(135deg,#0e3a60,#296da4)' }}>AD</div>
              <div className="hidden sm:block">
                <p className="text-marine-900 text-xs font-semibold leading-none">Admin</p>
                <p className="text-marine-400 text-[10px] mt-0.5">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 lg:p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
